use crate::types::{GDrive, GHub};
use crate::utils::{get_email, get_environment_variable};
use google_drive3::hyper::client::HttpConnector;
use google_drive3::hyper_rustls::HttpsConnector;
use google_drive3::oauth2;
use google_drive3::oauth2::authenticator::Authenticator;
use google_drive3::oauth2::authenticator_delegate::InstalledFlowDelegate;
use google_drive3::oauth2::ApplicationSecret;
use google_drive3::{hyper, hyper_rustls, DriveHub};
use std::fs;
use std::future::Future;
use std::pin::Pin;
use tauri::State;
use webbrowser;

struct AuthDelegate();

impl InstalledFlowDelegate for AuthDelegate {
    fn present_user_url<'a>(
        &'a self,
        url: &'a str,
        _need_code: bool,
    ) -> Pin<Box<dyn Future<Output = Result<String, String>> + Send + 'a>> {
        Box::pin(open_auth_url(url))
    }
}

async fn open_auth_url(url: &str) -> Result<String, String> {
    if webbrowser::open(url).is_ok() {
        Ok(String::new())
    } else {
        Err(String::from("Couldn't open browser window"))
    }
}

async fn create_auth(
    client_id: Option<String>,
    client_secret: Option<String>,
) -> Authenticator<HttpsConnector<HttpConnector>> {
    let secret = ApplicationSecret {
        client_id: client_id.unwrap_or_else(|| get_environment_variable("CLIENT_ID")),
        client_secret: client_secret.unwrap_or_else(|| get_environment_variable("CLIENT_SECRET")),
        token_uri: String::from("https://oauth2.googleapis.com/token"),
        auth_uri: String::from("https://accounts.google.com/o/oauth2/auth"),
        redirect_uris: vec![String::from("urn:ietf:wg:oauth:2.0:oob")],
        project_id: None,
        client_email: None,
        auth_provider_x509_cert_url: Some(String::from(
            "https://www.googleapis.com/oauth2/v1/certs",
        )),
        client_x509_cert_url: None,
    };
    let auth = oauth2::InstalledFlowAuthenticator::builder(
        secret,
        oauth2::InstalledFlowReturnMethod::HTTPRedirect,
    )
    .flow_delegate(Box::new(AuthDelegate()))
    .persist_tokens_to_disk("/tmp/google_tokens")
    .build()
    .await
    .unwrap();
    auth.token(&[
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.metadata.readonly",
    ])
    .await
    .expect("Error getting an access token");
    return auth;
}

#[tauri::command]
pub async fn sign_out(gdrive: State<'_, GDrive>) -> Result<(), ()> {
    let mut gd = gdrive.hub.lock().await;
    *gd = None;
    let _ = fs::remove_file("/tmp/google_tokens");
    Ok(())
}

#[tauri::command]
pub async fn sign_in(
    client_id: Option<String>,
    client_secret: Option<String>,
    gdrive: State<'_, GDrive>,
) -> Result<String, ()> {
    let auth = create_auth(client_id, client_secret).await;
    let hub: GHub = DriveHub::new(
        hyper::Client::builder().build(
            hyper_rustls::HttpsConnectorBuilder::new()
                .with_native_roots()
                .https_or_http()
                .enable_http1()
                .build(),
        ),
        auth,
    );
    let mut gd = gdrive.hub.lock().await;
    *gd = Some(hub);
    Ok(get_email(gd.as_ref().unwrap()).await)
}

#[tauri::command]
pub async fn check_cache(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    match fs::metadata("/tmp/google_tokens") {
        Ok(_) => sign_in(None, None, gdrive).await,
        Err(_) => Err(()),
    }
}

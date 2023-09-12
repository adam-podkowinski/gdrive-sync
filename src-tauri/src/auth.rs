use crate::utils::get_environment_variable;
use google_drive3::hyper::client::HttpConnector;
use google_drive3::hyper_rustls::HttpsConnector;
use google_drive3::oauth2;
use google_drive3::oauth2::authenticator::Authenticator;
use google_drive3::oauth2::authenticator_delegate::InstalledFlowDelegate;
use google_drive3::oauth2::ApplicationSecret;
use std::future::Future;
use std::pin::Pin;
use tauri::Manager;

struct AuthDelegate {
    app: tauri::AppHandle,
}

impl InstalledFlowDelegate for AuthDelegate {
    fn present_user_url<'a>(
        &'a self,
        url: &'a str,
        _need_code: bool,
    ) -> Pin<Box<dyn Future<Output = Result<String, String>> + Send + 'a>> {
        Box::pin(present_user_url(url, &self.app))
    }
}

async fn present_user_url(url: &str, app: &tauri::AppHandle) -> Result<String, String> {
    // TODO: open url from rust code
    app.emit_all("openGoogleAuth", url).expect("ERROR emitting");
    Ok(String::new())
}

pub async fn create_auth(app: tauri::AppHandle) -> Authenticator<HttpsConnector<HttpConnector>> {
    // TODO: cache and load tokens
    let secret: ApplicationSecret = ApplicationSecret {
        client_id: get_environment_variable("CLIENT_ID"),
        client_secret: get_environment_variable("CLIENT_SECRET"),
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
    .flow_delegate(Box::new(AuthDelegate { app }))
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

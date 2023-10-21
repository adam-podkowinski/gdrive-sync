use crate::utils::get_environment_variable;
use google_drive3::hyper::client::HttpConnector;
use google_drive3::hyper_rustls::HttpsConnector;
use google_drive3::oauth2;
use google_drive3::oauth2::authenticator::Authenticator;
use google_drive3::oauth2::authenticator_delegate::InstalledFlowDelegate;
use google_drive3::oauth2::ApplicationSecret;
use std::future::Future;
use std::pin::Pin;
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

pub async fn create_auth(
    client_id: Option<String>,
    client_secret: Option<String>,
) -> Authenticator<HttpsConnector<HttpConnector>> {
    let secret = ApplicationSecret {
        client_id: match client_id {
            Some(id) => id,
            None => get_environment_variable("CLIENT_ID"),
        },
        client_secret: match client_secret {
            Some(secret) => secret,
            None => get_environment_variable("CLIENT_SECRET"),
        },
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

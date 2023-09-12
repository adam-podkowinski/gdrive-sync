use google_drive3::hyper::client::HttpConnector;
use google_drive3::hyper_rustls::HttpsConnector;
use google_drive3::DriveHub;
use tokio::sync::Mutex;

pub struct GDrive {
    pub hub: Mutex<Option<DriveHub<HttpsConnector<HttpConnector>>>>,
}

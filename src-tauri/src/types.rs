use google_drive3::hyper::client::HttpConnector;
use google_drive3::hyper_rustls::HttpsConnector;
use google_drive3::DriveHub;
use tauri::async_runtime::Mutex;

pub type GHub = DriveHub<HttpsConnector<HttpConnector>>;

pub struct GDrive {
    pub hub: Mutex<Option<GHub>>,
}

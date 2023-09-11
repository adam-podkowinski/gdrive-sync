#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::async_runtime::Mutex;
use google_drive::Client;
use tauri::State;
use tokio::sync::MutexGuard;

pub struct GDrive(Mutex<Option<Client>>);

// TODO: refactor to a separate file
fn get_environment_variable(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| "".to_string())
}

#[tauri::command]
async fn init_gdrive(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    let mut gd: MutexGuard<'_, Option<Client>> = gdrive.0.lock().await;
    let redirect_port = tauri_plugin_oauth::start(move |url| {
        println!("{}", url);
    }).expect("SERVER ERROR");
    // TODO: cache access token, refresh token and retrieve it here
    *gd = Some(Client::new(
        get_environment_variable("GOOGLE_DRIVE_CLIENT_ID"),
        get_environment_variable("GOOGLE_DRIVE_CLIENT_SECRET"),
        format!("http://127.0.0.1:{}", redirect_port), "", "",
    ));
    let consent_url =
        gd.as_ref().unwrap().user_consent_url(&["https://www.googleapis.com/auth/drive.appdata".to_string()]);
    Ok(consent_url)
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    tauri::Builder::default()
        .manage(GDrive(Mutex::new(None)))
        .invoke_handler(tauri::generate_handler![init_gdrive])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::async_runtime::Mutex;
use google_drive::Client;
use tauri::State;
use tokio::sync::MutexGuard;

pub struct GDrive(Mutex<Client>);

#[tauri::command]
async fn init_gdrive(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    let gd: MutexGuard<'_, Client> = gdrive.0.lock().await;
    let consent_url = gd.user_consent_url(&["https://www.googleapis.com/auth/drive.appdata".to_string()]);
    println!("{:?}", consent_url);
    Ok(consent_url)
}
#[tokio::main]
async fn main() {
    let gd = Client::new("", "", "http://localhost:1420", "", "");
    tauri::Builder::default()
        .manage(GDrive(Mutex::new(gd)))
        .invoke_handler(tauri::generate_handler![init_gdrive])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

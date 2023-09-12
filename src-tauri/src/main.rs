#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod auth;
mod types;
mod utils;

use crate::auth::create_auth;
use crate::types::GDrive;
use google_drive3::{hyper, hyper_rustls, DriveHub};
use tauri::async_runtime::Mutex;
use tauri::State;

#[tauri::command]
async fn init_gdrive(gdrive: State<'_, GDrive>, app: tauri::AppHandle) -> Result<String, ()> {
    let auth = create_auth(app).await;
    let hub = DriveHub::new(
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

    Ok(String::new())
}

#[tauri::command]
async fn info(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    let gd = gdrive.hub.lock().await;
    let hub = gd.as_ref().unwrap();
    let email = hub
        .about()
        .get()
        .param("fields", "*")
        .doit()
        .await
        .unwrap()
        .1
        .user
        .unwrap()
        .email_address;
    Ok(email.unwrap())
}

fn main() {
    dotenv::dotenv().ok();
    tauri::Builder::default()
        .manage(GDrive {
            hub: Mutex::default(),
        })
        .invoke_handler(tauri::generate_handler![init_gdrive, info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

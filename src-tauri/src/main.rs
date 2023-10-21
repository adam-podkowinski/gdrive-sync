#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod auth;
mod types;
mod utils;

use std::fs;

use crate::auth::create_auth;
use crate::types::{GDrive, GHub};
use google_drive3::{hyper, hyper_rustls, DriveHub};
use tauri::async_runtime::Mutex;
use tauri::State;

async fn get_email(hub: &GHub) -> String {
    hub.about()
        .get()
        .param("fields", "*")
        .doit()
        .await
        .unwrap()
        .1
        .user
        .unwrap()
        .email_address
        .unwrap()
}

#[tauri::command]
async fn sign_out(gdrive: State<'_, GDrive>) -> Result<(), ()> {
    let mut gd = gdrive.hub.lock().await;
    *gd = None;
    let _ = fs::remove_file("/tmp/google_tokens");
    Ok(())
}

#[tauri::command]
async fn sign_in(
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
async fn check_cache(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    match fs::metadata("/tmp/google_tokens") {
        Ok(_) => {
            sign_in(None, None, gdrive).await
        },
        Err(_) => Err(()),
    }
}

fn main() {
    dotenv::dotenv().ok();
    tauri::Builder::default()
        .manage(GDrive {
            hub: Mutex::default(),
        })
        .invoke_handler(tauri::generate_handler![sign_in, sign_out, check_cache])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod auth;
mod types;
mod utils;

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
async fn sign_in(gdrive: State<'_, GDrive>) -> Result<String, ()> {
    let mut gd = gdrive.hub.lock().await;
    return match gd.as_ref() {
        Some(hub) => Ok(get_email(hub).await),
        _ => {
            let auth = create_auth().await;
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

            *gd = Some(hub);
            Ok(get_email(gd.as_ref().unwrap()).await)
        }
    };
}

fn main() {
    dotenv::dotenv().ok();
    tauri::Builder::default()
        .manage(GDrive {
            hub: Mutex::default(),
        })
        .invoke_handler(tauri::generate_handler![sign_in])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

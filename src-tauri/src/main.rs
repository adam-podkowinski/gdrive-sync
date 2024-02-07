#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod auth;
mod syncing;
mod types;
mod utils;

use auth::{check_cache, sign_in, sign_out};
use syncing::sync_dir;
use tauri::async_runtime::Mutex;
use types::GDrive;

fn main() {
    dotenv::dotenv().ok();
    tauri::Builder::default()
        .manage(GDrive {
            hub: Mutex::default(),
        })
        .invoke_handler(tauri::generate_handler![
            sign_in,
            sign_out,
            check_cache,
            sync_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

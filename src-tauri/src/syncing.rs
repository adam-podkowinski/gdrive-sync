use google_drive3::api::File;
use std::io::Empty;
use tauri::State;

use crate::types::GDrive;

#[tauri::command]
pub async fn sync_dir(path: String, gdrive: State<'_, GDrive>) -> Result<String, String> {
    let gd = gdrive.hub.lock().await;
    let mut file = File::default();
    file.mime_type = Some("application/vnd.google-apps.folder".to_string());
    file.name = Some(path);
    let result: String = gd
        .as_ref()
        .unwrap()
        .files()
        .create(file)
        .upload(Empty::default(), "application/vnd.google-apps.folder".parse().unwrap())
        .await
        .unwrap()
        .1
        .id
        .clone()
        .unwrap();
    Ok(String::from(result))
}

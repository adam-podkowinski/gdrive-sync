use google_drive3::api::File;
use std::{fs, io::Empty};
use tauri::State;

use crate::types::{GDrive, GHub};

pub async fn upload_file(path: String, parents: Vec<String>, hub: &GHub) -> String {
    let mut file = File::default();
    file.name = Some(path.split('/').last().unwrap().to_string());
    file.parents = Some(parents);
    hub.files()
        .create(file)
        .upload(
            fs::File::open(path).unwrap(),
            "application/octet-stream".parse().unwrap(),
        )
        .await
        .unwrap().1.id.unwrap()
}

async fn create_folder(hub: &GHub) -> String {
    let id: Option<String> = match hub
        .files()
        .list()
        .q("name='GDrive Sync'")
        .doit()
        .await
        .unwrap()
        .1
        .files
        .unwrap()
        .first()
    {
        Some(x) => Some(x.id.clone().unwrap()),
        None => None,
    };

    match id {
        Some(some_id) => some_id,
        None => {
            let mut file = File::default();
            file.mime_type = Some("application/vnd.google-apps.folder".to_string());
            file.name = Some("GDrive Sync".to_string());

            hub.files()
                .create(file)
                .upload(
                    Empty::default(),
                    "application/vnd.google-apps.folder".parse().unwrap(),
                )
                .await
                .unwrap()
                .1
                .id
                .clone()
                .unwrap()
        }
    }
}

#[tauri::command]
pub async fn sync_dir(path: String, gdrive: State<'_, GDrive>) -> Result<String, String> {
    let gd = gdrive.hub.lock().await;
    let gd = gd.as_ref().unwrap();
    let parent_id: String = create_folder(gd).await;
    let file_id = upload_file(path, vec![parent_id], gd).await;
    // TODO: save an id and when the file changes only update the file and don't upload another
    Ok(file_id)
}

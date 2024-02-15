use google_drive3::api::File;
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    fs,
    io::Empty,
    path::{Path, PathBuf},
    time::SystemTime,
};
use tauri::State;

use crate::types::{GDrive, GHub};

#[derive(Serialize, Deserialize, Debug)]
struct SyncedFile {
    last_modified: SystemTime,
    path: PathBuf,
    id: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct DirMetadata {
    files: HashMap<PathBuf, SyncedFile>,
}

async fn upload_file(path: &PathBuf, parents: Vec<String>, hub: &GHub) -> String {
    let mut file = File::default();
    file.name = Some(
        path.to_str()
            .unwrap()
            .split('/')
            .last()
            .unwrap()
            .to_string(),
    );
    file.parents = Some(parents);
    hub.files()
        .create(file)
        .upload(
            fs::File::open(path).unwrap(),
            "application/octet-stream".parse().unwrap(),
        )
        .await
        .unwrap()
        .1
        .id
        .unwrap()
}

async fn update_file(path: &PathBuf, id: &str, hub: &GHub) -> String {
    hub.files()
        .update(File::default(), id)
        .upload(
            fs::File::open(path).unwrap(),
            "application/octet-stream".parse().unwrap(),
        )
        .await
        .unwrap()
        .1
        .id
        .unwrap()
}

// TODO: extract creating main directory to a separate function
async fn create_folder(name: &str, parents: Vec<String>, hub: &GHub) -> String {
    let id: Option<String> = match hub
        .files()
        .list()
        .q(&format!("name='{}'", name))
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
            file.name = Some(name.to_string());
            file.parents = Some(parents);

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

// TODO: refactor cuz ugly
#[tauri::command]
pub async fn sync_dir(path: String, gdrive: State<'_, GDrive>) -> Result<String, String> {
    let hub = gdrive.hub.lock().await;
    let hub = hub.as_ref().unwrap();
    let root_id: String = create_folder("GDrive Sync", vec![], hub).await;
    let root_path = Path::new(&path);
    let files: Vec<PathBuf> = traverse_dirs(root_path);
    let metadata_json = fs::read_to_string(format!("{}/.gdrive-sync.json", path))
        .unwrap_or("{\"files\": {}}".to_string());
    let mut metadata: DirMetadata = serde_json::from_str(&metadata_json).unwrap();
    for file in files {
        match metadata.files.get(&file) {
            Some(metadata_file) => {
                if !file.is_dir() {
                    update_file(&file, &metadata_file.id, hub).await;
                    println!("UPDATED FILE: {}", file.display());
                }
            }
            None => {
                let parent = file.parent().unwrap();
                let mut parent_id = &root_id;
                if file != root_path {
                    parent_id = &metadata.files.get(parent).unwrap().id;
                }
                let id: String;
                if file.is_dir() {
                    println!("CREATING DIRECTORY: {}", file.display());
                    let name = file.to_str().unwrap().split('/').last().unwrap();
                    id = create_folder(name, vec![parent_id.clone()], hub).await;
                } else {
                    println!("CREATING FILE: {}", file.display());
                    id = upload_file(&file, vec![parent_id.clone()], hub).await
                }
                metadata.files.insert(
                    file.clone(),
                    SyncedFile {
                        path: file.clone(),
                        id,
                        last_modified: file.metadata().unwrap().modified().unwrap(),
                    },
                );
            }
        }
    }
    fs::write(
        format!("{}/.gdrive-sync.json", path),
        serde_json::to_string(&metadata).unwrap(),
    )
    .unwrap();
    Ok("Hello".to_string())
}

// Returns absolute paths of files and directories in a given path (included)
fn traverse_dirs(path: &Path) -> Vec<PathBuf> {
    let paths: Vec<PathBuf> = fs::read_dir(path)
        .unwrap()
        .map(|x| x.unwrap().path())
        .collect();
    let mut files: Vec<PathBuf> = vec![path.to_path_buf()];
    for p in paths {
        if p.is_dir() {
            files.extend(traverse_dirs(&p));
        } else {
            files.push(p);
        }
    }
    files
}

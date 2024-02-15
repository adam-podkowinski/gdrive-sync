use crate::types::GHub;

pub fn tokens_path() -> String {
    format!("{}/.config/google_tokens", std::env::var("HOME").unwrap())
}

pub fn get_environment_variable(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| "".to_string())
}

pub async fn get_email(hub: &GHub) -> String {
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

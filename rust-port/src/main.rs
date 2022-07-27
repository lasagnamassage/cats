use regex::{Regex};
use clap::{Parser};
use reqwest::{Response};

#[derive(Parser)]
pub struct CLI {
    #[clap(parse(from_os_str))]
    // URL we're checking for SQL-injection
    pub url: std::path::PathBuf
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: CLI = CLI::parse();
    let url: String = args.url.into_os_string().into_string().unwrap();
    let re: Regex = Regex::new(r"=\w*").unwrap();

        
    let resp = reqwest::get(url)
        .await?
        .status();

    if !resp.is_success() {
        panic!("This URL doesn't point to anything :(");
    }
    else {
        println!("{:#?}", resp);
        Ok(())
    }
}
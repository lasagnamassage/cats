use clap::{Parser};
use reqwest;

#[derive(Parser)]
pub struct CLI {
    #[clap(parse(from_os_str))]
    // URL we're checking for SQL-injection
    pub url: std::path::PathBuf
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    let body = reqwest::get("https://www.rust-lang.org")
    .await?
    .text()
    .await?;

    println!("body = {:?}", body);

    // const MAX_ITERATIONS: i32 = 4096; // max number of columns in database

    // let args: CLI = CLI::parse();
    // let url: String = args.url.into_os_string().into_string().unwrap();
    // let injection_point = url.find("=").unwrap() + 1;
    // let suffix = &url[injection_point..];
    // let prefix: &str = &url[..injection_point];
        
    // let resp = reqwest::get(&url)
    //     .await?
    //     .status();

    // if !resp.is_success() {
    //     panic!("This URL doesn't point to anything :(");
    // }
    // else {
    //     let mut count: i32 = 1;

    //     loop {
    //         let mut order_by = String::from("' ORDER BY ");
            
    //         order_by.push_str(count.to_string().as_str());
    //         order_by.push_str(suffix);

    //         let newUrl = url.replace(suffix, order_by.as_str()); 
    //         println!("suffix: {}", suffix);
    //         println!("prefix: {}", prefix);
    //         println!("replacement phrase {}", order_by);
    //         println!("old url: {}", url); //(suffix, order_by.as_str());
    //         println!("new url: {}", newUrl);
    //         count = count + 1;
    //         if count > 3 {
    //             break;
    //         }
    //     }

        // println!("suffix: {}", suffix);
        // println!("new url: {}", newUrl);
        //println!("{:#?}", resp);
        Ok(())
    // }
}
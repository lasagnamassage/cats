# BASIC IDEA

I really would rather have a slick tool to make SQL injection pentesting easier. Originally thinking of setting this up as a CLI tool, though there are other options that sound pretty appealing:
- Tor/Chrome/Firefox extension(s)
    - Pros:
        - Easy workflow if already looking at a site
        - Could potentially allow users to search specific inputs with user-defined hotkey
        - Easy setup for script kiddies
        - Monetization opportunity in later releases. Could offer certain attack automation functionality for a small fee
    - Cons:
        - Using a non-onion routing browser could potentially expose attacker. Could be solved by allowing user to check a box whether they want to use Tor or not 
        - Probably need to wrap central functionality for each browser. So the final result would be something like 4 repos, cats-core (no-ads), cats-chrome, cats-firefox

OK NVM it makes more sense to do this as a browser extension actually. 

So, no rust-port, all JS. Realized that WebAssembly doesn't really make sense here sense the bottlenext is moreso responses from the server. Maybe we could tap into a language that allows multithreading (although I recall we can make Node multithreaded somehow). 

--- does research on how to achieve this ---

Ok, found out with Web Workers we can make this happen. So I guess when we're scanning for vulnerabilities on an application, we can spin up web workers for each unique query with a new Tor instance via Axios. 
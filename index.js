/**
 * Step 1: Get input URL from CLI
 */

const axios = require('axios');
const injectionSyntax = /=\w*/;
const ERRORS_HANDLED = {
    "ECONNREFUSED": "This website can't be connected to. Is this the right address?"
}

let target = process.argv[2];
console.log(target);

axios
.get(target)
.then(res => {
    if (res.status === 200) {
        //console.log(res);
        let url = res.config.url;
        let injectionPoint = url.search(injectionSyntax) + 1;
        console.log(url.substring(injectionPoint));
    }
    //console.log(`statusCode: ${res.status}`);
    
})
.catch(error => {
    switch(error.code) {
        case Object.keys(ERRORS_HANDLED)[0]:
            console.log(ERRORS_HANDLED.ECONNREFUSED)
        default:
            console.log("Error?")
    }
});
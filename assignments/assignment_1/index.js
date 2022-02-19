function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    let name = process.argv;
    let n=name.length;
    return name[n-1];
}

function getNameFromEnv() {
    // Write your code here
    const name = process.env.NAME;
    return name;

}

function getNameFromReadLine() {
    //Write your code here
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question('',name => {
        console.log(name);
        readline.close();
    });
    return
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}
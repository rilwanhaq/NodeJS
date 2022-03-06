const fs = require('fs');
const http = require('http');
const path = require('path');

fs.writeFileSync('index.html',"<h1>Hello World</h1>",err => {
    console.log(err);
});

const server = http.createServer((req,res) => {
    fs.readFile(path.join(__dirname,"index.html"), {encoding:"utf-8"}, (err,data) => {
        res.end(data);
    });
});
server.listen(3000, () => console.log("Server is running on port 3000"));
const fs = require("fs");

const base64 = fs.readFileSync("./test.xlsx").toString("base64");
console.log(base64);

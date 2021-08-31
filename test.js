console.log("Hello Node!");

//importing os
const os = require("os");
console.log(`os type: ${os.type()}`);

//importing fs
const fs = require("fs");
fs.readFile("./file.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log("data :\n" + data);
});

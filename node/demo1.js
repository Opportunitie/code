let fs = require("fs");
let stdin = process.stdin;
let stdout = process.stdout;
let allfiles = null;
let stats = [];
function file(i, fileData) {
  let filename = fileData[i];
  // fs.stat 检查文件是否存在
  fs.stat(`${__dirname}/${filename}`, function (err, stat) {
    console.log(err);
    stats[i] = stat;
    if (stat.isDirectory()) {
      console.log("文件夹", `${i}   ${filename}`);
    } else {
      console.log("文件", `${i}   ${filename}`);
    }
    i++;
    if (i == fileData.length) {
      read();
    } else {
      file(i, fileData);
    }
  });
}
// 读取用户输入的数据
function read() {
  console.log("");
  stdout.write(`Enter your choice: `);
  stdin.resume();
  stdin.setEncoding("utf-8");
  stdin.on("data", option);
}
// option
function option(data) {
  let filename = allfiles[Number(data)];
  if (!filename) {
    stdout.write("Enter your choice:");
  } else {
    stdin.pause();
    if (stats[Number(data)].isDirectory()) {
      fs.readdir(`${__dirname}\/${filename}`, function (err, files) {
        console.log("");
        console.log(`(${files.length} files)`);
        files.forEach(function (file,i) {
          console.log(`  -   ${i}  ${file}`);
        });
        console.log("");
      });
    } else {
      fs.readFile(`${__dirname}/${filename}`, "utf8", function (err, data) {
        console.log("");
        console.log('\033[90m' +data + '\033[39m');
      });
    }
  }
}
fs.readdir(process.cwd(), function (err, files) {
  console.log("");
  allfiles = files;
  if (!files.length) {
    return console.log("No files to show!\n");
  }
  console.log("Select which file or directory you want to see\n");

  file(0, files);
});


// node js常用api
process.argv
// 获取当前目录
process.cwd()
// 更改工作目录
process.chdir('/')
// 退出
process.exit(1)
// 进程和操作系统通信
process.on('SIGKILL',function(){
  // 信号已收到
})



f
// 监控文件变化

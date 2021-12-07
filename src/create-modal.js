const fs = require("fs");
const util = require("util");
const Sequelize = require("sequelize");
const exec = util.promisify(require("child_process").exec);

let fields = {
  minUnit: "Integer",
  minUnitPrice: "Integer",
  vendorId: "Integer",
  offerCode: "String",
};
if (fields["id"]) {
  delete fields.id;
}

let SeqObj = "";
for (let key in fields) {
  SeqObj += `${key}:${fields[key].toLowerCase()},`;
}
let tableName = "VendorProducts";

let command = `sequelize-cli model:generate --name ${tableName} --attributes ${SeqObj}`;
command = command.substring(0, command.length - 1);
console.log("command", command);
new Promise(function (resolve, reject) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return reject(error);
    }
    resolve(true);
  });
});

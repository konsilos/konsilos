"use strict";

const execSync = require('child_process').execSync;
const fs = require('fs');

function run(command) {
  return execSync(command).toString().trim();
}

console.log("Reading 'versions' file...");
let versions = fs.readFileSync(".meteor/versions").toString().split("\n").filter(x => x != "");

let packages = versions.map(version => {
  let s = version.split("@");
  return {
    name: s[0],
    version: s[1],
    deps: [],
    depBy: [],
  };
});

console.log("Querying Meteor packages...");
packages.forEach(pack => {
  console.log(pack.name);
  try {
    let description = run(`meteor show --ejson ${pack.name}@${pack.version}`);
    let parsed = JSON.parse(description);
    parsed["dependencies"].forEach(dep => {
      let depPack = packages.find(x => x.name == dep.name);
      if (!!depPack) {
        if (dep.weak) {
          depPack.depBy.push(pack.name + " (weak)");
          pack.deps.push(depPack.name + " (weak)");
        } else {
          depPack.depBy.push(pack.name);
          pack.deps.push(depPack.name);
        }
      }
    });
  } catch (er) {}
});

console.log();
console.log("Package dependencies");
console.log("====================");

packages.forEach(pack => {
  console.log();
  console.log(`${pack.name}@${pack.version}`);
  console.log("  depends on:");
  pack.deps.forEach(x => console.log("   -", x));
  console.log("  depended by:");
  pack.depBy.forEach(x => console.log("   -", x));
});

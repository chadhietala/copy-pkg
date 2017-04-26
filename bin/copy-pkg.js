#!/usr/bin/env node

const execSync = require('child_process').execSync;
const existsSync = require('fs').existsSync;
const tmpDir = require('os').tmpdir;
const moduleName = process.argv[2];
const copyPkgDir = `${tmpDir()}/copy-pkg-cache`

if (moduleName) {
  let nodeModulesPath = `${process.cwd()}/node_modules/${moduleName}`;

  if (existsSync(nodeModulesPath)) {
    execSync(`rm -rf ${nodeModulesPath}`);
  } else {
    execSync(`mkdir -p ${nodeModulesPath}`);
  }

  execSync(`cp -r ${copyPkgDir}/${moduleName}/ ${nodeModulesPath}/`);
} else {
  let cachePath = `${copyPkgDir}/${require(`${process.cwd()}/package.json`).name}`;
  if (existsSync(cachePath)) {
    execSync(`rm -rf ${cachePath}`);
  } else {
    execSync(`mkdir -p ${cachePath}`);
  }

  execSync(`cp -r ${process.cwd()}/ ${cachePath}`);
}

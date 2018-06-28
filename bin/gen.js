#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

let CPU_NUM = parseInt(process.argv.slice(-1)[0], 10)
let index = -1

const args = process.argv[3].split(/\s+/)

index = args.indexOf('-max-instances')
if (index > -1) {
  const MAX_CPU_NUM = parseInt(args.splice(index, 2)[1], 10)
  if (CPU_NUM > MAX_CPU_NUM && MAX_CPU_NUM > 0) {
    CPU_NUM = MAX_CPU_NUM
  }
}

args.unshift('pm2')

index = args.indexOf('--instances')

if (index > -1 && parseInt(args[index + 1], 10) === 0) {
  args[index + 1] = CPU_NUM
}

index = args.indexOf('-i')
if (index > -1 && parseInt(args[index + 1], 10) === 0) {
  args[index + 1] = CPU_NUM
}

const confFile = args.find(item => /(\.json|config\.js)$/.test(item))

if (confFile) {
  const filePath = path.join(__dirname, `../../../../${confFile}`)
  let flag = false
  const config = require(filePath)
  config.apps.forEach((item) => {
    if (item.instances === 0) {
      flag = true
      item.instances = CPU_NUM
    }
  })
  if (flag && /\.json$/.test(confFile)) {
    fs.writeFileSync(filePath, JSON.stringify(config))
  } else if (flag) {
    fs.writeFileSync(filePath, `module.exports=${JSON.stringify(config)}`)
  }
}
console.log(args.join(' '))

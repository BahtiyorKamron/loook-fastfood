import path from 'path'
import fs from 'fs'

const read = (fileName)=>{
   let data =   fs.readFileSync(path.join(process.cwd(),'database',fileName + '.json'))
   return data.length ? JSON.parse(data) : []
}
const write = (fileName,data)=>{
  fs.writeFileSync(path.join(process.cwd(),'database',fileName+'.json'),JSON.stringify(data,null,4))
  return true
}
export {
  read,
  write
}

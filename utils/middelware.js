import { promises as fs } from "fs";
import path from "path";
export const read = async (table) => {
  const tablePath = path.join("data", `${table}.json`);

  const data = await fs.readFile(tablePath, "utf-8");

  return JSON.parse(data);
};

export const getAllAuthors = async (tableName) => {
    console.log(tableName);
    
        const pathName=path.join("data",`${tableName}.json`)
        console.log(pathName);
        
        const fileData = await fs.readFile(pathName, "utf-8");
        const data = JSON.parse(fileData);
        return data
        
       
    
};
export const writeAuthors=async(data,tableName)=>{
    
    
    const allAuthors=await getAllAuthors(tableName)
    
    allAuthors.push(data)
    const pathName=path.join("data",`${tableName}.json`)
    const fileData = JSON.stringify(allAuthors,null,2);
    await fs.writeFile(pathName,fileData)
}

export const clearAndWrite=async(data,tableName)=>{
    
    const pathName=path.join("data",`${tableName}.json`)
    const fileData = JSON.stringify(data,null,2);
    await fs.writeFile(pathName,fileData)
}


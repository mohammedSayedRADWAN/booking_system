import express from "express"
import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import {getAllAuthors,writeAuthors,clearAndWrite} from "../utils/middelware.js"
const router=express.Router()
const authorKeys = ["name", "country"];
import { fixBody } from "../utils/fixBody.js";


router.get("",async(req,res)=>{
     
    /*const fileData = await fs.readFile("data/authors.json", "utf-8");
    const data = JSON.parse(fileData);
     res.json({ message: "All authors" ,data});
    */
   const data = await getAllAuthors('authors');
   res.json({ message: "All authors" ,data});
})

router.post("", async (req, res) => {
  try {
    const { name, country } = req.body;
    if (!name || !country) {
      return res.status(400).json({ message: "name and country are required" });
    }

    // اقرأ الملف
    /*const fileData = await fs.readFile("data/authors.json", "utf-8");
    const data = JSON.parse(fileData);*/

    // ضيف الكاتب الجديد
   /* 
    data.push(newAuthor);

    // اكتب الملف تاني
    await fs.writeFile("data/authors.json", JSON.stringify(data, null, 2));*/
    
    const newAuthor = {id:nanoid(), name, country };
    await writeAuthors(newAuthor,"authors")

    res.status(201).json({ message: "Author created successfully", author: newAuthor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id",async(req,res)=>{
    const {id:authorId}=req.params
    console.log(authorId);
    
    const fileData = await fs.readFile("data/authors.json", "utf-8");
    const authors = JSON.parse(fileData);
    const authorFound=authors.find(author=>author.id===authorId)
    console.log(authorFound);
    res.json({ message: "get author by id" ,authorFound});
    
})
router.patch("/:id",async(req,res)=>{
  const {id:authorId}=req.params
  const author_data=fixBody(req.body,authorKeys)
  
  /*for (const key in author_data) {
    if (!authorKeys.includes(key)) {
      delete author_data[key];
    }
  } */
  const authors=await getAllAuthors('authors')
  const authorFound=authors.find(author=>author.id===authorId)
  const authorIndex=authors.indexOf(authorFound)
  if (authorIndex===-1) {
    res.status(404).json({ message: "author not found" });
  }
  //عملت spread علشان المستخدم لو دخل قيم نقصه باقى القيم مضعش
  authors[authorIndex]={...authorFound,...author_data}
  await clearAndWrite(authors,"authors") 
    res.json({ message: "updated successfully" ,authorUpdated:authors[authorIndex]});
})
router.delete("/:id",async(req,res)=>{
  const {id:authorId}=req.params
  const authors=await getAllAuthors('authors')
  const authorFound=authors.find(author=>author.id===authorId)
  const authorIndex=authors.indexOf(authorFound)
  if (authorIndex===-1) {
    res.status(404).json({ message: "author not found" });
  }
  authors.splice(authorIndex,1)
  await clearAndWrite(authors,"authors")
    res.json({ message: "deleteted successfully",authorFound });
})

export default router
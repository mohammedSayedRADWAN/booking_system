import express from "express"
import { nanoid } from "nanoid";
import { promises as fs } from "fs";
const router=express.Router()
router.get("",async(req,res)=>{

    const fileData = await fs.readFile("data/authors.json", "utf-8");
    const data = JSON.parse(fileData);
     res.json({ message: "All authors" ,data});
    
})

router.post("", async (req, res) => {
  try {
    const { name, country } = req.body;
    if (!name || !country) {
      return res.status(400).json({ message: "name and country are required" });
    }

    // اقرأ الملف
    const fileData = await fs.readFile("data/authors.json", "utf-8");
    const data = JSON.parse(fileData);

    // ضيف الكاتب الجديد
    const newAuthor = {id:nanoid(), name, country };
    data.push(newAuthor);

    // اكتب الملف تاني
    await fs.writeFile("data/authors.json", JSON.stringify(data, null, 2));

    res.json({ message: "Author created successfully", author: newAuthor });
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
router.patch("/:id",(req,res)=>{
    res.json("update author by id")
})
router.delete("/:id",(req,res)=>{
    res.json("delete author by id")
})

export default router
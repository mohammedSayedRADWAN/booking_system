import express from "express"
const router=express.Router()
router.get("",(req,res)=>{
    res.send("get all books")
})
router.post("",(req,res)=>{
    res.json("create new book")
})
router.get("/:id",(req,res)=>{
    res.json("get book by id")
})
router.patch("/:id",(req,res)=>{
    res.json("update book by id")
})
router.delete("/:id",(req,res)=>{
    res.json("delete book by id")
})

export default router
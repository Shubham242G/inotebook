const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body,validationResult } = require('express-validator');

//ROUTE 1: Get all the Note using: GET "/api/auth//fetchallnotes".Login required
router.get('/fetchallnotes', fetchUser ,async (req,res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 2:Add a new Note using: POST"/api/auth/addnote"
router.post('/addnote', fetchUser ,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be ateast 5 characters').isLength({min:5}),],async (req,res)=>{
    
    try{
        const {title,description, tag,} = req.body;

        //If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const note = new Note({
            title,description, tag, req, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
    }

})

//ROUTE 3:Update an existing Note using: POST"/api/auth/updatenote". Login required
router.put('/updatenote/:id', fetchUser ,async (req,res)=>{
    const{title, description, tag} = req.body;
    //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag};
    
    //Find the note to be updated and update it
    //const note = Note.findByIdAndUpdate()

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
})

//ROUTE 4:Delete an existing Note using: DELETE"/api/auth/deletenote". Login required
router.delete('/deletenote/:id', fetchUser ,async (req,res)=>{
    const{title, description, tag} = req.body;
    try{
    //Find the note to delete and delete it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}
    
    //Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note: note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router
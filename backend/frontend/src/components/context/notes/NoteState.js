import React from "react";

import noteContext from "./noteContext";
import { useState} from "react";

const NoteState = (props)=>{
    const notesInitial=[]
    const[state, setState] = useState(notesInitial)
    const host = "http://localhost:5000"
    
    
    const  fetchAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
        });
          const json = await response.json();
          setState(json);
          
    }
    
    const addNote = async(title, description, tag) => {
    
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        
        
        const note = await response.json();
        setState(state.concat(note))
        
    }

    const deleteNote=async(id)=>{
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          
        
        const newState = state.filter((state)=>{return state._id !== id})
        setState(newState);
    }

    const updateNote= async(id,title,description,tag)=>{
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        
       
        const newState = JSON.parse(JSON.stringify(state))//to create a deep copy of objects or it wont reflect the updations on frontend
        for(let index=0; index < newState.length; index++){
            const element = newState[index];
            if(element._id === id){
                newState[index].title = title;
                newState[index].description = description;
                newState[index].tag = tag;
                break;
            }
            
        }
        setState(newState);
    }

    
    return(
        <noteContext.Provider value={{state,setState,addNote, deleteNote,fetchAllNotes,updateNote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
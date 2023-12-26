import React from "react";
import noteContext from "./context/notes/noteContext";
import { useContext } from "react";

const Noteitem =(props)=>{
    const currDate = new Date(props.obj.date)
    const today = currDate.toDateString();

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const deleteButton=()=>{
        deleteNote(props.obj._id)
        props.showAlert('Note deleted','success')

    }
    
    return(
        
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-header">
                        {today}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.obj.title}</h5>
                        <p className="card-text">{props.obj.description}</p>
                    </div>
                    <div className="buttons">
                    <i onClick={()=>{deleteButton()}} className="fa-solid fa-trash mx-3"></i>
                    <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{props.handleClick(props.obj)}} ></i>
                    </div>
                </div>
            </div>

    )
}

export default Noteitem
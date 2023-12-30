import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "./context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";



const Notes = (props) => {
    const context = useContext(noteContext);
    const { state, fetchAllNotes,updateNote} = context;
    const{showAlert} = props;
    const [change,setChange] = useState({etitle:'',edescription:'',etag:'',id:''});
    let Navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNotes();
        }
        else {
            Navigate('/login');
        } 
    }, [])

    const mod = useRef(null);
    const Close = useRef(null);
    
    const handleModalClick=(currentNote)=>{
        mod.current.click();
        setChange({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag,id:currentNote._id})
    }


    const handleClick=(e)=>{
        e.preventDefault();        
        Close.current.click();
        updateNote(change.id, change.etitle, change.edescription, change.etag);
        setChange({etitle:"",edescription:"",etag:''});
        props.showAlert('Note updated successfully','success')
    }

    const onChange=(e)=>{    
        setChange({...change,[e.target.name]:e.target.value})
    }

    return (
        <>
            <h2>Your Notes</h2>
            <button ref={mod} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={change.etitle} minLength={5} required className="form-control" id="etitle" name="etitle" onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={change.edescription} minLength={5} required className="form-control" id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={change.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={Close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {state.length===0 && 'No notes to display'}
            <div className="row">
                {state.map((obj) =>
                    <Noteitem showAlert={showAlert} key={obj._id} obj={obj} change={change} handleClick={handleModalClick} />
                )}
            </div>
        </>
    )
}

export default Notes
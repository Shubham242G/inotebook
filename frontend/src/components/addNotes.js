import React, { useContext, useState } from "react";
import noteContext from "./context/notes/noteContext";


const AddNotes=(props)=>{

    const context = useContext(noteContext);
    const {addNote,state} = context;
    const [change, setChange] = useState({title:"",description:"",tag:''})

    const onChange =(e)=>{
        setChange({...change, [e.target.name]:e.target.value});
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(change.title,change.description,change.tag)
        setChange({title:"",description:"",tag:''});
        props.showAlert('Note added successfully','success')
    }
    return(
        <>
            <div className='container my-3'>
                <h2>ADD NOTES</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" minLength={5} value={change.title} required className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" minLength={5} value={change.description} required className="form-control" id="description" name="description" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={change.tag} id="tag" name="tag" onChange={onChange}/>
                    </div>
                    <button disabled={change.title.length < 5 || change.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}
export default AddNotes;
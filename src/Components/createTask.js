import React,{useState} from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Createtask(){
    const navigate=useNavigate();
    const[title,setTile]=useState('');
    const[description,setDescription]=useState('');
    const[duedate,setDueDate]=useState('');
    const[status,setStatus]=useState('');

    function handleSubmit(){
        const data={
            title:title,
            description:description,
            due_date:duedate,
            status:status
        }
        axios.post('http://127.0.0.1:8000/createtask',data).then(response=>{
            toastr.success("New Task Added")
            navigate('/dashboard')
        })
    }

    const handleStatusChange=(event)=>{
        setStatus(event.target.value);
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{color:'rgb(221, 130, 54)'}}>CREATE TASK</h1>
                    <div className="form-group">
                        <label className="addtask-label">Title</label>
                        <input 
                        type="text" 
                        value={title}
                        className="form-control" 
                        onChange={(event)=>{setTile(event.target.value)}}
                        placeholder="Enter Title"
                        />
                    </div>
                    <div className="form-group">
                        <label className="addtask-label">Description</label>
                        <input 
                        type="text" 
                        value={description}
                        className="form-control" 
                        onChange={(event)=>{setDescription(event.target.value)}}
                        placeholder="Description"
                        />
                    </div>
                    <div className="form-group">
                        <label className="addtask-label">Due Date</label>
                        <input 
                        type="text" 
                        value={duedate}
                        className="form-control" 
                        onChange={(event)=>{setDueDate(event.target.value)}}
                        placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <div className="form-group">
                        <label className="assigntask-label">Select Status</label>
                        <select  defaultValue="" value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="" disabled>Choose Status</option>
                            <option value="ToDo" >ToDO</option>
                            <option value="InProgress" >InProgress</option>
                            <option value="Completed" >Completed</option>
                            <option value="Blocked" >Blocked</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <Link to={'/dashboard'} className="btn btn-info">Back</Link>
                        <button className="btn btn-success" onClick={handleSubmit}>Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Createtask;
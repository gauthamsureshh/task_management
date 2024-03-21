import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Link,useNavigate,useParams } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Edittask(){
    const {taskid}=useParams()
    const navigate=useNavigate();
    const[title,setTile]=useState('');
    const[description,setDescription]=useState('');
    const[duedate,setDueDate]=useState('');
    const[status,setStatus]=useState('');
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/edittask/${taskid}`).then(response=>{
            setTile(response.data.title)
            setDescription(response.data.description)
            setDueDate(response.data.due_date)
            setStatus(response.data.status)
        })
    },[taskid])
    function editTask(){
        const data={
            title:title,
            description:description,
            due_date:duedate,
            status:status
        }
        axios.put(`http://127.0.0.1:8000/edittask/${taskid}`,data).then(response=>{
            toastr.success("Task Editted Successfully")
        })
        navigate('/dashboard')
    }


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{color:'rgb(221, 130, 54)'}}>EDIT TASK</h1>
                    <div className="form-group">
                        <label className="addtask-label">Title</label>
                        <input 
                        type="text" 
                        value={title}
                        className="form-control" 
                        onChange={(event)=>{setTile(event.target.value)}}
                        placeholder="Enter Title"
                        readOnly
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
                        readOnly
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
                        <label className="addtask-label">Select Status</label>
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
                        <button className="btn btn-success" onClick={editTask}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edittask;
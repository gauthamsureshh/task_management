import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import "../Styles/assignTask.css";

function Assigntask(){
    const[users,setUser]=useState([]);
    const[task,setTask]=useState([]);
    const[selectedUser, setSelectedUser] = useState(null);
    const[selectedTask,setSelectedTask]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        function fetchData(){
            axios.get('http://127.0.0.1:8000/alltask').then(response=>{
            
            setTask(response.data)
        })

        axios.get('http://127.0.0.1:8000/alluser').then(response=>{
            
            setUser(response.data)
        })
        }
        
        fetchData();
    },[])

    function handleSubmit(){
        const data={
            user:selectedUser,
            task:selectedTask

        }
        axios.post('http://127.0.0.1:8000/assigntask',data).then(response=>{
            toastr.success(`Task Assigned to ${users.find(user => user.id === parseInt(selectedUser)).username}`)
            navigate('/dashboard')

        }).catch(error=>{

        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center" style={{color:'rgb(221, 130, 54)'}}>ASSIGN TASK</h1>
                    <div className="form-group">
                        <label className="assigntask-label">Select User</label>
                        <select defaultValue="" value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)}>
                            <option value="" disabled>Select a user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="assigntask-label">Select Task</label>
                        <select  defaultValue="" value={selectedTask} onChange={(e)=>setSelectedTask(e.target.value)}>
                            <option value="" disabled>Select a Task</option>
                            {task.map(task => (
                                <option key={task.id} value={task.id}>
                                    {task.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                    {selectedUser && selectedTask && (
                        <h5>
                            You want to assign <strong>{users.find(user => user.id === parseInt(selectedUser)).username}</strong> to a task <strong>{task.find(task => task.id === parseInt(selectedTask)).title}</strong>.
                        </h5>
                    )}
                    </div>
                    <div className="form-group">
                        <Link to={'/dashboard'} className="btn btn-info">Back</Link>
                        { <button className="btn btn-success" onClick={handleSubmit} >Create Task</button> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assigntask;
import React, { useEffect, useState } from "react";
import "../Styles/status.css";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import {useSelector} from 'react-redux';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function Status(){
    const user=useSelector(store=>store.auth.user);
    const[task,setTask]=useState([]);
    const[data,setData]=useState([]);
    const navigate=useNavigate()
    
    function getTask(){
        axios.get(`http://127.0.0.1:8000/listtask/${2}`).then(response=>{
            const data=response.data;
            setData(data)
            setTask(data.tasks);
        })        
    }
    useEffect(()=>{
        getTask();
    },[])

    const handleDelete=(taskid)=>{
        const confirm=window.confirm('Are you sure you want to delete this item?');
        if(confirm){
            axios.delete(`http://127.0.0.1:8000/deletetask/${taskid}`).then(response=>{
                toastr.error('Task Deleted')
            })
        }
    }
    
    const handleEdit=(taskid)=>{
        navigate(`/edittask/${taskid}`)
    }
    
    return(
        
        <>
        <div className="container-fluid" id="ff">
            <div className="row">
            <div className="col">
                <div className="col-md">
                    <div className="card text-center text-white mb-3" id="total-tasks">
                        <div className="card-header">
                            <h5 className="card-title">Total Tasks</h5>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{data.total_task}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="col-md">
                    <div className="card text-center text-white mb-3" id="tasks-completed">
                        <div className="card-header">
                            <h5 className="card-title">Tasks Completed</h5>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{data.completed_task}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="col-md">
                    <div className="card text-center text-white mb-3" id="tasks-pending">
                        <div className="card-header">
                            <h5 className="card-title">Tasks In Progress</h5>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{data.in_progress}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
        <h4> MANAGE TASKS</h4>
                <hr/>
            <div className="col">
                <Link to={'/createtask'} className="btn btn-sm btn-outline-secondary btn-block">Create Tasks</Link>
            </div>
            <div className="col">
            <Link to={'/assigntask'} className="btn btn-sm btn-outline-info btn-block">Assign Tasks</Link>
            </div>
        </div>
        <hr/>
        <div className='row'>
            <div className="col-md">
                <h4> MY TASKS</h4>
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Desciption</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {task.map(tasks=>(
                            <tr className="table-info" key={tasks.id}>
                                <td>{tasks.id}</td>
                                <td>{tasks.title}</td>
                                <td>{tasks.description}</td>
                                <td>{tasks.due_date}</td>
                                <td>{tasks.status}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={()=>handleEdit(tasks.id)} >Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(tasks.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </div>    
    </div>
    </>
    
    )
}

export default Status;
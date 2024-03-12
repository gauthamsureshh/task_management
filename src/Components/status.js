import React, { useEffect, useState } from "react";
import "../Styles/status.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useSelector} from 'react-redux';

function Status(){
    const user=useSelector(store=>store.auth.user);
    const[task,setTask]=useState([]);
    function getTask(){
        axios.get(`http://127.0.0.1:8000/listtask/${user.id}`).then(response=>{
            setTask(response.data)
        })            
    }
    useEffect(()=>{
        getTask();
    },[])
    
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
                            <h3 className="card-title">4</h3>
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
                            <h3 className="card-title">4</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="col-md">
                    <div className="card text-center text-white mb-3" id="tasks-pending">
                        <div className="card-header">
                            <h5 className="card-title">Tasks Pending</h5>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">6</h3>
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
                                    <button className="btn btn-secondary" >Edit</button>
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
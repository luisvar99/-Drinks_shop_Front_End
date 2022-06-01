import React, { useState, useEffect } from 'react';
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [client_id, setClient_id] = useState("")

    const navigate = useNavigate();
    
    useEffect(() => {
      
    },[client_id])
    
    const Login = (e) => {
      e.preventDefault();
      axios.post('http://localhost:4000/login',{
        username: username,
        password: password
      }).then((res) => {
        if(res.data.length!==0){
          setClient_id(res.data[0].client_id);
          navigate(`/${client_id}`)
        }else{
          alert("Invalid Credentials");
        }
      }).catch((error) => {
        alert(error)
      })
    }
    
  return (
      <form onSubmit={Login}>
        <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Iniciar Sesion</button>    
      </form>
  )
}

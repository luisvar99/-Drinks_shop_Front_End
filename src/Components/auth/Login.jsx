import React, { useState, useEffect, useContext } from 'react';
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const {client} = useContext(UserContext)
    
    const Login = (e) => {
      e.preventDefault();
      axios.post('http://localhost:4000/login',{
        username: username,
        password: password
      }).then((res) => {
        if(res.data.length!==0){
          localStorage.setItem('client_id',res.data[0].client_id)
          localStorage.setItem('username',username)
          localStorage.setItem('name',res.data[0].name)
          localStorage.setItem('last_name',res.data[0].last_name)
          //console.log('ContextData -> ' + JSON.stringify(res.data[0]));
          //setClient(localStorage.getItem(res.data[0]))
          console.log('Context desde Login-> ' + JSON.stringify(client));
          navigate("/")
        }else{
          alert("Invalid Credentials");
        }
      }).catch((error) => {
        alert('Error en Login ' + error)
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

import React, { useState, useEffect, useContext } from 'react';
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const {setClient_id} = useContext(UserContext)
    
    const Login = (e) => {
      e.preventDefault();
      axios.post('https://drinkstienda.herokuapp.com/login',{
        username: username,
        password: password
      }).then((res) => {
        if(res.data.length!==0){
          localStorage.setItem('client_id',res.data[0].client_id)
          setClient_id(localStorage.getItem('client_id'))
          navigate('/');
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

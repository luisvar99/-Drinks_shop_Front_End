import React, { useState, useEffect } from 'react';
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const [name, setName] = useState("")
    const [last_name, setLast_name] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

/* useEffect(() => {
    console.log(name);
    console.log(last_name);
    console.log(phone);
}) */

    const createNewUser = async (e) =>{
        e.preventDefault();
        //setAddingLoder("Añadiendo producto...");
        try{
        await axios.post('http://localhost:4000/newClient',
        {
            name: name,
            username,
            password,
            last_name: last_name,
            phone: phone,

        }
        )
        navigate("/login");
        }catch(e){
            alert("Error")
        }
        //setAddingLoder("Producto añadido!");
        createUserCart();
        
    }

    const createUserCart = async (e) =>{
        e.preventDefault();
        //setAddingLoder("Añadiendo producto...");
        try{
        await axios.post('http://localhost:4000/userCart',
        {
            name: name,
            last_name: last_name,
            phone: phone
        }
        )
        }catch(e){
            alert("Error")
        }
        //setAddingLoder("Producto añadido!");
        
    }
    

    return (
        <form onSubmit={createNewUser}>
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" onChange={(e)=>setLast_name(e.target.value)}/>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="tel" onChange={(e)=>setPhone(e.target.value)}/>
            <button type="submit">Registrarme</button>
            
        </form>
    )
}

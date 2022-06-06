import React, { useState, useEffect } from 'react';
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const [name, setName] = useState("")
    const [last_name, setLast_name] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

/* useEffect(() => {
    console.log(name);
    console.log(last_name);
    console.log(phone);
}) */
    const checkUserName = async (e) =>{
        e.preventDefault();
        //setAddingLoder("Añadiendo producto...");
        try{
        await axios.get(`http://localhost:4000/checkUserName/${username}`).then((res)=> {
            if(res.data.length ===0){
                console.log('Data: ',res.data);
                //alert("OK")
                createNewUser();
            }else{
                console.log('Data: ',res.data);
                alert("Invalid Username")
            }
        });

        }catch(e){
            alert("Error")
        }
    }


    const createNewUser = async () =>{
        //setAddingLoder("Añadiendo producto...");
        await axios.post('http://localhost:4000/newClient',
        {
            username,
            password,
            name,
            last_name,

        }).then(()=> {
            alert("Client Added")
            createUserCart();
            navigate("/login");
            
        }).catch((err)=>{
            alert("Error")
        });

        //setAddingLoder("Producto añadido!");
        
    }

    const createUserCart = async () =>{
        //setAddingLoder("Añadiendo producto...");
        try{
        await axios.post('http://localhost:4000/createUserCart',
        {
           username
        }
        ).then(()=>{
            alert("Cart created!")
            localStorage.setItem('username', username)
        })
        }catch(e){
            alert("Error")
        }
        //setAddingLoder("Producto añadido!");
        
    }
    

    return (
        <form onSubmit={checkUserName}>
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" onChange={(e)=>setLast_name(e.target.value)}/>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Registrarme</button>
            
        </form>
    )
}

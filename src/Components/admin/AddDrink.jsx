import React, { useState, useEffect } from 'react'
import './AddDrinkStyles.css'
import axios from 'axios'

export default function AddDrink() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [addingLoder, setAddingLoder] = useState("")

    const addDrink = async (e)=>{
        e.preventDefault();
        setAddingLoder("Añadiendo producto...");
        try{
        await axios.post('http://localhost:4000/drinks',
        {
            name: name,
            description: description,
            price: price
        }
        )
        }catch(e){
            alert("Error")
        }
        setAddingLoder("Producto añadido!");
    }

    return (
        <div className="add_drink_main_container">
            
            <div className="form_container">
                <h2>Add new Drink</h2>
                <form className="form" onSubmit={addDrink}>
                    <div>
                        <p>Name:</p>
                            <input id="name" type="text" onChange={(e)=>setName(e.target.value)}/>
                        <div>
                    </div>
                        <p>Description:</p>
                            <textarea id="description" type="text" rows="10" cols="36" onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <p>Price:</p>
                            <input id="price" type="number" onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <p>{addingLoder}</p>
                    
                    <button className="save_btn" type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

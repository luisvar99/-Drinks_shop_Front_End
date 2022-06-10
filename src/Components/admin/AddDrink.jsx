import React, { useState, useEffect } from 'react'
import './AddDrinkStyles.css'
import axios from 'axios'

export default function AddDrink() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [productCategory, setProductCategory] = useState("")
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState("")
    const [productImg, setProductImg] = useState("")

    const [addingLoder, setAddingLoder] = useState("")

    useEffect(() => {
        getCategories();
    },[])

    const addDrink = async (e)=>{
        e.preventDefault();
        setAddingLoder("Añadiendo producto...");
        try{
        await axios.post('http://localhost:4000/drinks',
        {
            name: name,
            price: price,
            description: description,
            category: productCategory,
            img: "https://www.rohnisch.com/on/demandware.static/-/Sites-rohnisch-catalog/default/dw84580a23/Hi-res/110513_S126_P1.png"
        })
        }catch(e){
            alert("Error")
        }
        setAddingLoder("Producto añadido!");
    }

    const getCategories = () => {
        axios.get('http://localhost:4000/categories').then((res)=>{
            console.log(res.data);
            setCategories(res.data)
        }).catch((err) => {
            console.log(err);
        })
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
                    <select value={productCategory} style={{width:"80%",height:"30px", marginBottom:"1rem", marginLeft:"1rem"}} 
                        onChange={(e)=>{setProductCategory(e.target.value)}} name="select_address">
                            <option value="" selected disabled hidden>Choose Category</option>
                        {categories.map((category)=>(
                            <option value={category.name}>{category.name}</option>
                        ))
                        }               
                    </select>
                    <p>{addingLoder}</p>
                    
                    <button className="save_btn" type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

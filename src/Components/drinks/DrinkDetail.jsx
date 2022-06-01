import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './DrinkDetailStyles.css'
import { FaWhatsapp } from 'react-icons/fa';
import {Link} from 'react-router-dom'


export default function DrinkDetail() {
    
    const [drinkName, setDrinkName] = useState('');
    const [drinkImg, setDrinkImg] = useState('');
    const [drinkPrice, setDrinkPrice] = useState(0);
    const [drinkDescription, setDrinkDescription] = useState('');

    const params = useParams();
    
    useEffect(() => {
        getDrink();
        console.log(localStorage);
    })

    const getDrink = () => {
        axios.get('http://localhost:4000/drinks/' + params.id).then( (res) => {
            console.log('Drink Found -> ' + JSON.stringify(res.data));
            console.log('Params -> ' + JSON.stringify(params.id));
            setDrinkName(res.data[0].name);
            setDrinkDescription(res.data[0].description);
            setDrinkImg(res.data[0].imgUrl);
            setDrinkPrice(res.data[0].price);
        }).catch((err)=>{
            console.log(err);
        })

    }

    const createCart = () => {
        
    }
    
    return (
        <>
        <div className="main_detail_container">
            <div className="detail_container">
                <div className="sub_detail_container">
                    <img src={drinkImg} alt="" />
                </div>
                <div className="third_detail_container">
                    <p style={{fontSize:'2rem'}}>{drinkName}</p>
                    <p>{drinkDescription}</p>
                    <p>Price: {drinkPrice}$</p>
                    <button onClick={createCart}>Add to cart</button>
                </div>
            </div>
        <FaWhatsapp className='waIcon'/>
        </div>
        </>
    )
}

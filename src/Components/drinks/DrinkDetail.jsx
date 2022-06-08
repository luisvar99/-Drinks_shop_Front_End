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
    const [quantity, setQuantity] = useState(1);
    const [userCart, setUserCart] = useState(0);
    const [username, setUsername] = useState("");

    const params = useParams();
    
    useEffect(() => {
        getDrink();
        getUserCart();
        setUsername(localStorage.getItem("username"));
    },[])

    const getDrink = () => {
        axios.get('http://localhost:4000/drinks/' + params.id).then( (res) => {
            console.log('Params -> ' + JSON.stringify(params.id));
            setDrinkName(res.data[0].name);
            setDrinkDescription(res.data[0].description);
            setDrinkImg(res.data[0].img_URL);
            setDrinkPrice(res.data[0].price);
        }).catch((err)=>{
            console.log(err);
        })

    }

    const addToCart = (product_id, quantity, userCart) => {
            axios.post('http://localhost:4000/addToCart', {
                product_id,
                quantity,
                cart_id: userCart 
            }).then((res) => {
                alert('Added to cart');
            }).catch((err) => {
                console.log('error -> ' + err);
            })
    }

    const getUserCart = () => {
        console.log("User: " + localStorage.getItem('username'));
        axios.get('http://localhost:4000/getUserCartId/'+localStorage.getItem('username')).then((res) => {
            if(res.data.length!==0){
                console.log('Carrito actual_: ' , res.data);
                setUserCart(res.data);
            }else{
                console.log("Carrito actual: " + res.data);
                console.log("State Carrito actual: " + userCart);
            }
        }).catch((err) => {
            console.log('error -> ' + err);
        })
    }

    const editQuantity = () =>{
        if(quantity!==1){
            setQuantity(quantity-1)
        }
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
                    <div className="quantity_set_up">
                        <button onClick={editQuantity}>-</button>
                        <p>Quantity : {quantity}</p>
                        <button onClick={()=>setQuantity(quantity+1)}>+</button>
                    </div>
                    <button className="addToCartBtn" onClick={()=>{addToCart(params.id, quantity, userCart)} }>Add to cart</button>
                </div>
            </div>
        <FaWhatsapp className='waIcon'/>
        </div>
        </>
    )
}

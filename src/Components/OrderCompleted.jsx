import axios from 'axios';
import React, {useEffect,useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from './context/UserContext';


export default function OrderCompleted({total_amount}) {

  //const {client} = useContext(UserContext);

  const [order_id, setOrder_id] = useState(0)
  const [username, setUsername] = useState("")

  const params = useParams();

    useEffect(() => {
        //console.log("USERNAME: " + localStorage.getItem('username'));
        setUsername(localStorage.getItem('username'))
        completeOrder();
        console.log("username: " + username);
    },[])

    
    const completeOrder = async () => {
        await axios.post('http://localhost:4000/createOrder', {
          total_amount: params.amount,
          username: params.client_id,
          cart_id: params.cart_id,
          address_id: 0
        })

        getCartOrderId();
      }

      const getCartOrderId = async () => {
        await axios.get('http://localhost:4000/getUserCartOrderId/' + params.client_id).then((res)=>{
          console.log('data -> ' + JSON.stringify(res.data[0]));
          updateUserCart(res.data[0].id)
        }).catch((err)=>{
          console.log(err.message);
        })
      }

      const updateUserCart = async (id) => {
        console.log('order_id -> ' + id);
        await axios.put('http://localhost:4000/updateUserCart' , {
          order_id: id,
          client_id: params.client_id
        }).then(()=>{
          createUserCart();
        })
      }

      const createUserCart = async () =>{
        //setAddingLoder("Añadiendo producto...");
        setUsername(localStorage.getItem('username'))
        try{
        await axios.post('http://localhost:4000/createUserCart',
        {
           username: localStorage.getItem('username') || username
        }
        ).then((res)=>{
            //alert("Cart created!")
            console.log("Carrito creado: " + JSON.stringify(res.data));
            //localStorage.setItem('username', username)
        })
        }catch(e){
            alert("Error")
        }
      }

  return (
    <div>OrderCompleted!</div>
  )
}

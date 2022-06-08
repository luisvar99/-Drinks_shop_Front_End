import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import OrderCompleted from '../OrderCompleted'


export default function UserCart() {
const [userCartDetail, setUserCartDetail] = useState([])
const [totalAmount, setTotalAmount] = useState(0)
const [cart_id, setCart_id] = useState(0)

const params = useParams();

useEffect(() => {
  getUserCart();
}, [cart_id])



const getUserCart = () => {
    axios.get('http://localhost:4000/getUserCart/'+params.username).then((res) => {
        //console.log('userCart -> ' , res.data);
        //console.log("userCartDetail: " + JSON.stringify(userCartDetail));
        if(res.data.length>0){
          setUserCartDetail(res.data);
          setCart_id(res.data[0].cart_id)

          console.log("cart_id: " + cart_id);
          var aux=0;
          res.data.map(item =>(
             aux += parseInt(item.price)*parseInt(item.quantity)
          ))
          
          setTotalAmount(aux);
        }
    }).catch((err) => {
        console.log('error -> ' + err);
    })
}

const deleteItemFromCart = (product_id, cart_id) => {
  axios.delete('http://localhost:4000/deleteCartItem/'+ product_id + '/' + cart_id).then((res) => {

    /* const search = item => item.product_id === product_id;
    //condicion pa eliminar

    console.log("Index: " + userCartDetail.findIndex(search)); 
    //aca tengo el indice que quiero eliminar */
    
    //userCartDetail.filter((_,index) => index === search)
    const newArray = userCartDetail.filter(item => item.product_id !== product_id)
    setUserCartDetail(newArray)
    //aca se supome que muestro todos menos el eliminado

    //console.log("carrito: " + JSON.stringify(userCartDetail));

  }).catch((err)=>{
    alert(err.message)
  })
}


  return (
    <>
      <h4>My Cart</h4>
      <div className="main_div">
      <table className="cartTable">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
        <tbody>
      { userCartDetail.map((item) =>(

          <tr key={item.product_id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}$</td>
            <td><button onClick={()=> {deleteItemFromCart(item.product_id, item.cart_id)}}>Delete Item</button></td>
          </tr>
      ))
    }
        </tbody>
      </table>
    </div>
    <p>Total Amount: {totalAmount}$</p>
      <Link to={`/orderCompleted/${localStorage.getItem('username')}/${cart_id}/${totalAmount}`}>Complete Order</Link>

    </>
  )
}

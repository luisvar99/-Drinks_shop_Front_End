import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UserCart() {
const [userCartDetail, setUserCartDetail] = useState([])

const params = useParams();

useEffect(() => {
  getUserCart();
}, [])

const getUserCart = () => {
    axios.get('http://localhost:4000/getUserCart/'+params.username).then((res) => {
        console.log('userCart -> ' , res.data);
        setUserCartDetail(res.data);
    }).catch((err) => {
        console.log('error -> ' + err);
    })
}

  return (
    <>
      <h4>My Cart</h4>
      { userCartDetail.map((item) =>(
        <>
        <ul key={item.product_id}>
          <li>Name: {item.name}</li>
          <li>Quantity: {item.quantity}</li>
          <li>Price: {item.price}$</li>
        </ul>
        </>

      ))
      }
    </>
  )
}

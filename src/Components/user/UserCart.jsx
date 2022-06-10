import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import OrderCompleted from '../OrderCompleted'
import './UserCartStyles.css'


export default function UserCart() {
const [userCartDetail, setUserCartDetail] = useState([])
const [totalAmount, setTotalAmount] = useState(0)
const [cart_id, setCart_id] = useState(0)

const [select_address, setSelect_address] = useState("")
const [select_payment_method, setSelect_payment_method] = useState("")

const [zelleDetails, setZelleDetails] = useState(false)
const [zelleFile, setZelleFile] = useState("")

const [pagoMovil, setPagoMovil] = useState(false)


const params = useParams();

useEffect(() => {
  getUserCart();
}, [cart_id])

const showZelle = () => {
  setPagoMovil(false)
  setZelleDetails(true)
}
const showPagoMovil = () => {
  setZelleDetails(false)
  setPagoMovil(true)
}
const showPaymentDetails = (e) => {
  if(e.target.value==="Zelle"){
    showZelle()
  }else if (e.target.value==="Pago Movil"){
    showPagoMovil()
  }
}


const getUserCart = () => {
    axios.get('http://localhost:4000/getUserCart/'+params.username).then((res) => {
        //console.log('userCart -> ' , res.data);
        console.log("userCartDetail: " + JSON.stringify(userCartDetail));
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
      {/* <h4>My Cart</h4>
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
      <Link to={`/orderCompleted/${localStorage.getItem('username')}/${cart_id}/${totalAmount}`}>Complete Order</Link> */}

      <div className="background_div">

        <div className="main_uc_container">
          <div className="left_side">
              <h2 className="mycart_title">My Cart</h2>
              { userCartDetail.map((item) =>(

                  <div key={item.product_id} className="product_line">
                    <div className="img_div">
                      <img src={item.img} alt="Not Found" />
                    </div>
                    <p className="product_name">{item.name}</p>
                    <p className="product_quantity">{item.quantity}</p>
                    <p className="product_price">{item.price}$</p>
                    <button onClick={()=> {deleteItemFromCart(item.product_id, item.cart_id)}}>X</button>
                  </div>
                  ))
                  }
          </div>
          <div className="right_side">
              <h2 className="summary_title">Summary</h2>
              <div className="summary_details">
                <p style={{marginBottom:"1rem"}}>Items: {userCartDetail.length}</p>
                <p style={{marginBottom:"1rem"}}>Shipping Address</p>

                <select value={select_address} style={{width:"80%",height:"30px", marginBottom:"1rem"}} 
                onChange={(e)=>{setSelect_address(e.target.value)}} name="select_address">
                   <option value="" selected disabled hidden>Choose address</option>
                  <option value="Casa">Casa</option>
                  <option value="Casa Amigo 1">Casa Amigo 1</option>
                  <option value="Casa Amigo 2">Casa Amigo 2</option>
                </select>

                <p style={{marginBottom:"1rem"}}>Payment Method</p>

                <select value={select_payment_method} style={{width:"80%",height:"30px", marginBottom:"1rem"}} 
                onChange={(e)=>{setSelect_payment_method(e.target.value);showPaymentDetails(e)}} name="select_payment_method">
                   <option value="" selected disabled hidden>Choose payment method</option>
                  <option value="Zelle">Zelle</option>
                  <option value="Pago Movil">Pago Movil</option>
                  <option value="Cash">Cash</option>
                </select>
                {
                  zelleDetails && 
                  <>
                  <p>Zelle</p>
                  <p>Email: luisvar2703@gmail.com</p>
                  <input type="file" />
                  </>
                }
                {
                  pagoMovil && 
                  <>
                  <p>Pago Movil</p>
                  <p>Bank: Mercantil</p>
                  <p>CI: 26489495</p>
                  <p>Phone: 04242663931</p>
                  <input type="file" />
                  </>
                }
                  <p className="total_amount"><b>Total Amount: {totalAmount}$</b></p>
                <div className="amount_place">
                <Link className="complete_order" to={`/orderCompleted/${localStorage.getItem('username')}/${cart_id}/${totalAmount}`}>Complete Order</Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

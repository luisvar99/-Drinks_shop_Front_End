import React, { useContext } from 'react'
import './NavbarStyles.css'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'



    


export default function Navbar() {

    const {client} = useContext(UserContext);

    return (
        <div className="navbar_main_container">

            <ul className="nav_bar_ul">
                    
                    <li>Welcome, {client.name}</li>
                    <li><Link to={`userCart/${client.username}`}><FontAwesomeIcon className="cart_icon" icon={faCartShopping}/></Link></li>
            </ul>
            
        </div>
    )
}

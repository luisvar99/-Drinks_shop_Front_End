import React, { useContext } from 'react'
import './NavbarStyles.css'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext'



export default function Navbar() {

    const {id, first_name, last_name} = useContext(UserContext);

    return (
        <div className="navbar_main_container">

                <ul className="nav_bar_ul">
                    
                    <li>Welcome, {first_name}</li>
                <li></li>
            </ul>
            
        </div>
    )
}

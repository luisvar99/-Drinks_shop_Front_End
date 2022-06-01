import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Dashboard() {

    const [allDrinks, setAllDrinks] = useState([])

    

    useEffect(() => {   
        getAllDrinks()
    },[])  

    const getAllDrinks = () => {
        axios.get('http://localhost:4000/drinks').then((res) => {
            console.log(res.data);
            setAllDrinks(res.data);
        })
    }
    
    return (
        <div className="dashboard_main_container">
            <h1 className="dashboard_title">Admin Dashboard</h1>
            <Link to='/admin/addDrink' className="dashboard_add_drink_btn">Add new drink</Link>
            <table>
                <tr>
                    <th className="id_row">ID</th>
                    <th className="name_row">Name</th>
                    <th className="price_row">Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                { allDrinks.map((drink)=>(
                    <tr>
                        <td>{drink.id}</td>
                        <td>{drink.name}</td>
                        <td>{drink.price}</td>
                        <td className="edit_row_btn"><Link to="/" className="edit_btn">Edit</Link></td>
                        <td className="delete_row_btn"><Link to="/" className="delete_btn">Delete</Link></td>
                    </tr>
                ))

                }
            </table>
        </div>
    )
}

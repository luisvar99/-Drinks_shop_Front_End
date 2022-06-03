import React, {useState, useEffect, useContext} from 'react'
import './HomeStyles.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from './context/UserContext'



export default function Home() {

    const [categories, setCategories] = useState([]);

    //const {client_id} = useContext(UserContext);

    
    useEffect(() => {
        getCategories();
        console.log('client Id en Home: ' + localStorage.getItem('client_id'))
        //console.log(client_id);
    }, [])

    const getCategories = () => {
        axios.get('https://drinkstienda.herokuapp.com/categories').then((res)=>{
            console.log(res.data);
            setCategories(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='home_main_container'>
            <h1 className='home_title'>Find any liquor you want</h1>
            <div className='home_second_container'>
                <div className='category_card_conatiner'>
                    {  categories.map((category)=>(
                        
                        <Link to={`drinks/${category.name}`} className='link_' key={category.id}>
                            <div className='category_card'>
                                <p className='category_title'>{category.name}</p>
                                <div className='img_container'>
                                    <img src="imgs/1796_sta_teresa_1.png" alt="image"  className='category_img'/>
                                </div>
                            </div>
                        </Link>


                    ))}
                    
                </div>
            </div>

        </div>
    )
}

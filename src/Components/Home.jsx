import React, {useState, useEffect, useContext} from 'react'
import './HomeStyles.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from './context/UserContext'



export default function Home() {

    const [categories, setCategories] = useState([]);

    const {client} = useContext(UserContext);

    
    useEffect(() => {
        getCategories();
        //console.log('client Id en Home: ' + localStorage.getItem('client_id'))
        console.log('Context desde Home: '+ JSON.stringify(client));
    }, [])

    const getCategories = () => {
        axios.get('http://localhost:4000/categories').then((res)=>{
            console.log(res.data);
            setCategories(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='home_main_container'>
            {/* <h1 className='home_title'>Find any liquor you want</h1> */}
            <div className='home_second_container'>
                <div className='category_card_conatiner'>
                    {  categories.map((category)=>(
                        
                        <Link to={`drinks/${category.name}`} className='link_' key={category.id}>
                            <div className='category_card'>
                                <p className='category_title'>{category.name}</p>
                                <div className='img_container'>
                                    <img src="https://cnnespanol.cnn.com/wp-content/uploads/2019/12/s_64a163f16ecbb099e52f2f8271f73cbbfcfc9034be4d646f7375e4db1ca6f3d7_1573501883482_ap_19001106049831-1.jpg?quality=100&strip=info&w=320&h=240&crop=1" alt="image"  className='category_img'/>
                                </div>
                            </div>
                        </Link>


                    ))}
                    
                </div>
            </div>

        </div>
    )
}

import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import './DrinksByCategoryStyles.css'


export default function DrinksByCategory() {
    const params = useParams();

    const [drinks, setDrinks] = useState([])
    const [drinkName, setDrinkName] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [drinksByName, setDrinksByName] = useState([])

    useEffect(() => {
        getDrinksByCategory();
    }, [])

    useEffect(() => {
        if(!drinkName || !drinkName.trim()){
            setShowAll(true)
        }else{
            console.log("drinkName -> " + drinkName);
            getDrinksByName();
        }
    }, [drinkName])

    const getDrinksByCategory = () => {
        axios.get('http://localhost:4000/drinksByCategory/'+params.category).then((res) => {
            console.log(res.data);
            setDrinks(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getDrinksByName = () => {
        axios.get('http://localhost:4000/drinksByName/'+drinkName.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))).then((res) => {
            setDrinksByName(res.data)
            setShowAll(false)
            //console.log(res.data);
        }).catch((err) => {
            console.log('error -> ' + err);
        })
    }


    return (
        <div className='drinkByCategory_main_container'>
            
            <h1 className='drinkByCategory_title'>{params.name}</h1>

            <form onSubmit={getDrinksByName}>
                <input className='input_search_drinks_by_name' type="text" 
                    onChange={(e) => setDrinkName(e.target.value)} 
                    placeholder='Search By Name'/>
            </form>
            <div className='drinkByCategory_second_container'>
                <div className='drinkByCategory_card_conatiner'>
                    {showAll && 
                            
                        drinks.map((drink)=>(
                            <>
                            <div className='drinkByCategory_card'>
                            <Link to={`/drinks/${drink.product_id}/details`} className='link_' key={drink.product_id}>
                                <div className='img_container'>
                                    <img src={drink.img_URL} alt={drink.name} className='category_img'/>
                                </div>
                                <p className='drinkByCategory_title'>{drink.name}</p>
                            </Link>
                            </div>
                        </>
                        
                    ))}

                    {!showAll && 
                            
                        drinksByName.map((drink)=>(
                        
                        <Link to={`/drinks/${drink.id}/details`} className='link_' key={drink.id}>
                            <div className='drinkByCategory_card'>
                                <p className='drinkByCategory_title'>{drink.name}</p>
                                <div className='img_container'>
                                    <img src={drink.imgUrl} alt="img"  className='category_img'/>
                                </div>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </div>

        </div>
    )
}

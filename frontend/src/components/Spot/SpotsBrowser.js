import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import SpotDetail from './SpotDetail.js'
import { useHistory } from 'react-router-dom';
import {getSpots} from '../../store/spot.js'

function SpotBrowser () {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector(state => {
        const allSpots = state.spots
        return Object.values(allSpots)
    })
    console.log("spotsssss", spots)

    // need to use .then as need to wait for the images to come back.
    useEffect(()=> {
        dispatch(getSpots())
            .then(()=>setIsloaded(true))
    }, [dispatch])

   
    return (
        isLoaded && <div>
            <h2>all spots</h2>
            {spots.map((spot)=> {
                return (
                    <div key={spot.id} className='list_container_at_list_page'>
                        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                            <img className='images_at_list_page' src={spot.previewImage}/>
                            <div>{spot.city} {spot.state}</div>
                            <div>{spot.price} night</div>
                            <div>{spot.avgStatRating} how to render rating</div>
                        </NavLink>
                    </div>
                )
            })

            } 
            
           

        </div>
    )

}

export default SpotBrowser
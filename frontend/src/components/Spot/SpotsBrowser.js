import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import SpotDetail from './SpotDetail.js'
import { useHistory } from 'react-router-dom';
import {getSpots} from '../../store/spot.js'
import AvgRating from '../AvgRating.js';
import './Spot.css'

function SpotBrowser () {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector(state => {
        const allSpots = state.spots
        return Object.values(allSpots)
    })
  

    // need to use .then as need to wait for the images to come back.
    useEffect(()=> {
        dispatch(getSpots())
            .then(()=>setIsloaded(true))
    }, [dispatch])

    const avgReviewCal = (reviewArr) => {
        let total = 0 
        reviewArr.forEach(reviewObj => {
            total+= reviewObj.stars
        });
        let avg = total/reviewArr.length
        return avg
    }


   
    return (
        isLoaded && 
            
            <div className='list_container_at_list_page'>

                {spots.map((spot)=> {
                    let review = "New";
                    if (spot.Reviews && spot.Reviews.length > 0) {
                        review = avgReviewCal(spot.Reviews).toFixed(2).toString()
                    }
                    return (
                        <div key={spot.id} className='spot_list_item' >
                            <div key={spot.id} className="spot_card">
                                <NavLink to={`/spots/${spot.id}`}>
                                    <img className='images_at_list_page' src={spot.previewImage}/>
                                </NavLink>
                                    <div className='spot_browser_details_container'>
                                        {/* <div className='spot_browser_details'> */}
                                            <div className='spot_browser_city_state'>{spot.city}，{spot.state}</div>
                                            <div className='spot_browser_review'>
                                                <i className="fa-solid fa-star"></i>
                                                <div className='review_at_homepage'>{review}</div>
                                            </div>
                                        
                                        {/* </div> */}
                                    </div>
                                            
                                    <div className='price_per_night_container'>
                                        <div className='price_per_night'>${spot.price} </div>
                                        <div className='night_char'>night</div>
                                    </div>
                            </div>
                        </div>
                    )
                })} 
            </div>
    )

}

export default SpotBrowser
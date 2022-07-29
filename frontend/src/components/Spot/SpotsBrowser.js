import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import SpotDetail from './SpotDetail.js'
import { useHistory } from 'react-router-dom';
import {getSpots} from '../../store/spot.js'
import AvgRating from '../AvgRating.js';

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

    const avgReviewCal = (reviewarr) => {
        let total = 0 
        reviewarr.forEach(reviewObj => {
            total+= reviewObj.stars
        });
        let avg = total/reviewarr.length
        return avg
    }
   
    return (
        isLoaded && <div>
            <div></div>
            <h2>all spots</h2>
            <div className='list_container_at_list_page'>

            {spots.map((spot)=> {
                return (
                    <div key={spot.id} className='spot_list_item' >
                        <div key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <img className='images_at_list_page' src={spot.previewImage}/>
                            </NavLink>
                                <div>
                                    <div>
                                        <div>{spot.city} {spot.state}</div>
                                        <div>{spot.avgStatRating}rating</div>
                                        <div>
                                            {
                                                avgReviewCal(spot.Reviews)
                                            }
                                        </div>
                                        <div>
                                            <AvgRating spotId={spot.id}/>
                                        </div>
                                    </div>
                                        <div>${spot.price} night</div>
                                </div>
                        </div>
                    </div>
                )
            })} 
        </div>
            
           

        </div>
    )

}

export default SpotBrowser
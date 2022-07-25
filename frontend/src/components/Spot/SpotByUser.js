import {useParams} from 'react-router-dom'
import './Spot.css'
import {getSpotByUser} from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function SpotDetailByUser () {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const user = useSelector((state)=> state.session.user)
    console.log("user in detail by user", user)
    const filteredSpots = Object.values(spots).filter(spot => spot.ownerId === user.id)
    useEffect(()=> {
        dispatch(getSpotByUser(filteredSpots))
        .then(()=> setIsLoaded(true))
    },[dispatch])
    console.log("filtered spots in detail ", filteredSpots)

    return (
        isLoaded&&<div>
            <div>
                {
                    filteredSpots.map(spot => (
                        <div>
                            <span>{spot.avgStatRating}</span>
                            <span>{spot.numReviews}</span>
                            <span>{`${spot.city},${spot.state},${spot.country}`}</span>
                            <div>
                                <div className='spot_image_container'>
                                    <img className='spot_prevew_image' src={spot.previewImage}></img>
                                </div> 
                                <div>
                                place holder for images array
                                need to map through each
                                </div>
                            </div>
                            <div>
                                {spot.description}
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )


}

export default SpotDetailByUser
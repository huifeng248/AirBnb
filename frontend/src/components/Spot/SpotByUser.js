import {useParams} from 'react-router-dom'
import './Spot.css'
import {getSpotByUser} from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DeleteSpot} from '../../store/spot'
import { useHistory } from 'react-router-dom';
// import { Redirect } from "react-router-dom";
import SpotFormModal from '../SpotFormModal'

function SpotDetailByUser () {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const user = useSelector((state)=> state.session.user)
    const filteredSpots = Object.values(spots).filter(spot => spot?.ownerId === user?.id)
    useEffect(()=> {
        dispatch(getSpotByUser(filteredSpots))
        // .then(()=>) //optional chaining in line 18 where you key into user... might be an easy way to do it as well
        .then(()=> setIsLoaded(true))
    },[dispatch])

    if (!user) return history.push('/'); //this is a bug, it's not redirect to home page

    return (
        isLoaded&&<div>
            <div>
                {/* <button onClick={()=>history.push('/spots/new')}>Create New Listing</button> */}
                <SpotFormModal action='Create a List' />
                {
                    filteredSpots&&filteredSpots.map(spot => (
                        <div key={spot.id}>
                            <span>{spot.avgStatRating}</span>
                            <span>{spot.numReviews}</span>
                            <span>{`${spot.city},${spot.state},${spot.country}`}</span>
                            <div>
                                <div className='spot_image_container'>
                                    <img className='spot_preview_image_at_listing' src={spot.previewImage}></img>
                                </div> 
                                <div>
                                {/* <button>Edit</button> */}
                                <SpotFormModal action="Edit" spotId={spot.id}/>
                                <button onClick={()=> dispatch(DeleteSpot(spot.id))}>Delete</button>
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
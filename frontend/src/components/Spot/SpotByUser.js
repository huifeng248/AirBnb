import { useParams } from 'react-router-dom'
import './Spot.css'
import { getSpotByUser } from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DeleteSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
// import { Redirect } from "react-router-dom";
import SpotFormModal from '../SpotFormModal'

function SpotDetailByUser() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const user = useSelector((state) => state.session.user)
    const filteredSpots = Object.values(spots).filter(spot => spot?.ownerId === user?.id)
    // console.log("filtered spots", filteredSpots)
    useEffect(() => {
        dispatch(getSpotByUser())
            // .then(()=>) //optional chaining in line 18 where you key into user... might be an easy way to do it as well
            .then(() => setIsLoaded(true))
    }, [dispatch])

    // if (!user) return history.push('/'); //adding this will cause warming

    return (
        isLoaded && <div className='managing_bookings_container'>
            <div className='booking_title'>Manage your listings</div>
            <div className='booking_sub_title'>All listings</div>

            <div className='all_booking_wrapper'>
                <SpotFormModal action='Create a List' />
                {
                    filteredSpots && filteredSpots.map(spot => (
                        <div key={spot.id} className="one_spot_container">
                            <div className='spot_image_container'>
                                <img className='spot_preview_image_at_listing' src={spot.previewImage}></img>
                            </div>
                            <div className='spot_detail_container'>
                                <div>Name: {spot.name}</div>
                                <div>Address: {spot.address},{spot.city},{spot.state},{spot.country}</div>
                                <div>
                                    Description: {spot.description}
                                </div>
                                <div>
                                    Price: ${spot.price}
                                </div>
                            </div>
                            <div>
                                <SpotFormModal action="Edit" spotId={spot.id} />
                                <button className="create_a_spot_button" onClick={() => dispatch(DeleteSpot(spot.id))}>Delete</button>

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )


}

export default SpotDetailByUser
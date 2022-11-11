import { useParams } from 'react-router-dom'
import './Spot.css'
import { getSpotByUser } from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DeleteSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
import {getImages} from '../../store/image'
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
            .then(() => {
                console.log("^^^^^^^^^^", spots)
    // const filteredSpots = Object.values(spots).filter(spot => spot?.ownerId === user?.id)

                // filteredSpots.forEach(spot=> dispatch(getImages(spot.id)))
                setIsLoaded(true)})
    }, [dispatch])

    // if (!user) return history.push('/'); //adding this will cause warming

    return (
        isLoaded && <div className='managing_bookings_container'>
            <div className='booking_title'>Manage your listings</div>
            <div className='booking_sub_title'>All listings</div>

            <div className='all_booking_wrapper'>
                <div className='create_button_wrapper_div'>
                <SpotFormModal action='Create a List' />
                </div>
                {
                    filteredSpots && filteredSpots.map(spot => (
                        <div key={spot.id} className="one_spot_container">

                            <div className='spot_image_container'>
                                <img className='spot_preview_image_at_listing' src={spot.previewImage}></img>
                            </div>

                            <div className='spot_left_container'>

                                <div className='spot_middle_container'>  
                                    <div className='spot_name_title'>{spot.name}</div>
                                    <div>{spot.city}, {spot.state}, {spot.country}</div>
                                    {/* <div> Description: {spot.description} </div> */}
                                    <div> Price: ${spot.price} </div>


                                    <div className='small_detail_images_container'> 
                                        {console.log("!!!!!!!!!", spot.Images[0].url)} 
                                        <img
                                            className='spot_detail_small_image'
                                            src={spot.Images[0].url} alt='spot_image'>
                                        </img>
                                        <img
                                            className='spot_detail_small_image'
                                            src="https://a0.muscache.com/im/pictures/dc09ee21-27e9-4dcd-9b59-7ba7ade0563f.jpg" alt='spot_image'>
                                        </img>
                                        <img
                                            className='spot_detail_small_image'
                                            src="https://a0.muscache.com/im/pictures/dc09ee21-27e9-4dcd-9b59-7ba7ade0563f.jpg" alt='spot_image'>
                                        </img>
                                        <img
                                            className='spot_detail_small_image'
                                            src="https://a0.muscache.com/im/pictures/dc09ee21-27e9-4dcd-9b59-7ba7ade0563f.jpg" alt='spot_image'>
                                        </img>
                                    </div>

                                </div>


                                <div className='listing_buttong_container'>
                                    <SpotFormModal action="Edit" spotId={spot.id} />
                                    <button className="reserve_button" onClick={() => dispatch(DeleteSpot(spot.id))}>Delete</button>
                                    <button className='reserve_button'> Add Image</button>

                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )


}

export default SpotDetailByUser
import { useParams } from 'react-router-dom'
import './Spot.css'
import { getSpotByUser } from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { DeleteSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
import { getImages, CreateImage, DeleteImage } from '../../store/image'
// import { Redirect } from "react-router-dom";
import SpotFormModal from '../SpotFormModal'
import ImageModal from '../AddImageModal/index'

function SpotDetailByUser() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const user = useSelector((state) => state.session.user)
    const images = useSelector(state => state.images)
    console.log("imagessssss", images)
    const filteredSpots = Object.values(spots).filter(spot => spot?.ownerId === user?.id)
    function filteredImages(Id, images) {
        return Object.values(images).filter(image => image?.spotId === Id)
    }
    const [image, setImage] = useState(null);
    // console.log("filtered spots", filteredSpots)
    useEffect(() => {
        dispatch(getSpotByUser())
            .then(() => setIsLoaded(true))
        dispatch(getImages())
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch, images.length])

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(file)
    //         dispatch(CreateImage())
    //     };
    // };

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


                                    {filteredImages(spot.id, images).length && <div className='small_detail_images_container'>
                                        {console.log("!!!!!!!!!", filteredImages)}

                                        {filteredImages(spot.id, images).map((image, index) =>
                                            <div className='edit_image_container'>
                                                <img
                                                    className='spot_detail_small_image'
                                                    src={image.url} alt='spot_image'>
                                                </img>
                                                <i
                                                    onClick={() => dispatch(DeleteImage(image.id))}
                                                    className="fa-regular fa-circle-xmark"></i>
                                            </div>



                                        )}

                                    </div>
                                    }

                                </div>


                                <div className='listing_buttong_container'>
                                    <SpotFormModal action="Edit" spotId={spot.id} />
                                    <button className="reserve_button" onClick={() => dispatch(DeleteSpot(spot.id))}>Delete</button>
                                    <ImageModal spotId={spot.id} />

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
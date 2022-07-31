import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Spot.css'
import {getOneSpot, DeleteSpot} from '../../store/spot'
import { useHistory } from 'react-router-dom';
import ReviewBySpot from '../Review/ReviewBySpot'
import ReviewFormModal from '../ReviewFormModal'

function SpotDetail (){
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const reviews = useSelector((state) => state.reviews)
    const spot = spots[+id]
    const user = useSelector(state=> state.session.user)

    useEffect(()=> {
        dispatch(getOneSpot(id))
            .then(()=>setIsloaded(true))
    },[dispatch, id, reviews])

    // let reviewRating = "New"
    // if (spot.avgStatRating) {
    //     reviewRating = (spot.avgStatRating).toFix(2).toString()
    // }

    return (
        isLoaded&&<div>
            <div className='spot_detail_page_container'>
                <div key={`spot-details- ${spot.id}`}>
                    <h1 className='spot_detail_title'>{spot.name}</h1>
                    <div className='spot_reviews spot_reviews_item'>
                        <i className="fa-solid fa-star spot_reviews_item"></i>
                        <div>{` ${spot.avgStatRating}`}</div>
                        {/* <div>{reviewRating}</div> */}
                        <div className='numbers_review spot_reviews_item'>{spot.numReviews}</div>
                        <div>reviews</div>
                        <div className='spot_reviews_item'>{`${spot.city},${spot.state},${spot.country}`}</div>
                    </div>

                        <div className='spot_image_container'>
                            <div className='spot_prevew_image_container'>
                                <img className='spot_prevew_image' src={spot.previewImage}></img>
                            </div> 
                            <div className='spot_small_image_container'>
                                {
                                    spot.images.length&&
                                    spot.images.map( image => (
                                        <div key={image.url}>
                                            <img className='spot_small_image' src={image.url}></img>    
                                        </div>
                                        )
                                    )

                                }
                            </div>
                        </div>

                        <div className='spot_description'>
                        Description: {spot.description}
                        </div>
                    </div>

                    <div>
                        {user&&
                        <ReviewFormModal action='Add Review'/>
                    }
                    </div>
                    <div>
                        <div>
                        <ReviewBySpot />
                    </div>
                </div>
            </div>
        </div>
    )

}


export default SpotDetail
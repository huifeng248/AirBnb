import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Spot.css'
import {getOneSpot, DeleteSpot} from '../../store/spot'
import { useHistory } from 'react-router-dom';

function SpotDetail (){
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const spot = spots[+id]
    console.log("detail page spot id!!!!!",id)

    useEffect(()=> {
        dispatch(getOneSpot(id))
            .then(()=>setIsloaded(true))
    },[dispatch, id])

    console.log("spots deatils", spot)

    return (
        isLoaded&&<div>
            <div key={`spot-details- ${spot.id}`}>
                <h1>{spot.name}</h1>
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
                <button onClick={()=> {
                    //my delete is working for data base but not for update the new state
                    dispatch(DeleteSpot(spot.id))
                        .then(()=>history.push('/'))}}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    )

}


export default SpotDetail
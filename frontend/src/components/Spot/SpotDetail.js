import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Spot.css'
import {getOneSpot} from '../../store/spot'

function SpotDetail (){
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsloaded] = useState(false)
    const spots = useSelector((state) => state.spots)
    const spot = spots[spotId]
    console.log("!!!!!",spot)

    useEffect(()=> {
        dispatch(getOneSpot(spot))
            .then(()=>setIsloaded(true))
    },[dispatch, spotId])

    console.log("spots deatils", spot)

    return (
        isLoaded&&<div>
            <div key={`spot-details- ${spot.id}`}>
                {spot.id}
            </div>
        </div>
    )

}


export default SpotDetail
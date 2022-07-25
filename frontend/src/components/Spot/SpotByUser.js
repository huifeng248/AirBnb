import {useParams} from 'react-router-dom'
import './Spot.css'
import {getSpotByUser} from '../../store/spot'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

function SpotDetailByUser () {
 
    console.log("current user Params", useParams())
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector((state) => state.spots)


    return (
        <div>
            spot by user
        </div>
    )


}

export default SpotDetailByUser
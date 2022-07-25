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
    console.log("spot in detail ", spots)
    useEffect(()=> {
        dispatch(getSpotByUser(spots, user))
            .then(()=> setIsLoaded(true))
    },[dispatch])

    return (
        isLoaded&&<div>
            spot by user
        </div>
    )


}

export default SpotDetailByUser
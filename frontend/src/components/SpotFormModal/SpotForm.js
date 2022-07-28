import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {CreateSpot, UpdateSpot} from '../../store/spot'



const SpotForm = ({action, spotId, onClose}) => {
    console.log("!!!!!", spotId)
    const spots = useSelector(state => state.spots)
    const spot = spots[spotId]
    // console.log("spots!!", spot)
    const dispatch = useDispatch();
    const history = useHistory()
    const [address, setAddress] = useState(spot? spot.address : "")
    const [city, setCity] = useState(spot? spot.city : "")
    const [state, setState] = useState(spot? spot.state : "")
    const [country, setCountry] = useState(spot? spot.country : "")
    const [lat, setLat] = useState(spot? spot.lat : "")
    const [lng, setLng] = useState(spot? spot.lng : "")
    const [name, setName] = useState(spot? spot.name : "")
    const [description, setDescription] = useState(spot? spot.description : "")
    const [price, setPrice] = useState(spot? spot.price: "")
    const [isLoaded, setIsloaded] = useState(false)
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            id:spotId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }
        // console.log("action", action)
        
        if (action ==='Edit') {

            dispatch(UpdateSpot(payload))
                .then(()=>onClose()) //just need to close it 
                // .then(()=> history.push('/spots/current')) //it does not work cause it stay in the original page
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors (data.errors)
                })
        } else if (action = 'Create a List'){

            dispatch(CreateSpot(payload))
                .then(()=>onClose())
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors (data.errors)
                })
        }
        
    }


    return (
        <section>
            <h2>{action}</h2>
            <form
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, index)=>(
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Address
                        <input 
                        value = {address}
                        onChange={(e)=>setAddress(e.target.value)}
                        placeholder='Address'
                        // required
                        type='text' 
                        />
                    </label>
                    <label>
                        City
                        <input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder='City'
                        // required
                        type='text'
                        />
                    </label>
                    <label>
                        State
                        <input
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder='State'
                        // required
                        type='text'
                        />
                    </label>
                    <label>
                        Country
                        <input
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder='Country'
                        // required
                        type='text'
                        />
                    </label>
                    <label>
                        Latitude
                        <input
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder='Latitude'
                        // required
                        type='number'
                        min='-90'
                        max='90'
                        step='0.000001'
                        />
                    </label>
                    <label>
                        Longitude
                        <input
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder='Longitude'
                        // required
                        type='number'
                        min='-180'
                        step='0.000001'
                        max='180'
                        />
                    </label>
                    <label>
                        Name
                        <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Name'
                        // required
                        type='text'
                        />
                    </label>
                    <label>
                        Description
                        <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Description'
                        // required
                        type='text'
                        />
                    </label>
                    <label>
                        Price
                        <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder='Price'
                        // required
                        type='number'
                        />
                    </label>
                <button
                    type="submit"
                >
                {action}
              </button>
            </form>
        </section>
    )

}


export default SpotForm
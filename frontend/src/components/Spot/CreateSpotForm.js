import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {CreateSpot} from '../../store/spot'


const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [isLoaded, setIsloaded] = useState(false)
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
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
        
        dispatch(CreateSpot(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors (data.errors)
                else history.push(`/spots/${data.id}`)  //this redirect is not working
            })

        
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault()

    //     const payload = {
    //         address,
    //         city,
    //         state,
    //         country,
    //         lat,
    //         lng,
    //         name,
    //         description,
    //         price,
    //     }
    //     let newSpot
    //     await dispatch(CreateSpot(payload))
    //         .then(()=>{history.push(`/spots/${newSpot.id}`)})
    //         // if (newSpot.id) {
    //         //     history.push(`/spots/${newSpot.id}`)
    //         // }
    
    // }

    return (
        <section>
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
                        type='text'
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
                Add Spot
              </button>
            </form>
        </section>
    )

}


export default CreateSpotForm
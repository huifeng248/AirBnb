import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreateSpot, UpdateSpot } from '../../store/spot'
import './SpotForm.css'



const SpotForm = ({ action, spotId, onClose }) => {
    const spots = useSelector(state => state.spots)
    const spot = spots[spotId]
    const dispatch = useDispatch();
    const history = useHistory()
    const [address, setAddress] = useState(spot ? spot.address : "")
    const [city, setCity] = useState(spot ? spot.city : "")
    const [state, setState] = useState(spot ? spot.state : "")
    const [country, setCountry] = useState(spot ? spot.country : "")
    const [lat, setLat] = useState(spot ? spot.lat : "")
    const [lng, setLng] = useState(spot ? spot.lng : "")
    const [name, setName] = useState(spot ? spot.name : "")
    const [description, setDescription] = useState(spot ? spot.description : "")
    const [price, setPrice] = useState(spot ? spot.price : "")
    const [previewImage, setPreviewImage] = useState(spot ? spot.previewImage : "")
    const [isLoaded, setIsloaded] = useState(false)
    const [errors, setErrors] = useState([]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            id: spotId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }


        if (action === 'Edit') {

            dispatch(UpdateSpot(payload))
                .then(() => onClose()) //just need to close it 
                // .then(()=> history.push('/spots/current')) //it does not work cause it stay in the original page
                .catch(async (res) => {
                    const data = await res.json()

                    
                    if (data && data.errors) setErrors(data.errors)
                })
        } else if (action = 'Create a List') {

            dispatch(CreateSpot(payload))
                .then(() => onClose())
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                })
        }

    }


    return (
        <div className='spot_Modal_Booking_form'>
            {/* <h3 className='create_form_title'>{action}</h3> */}

            <div className='edit_title_container'>
                <div className='edit_title'>{action}</div>
                <i
                    onClick={() => onClose()}
                    className="fa-solid fa-x"></i>
            </div>

            <div>
                <ul className='error_message'>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>

            <form className='spot_edit_form_container'
                onSubmit={handleSubmit}>
                <div className='Spot_form_container'>

                    <div className='spot_details'>
                        <label>
                            Address
                        </label>
                        <input className='spot_details_input'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address'
                            maxLength="255"
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            City
                        </label>
                        <input className='spot_details_input'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='City'
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>

                        <label>
                            State
                        </label>
                        <input className='spot_details_input'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder='State'
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Country
                        </label>
                        <input className='spot_details_input'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder='Country'
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Latitude
                        </label>
                        <input className='spot_details_input'
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            placeholder='Latitude'
                            // required
                            type='number'
                            min='-90'
                            max='90'
                            step='0.000001'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Longitude
                        </label>
                        <input className='spot_details_input'
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            placeholder='Longitude'
                            // required
                            type='number'
                            min='-180'
                            step='0.000001'
                            max='180'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Name
                        </label>
                        <input className='spot_details_input'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='Name'
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Description
                        </label>
                        <input className='spot_details_input'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder='Description'
                            maxLength="255"
                            // required
                            type='text'
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Price
                        </label>
                        <input className='spot_details_input'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder='Price'
                            // required
                            type='number'
                            min="1"
                        />
                    </div>
                    <div className='spot_details'>
                        <label>
                            Preview Image
                        </label>
                        {/* <input className='spot_details_input'
                            value={previewImage}
                            onChange={e => setPreviewImage(e.target.value)}
                            placeholder='Preview image url'
                            // required
                            type='url'
                        /> */}

                        <input className='edit_input_field'
                            type='file'
                            required
                            onChange={(e) => { updateFile(e) }}
                        />
                    </div>
                    <div className='spot_details'>

                        <button className='submit_create_button'
                            type="submit"
                        >
                            {action}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}


export default SpotForm
import { csrfFetch } from './csrf';

const LOAD_Spots = 'spots/LOAD'
const GET_One_Spot = 'spots/GET_DETAILS'
const GET_Spot_User = 'spots_current_user/GET'
const UPDATE_SPOT = 'spots/UPDATE'
const CREATE_SPOT = 'spots/CREATE'
const DELETE_SPOT = 'spots/DELETE'

const loadSpots = (list) =>({
    type: LOAD_Spots,
    list
})

const getSpotById = (spot) => ({
    type: GET_One_Spot,
    spot
})

const getSpotByCurrentUser = (spots) => ({
    type: GET_Spot_User,
    spots
})

const updateSpotAction = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const deleteSpotAction = (id) => ({
    type: DELETE_SPOT,
    id
})
//delete spot
export const DeleteSpot = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(deleteSpotAction(id))
        return spot
    }
}

//update spot
export const UpdateSpot = (spot) => async(dispatch) => {

    const {address, city, state, country, lat, lng, name, description, price, previewImage } = spot
    const formData = new FormData();
    formData.append("address", address)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("country", country)
    formData.append("lat", lat)
    formData.append("lng", lng)
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append('previewImage', previewImage);

    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: {
            // 'Content-Type': 'application/json'
            "Content-Type": "multipart/form-data",

        },
        // body: JSON.stringify(spot)
        body: formData

    })
    
    if (response.ok) {
        const spot = await response.json()
        dispatch(updateSpotAction(spot))
        return spot
    }

}

//create spot
export const CreateSpot = (spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage } = spot
    const formData = new FormData();
    formData.append("address", address)

    formData.append("city", city)
    formData.append("state", state)
    formData.append("country", country)
    formData.append("lat", lat)
    formData.append("lng", lng)
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append('previewImage', previewImage);




    const response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            // 'Content-Type': 'application/json'
            "Content-Type": "multipart/form-data",
        },
        // body: JSON.stringify(spot)
        body: formData
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(createSpotAction(spot))
    }

}



// thunk action to get spots
// fetches all spots as a list
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    
    if (response.ok) {
        const list = await response.json()
        dispatch(loadSpots(list))
    }
}

// get one spot
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpotById(spot))
    }
}

//get spot by current user
export const getSpotByUser = () => async dispatch =>  {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const spots = await response.json()
        dispatch(getSpotByCurrentUser(spots))
        return spots
    }
}

const initialState = {}
const spotReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOAD_Spots :{
            const allSpot = {};
            action.list.spots.forEach(spot => {
                allSpot[spot.id] = spot
            })
            const newState = {...state, ...allSpot}
            return newState;
        }
        case GET_One_Spot : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case GET_Spot_User : {
            let newState = {...state}
            if (!action.spots.length) {
                newState = {}
                return newState
            }
            action.spots.map(spot => {
                return newState[spot.id] = spot
            })
            return newState
        }
        case UPDATE_SPOT : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }
        case CREATE_SPOT : {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }  
        case DELETE_SPOT : {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }

        default: 
            return state

    }
}

export default spotReducer;
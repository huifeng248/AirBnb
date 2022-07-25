

const LOAD_Spots = 'spots/LOAD'
const GET_One_Spot = 'spots/GET_DETAILS'
const GET_Spot_User = 'spots_current_user/GET'

const loadSpots = (list) =>({
    type: LOAD_Spots,
    list
})

const getSpotById = (id) => ({
    type: GET_One_Spot,
    id
})

const getSpotByCurrentUser = () => ({
    type: GET_Spot_User,
    id
})



// thunk action to get spots
// fetches all spots as a list
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    
    if (response.ok) {
        const list = await response.json()
        dispatch(loadSpots(list))
    }
}

// get one spot
export const getOneSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpotById(spot))
    }
}

//get spot by current user
export const getSpotByUser = () => async dispatch =>  {
    const response = await fetch('/api/spots/current')
    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpotByUserId(spot))
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
            newState[action.id] = action.type
            return newState
        }
        case GET_Spot_User : {
            const newState = {}
            newState[action.id] = action.type
            return newState
        }
        default: 
            return state

    }
}

export default spotReducer;
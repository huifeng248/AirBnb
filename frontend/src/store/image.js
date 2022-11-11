import { csrfFetch } from './csrf';

const LOAD_Images = "LOAD_IMAGES"
const ADD_Images = "ADD_IMAGES"
const DELETE_Images = "DELETE_IMAGESS"

const Get_Image_Action = (images) => ({
    type: LOAD_Images,
    images

})

const Create_Image_Action = (image) => ({
    type: ADD_Images,
    image
})


const Delete_Image_Action = (id) => ({
    type: DELETE_Images,
    id
})

//get spot images

export const getImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/images')
    if (response.ok) {
        const images = await response.json()

        dispatch(Get_Image_Action(images))
    }
}

export const CreateImage = (newImage, spotId) => async (dispatch) => {
    console.log("Thunk~~~~~~", newImage, spotId)
    const { image } = newImage
    const formData = new FormData();
    formData.append('url', image);
    console.log("form data~~~~~", formData)
const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    body: formData
})
    console.log("come herer")
if (response.ok) {
    const data = await response.json()
    console.log("after fetch~~~~~~~", data)
    dispatch(Create_Image_Action(data))
    return response
}
}


export const DeleteImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const image = await response.json()
        console.log("thunk delete response", image)

        dispatch(Delete_Image_Action(id))
    }
}

const initialState = {}

const imageReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_Images: {
            action.images.forEach(image => {
                newState[image.id] = image
            });
            return newState
        }
        case ADD_Images: {
            newState = { ...state }
            newState[action.image.id] = action.image
            return newState
        }
        case DELETE_Images: {
            newState = { ...state }
            delete newState[action.id]
            return newState
        }

        default:
            return state
    }
}

export default imageReducer
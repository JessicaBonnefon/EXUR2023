import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
    posts: [],
};

const authToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const axiosAppConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': authToken,
  },
};

const GET_USER_POSTS = 'GET_USER_POSTS';

 export const getUserPosts = (id) => async (dispatch) => {
    const response = await axios.get(`${API_URL}/api/v1/users/${id}/posts`, axiosAppConfig)
    dispatch({
        type: GET_USER_POSTS,
        payload: response.data,
    });
};

const postReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_USER_POSTS:
            return {
                posts: [...action.payload]
            }
            default:
                return state;
    }
};

export default postReducer;
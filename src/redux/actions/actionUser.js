import { put, post, get } from '../../utilities/https';

export const createUser = (newUserDetails) => {
    const url = '/user/signup';
    return new Promise((resolve, reject) => {
        const promise = put(url, newUserDetails)
        promise.then((response) => {
            resolve({
                type: 'REGISTER_USER',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const activeUser = (activeUserDetails) => {
    const url = '/user/login';
    return new Promise((resolve, reject) => {
        const promise = post(url, activeUserDetails)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'LOGIN_USER',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const currentUser = (email) => {
    const url = `/user/getCurrentUser/${email}`;
    return new Promise((resolve, reject) => {
        const promise = get(url)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'CURRENT_USER',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}


export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT_USER',
        })
    }
}

export const getAllUser = () => {
    const url = '/user/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'GET_ALL_USER',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}
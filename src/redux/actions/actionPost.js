import { put, get, deleteMethod, post } from '../../utilities/https';

export const createPost = (newPost, email) => {
    const url = `/post/addPost/${email}`;
    return new Promise((resolve, reject) => {
        const promise = put(url, newPost)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'SAVE_POST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const updatePost = (updatedPost, postId) => {
    const url = `/post/updatePost/${postId}`;
    return new Promise((resolve, reject) => {
        const promise = post(url, updatedPost)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'SAVE_POST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAllPost = () => {
    const url = '/post/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_POST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getPost = (postId) => {
    const url = `/post/getPost/${postId}`;
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'GET_POST',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const deletePost = (postId) => {
    const url = `/post/deletePost/${postId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_POST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

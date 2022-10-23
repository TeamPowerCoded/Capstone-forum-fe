import { put, get, deleteMethod, post } from '../../utilities/https';

export const addComment = (newPost, email, postId) => {
    const url = `/comment/addComment/${email}/${postId}`;
    return new Promise((resolve, reject) => {
        const promise = put(url, newPost)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getAllComments = (postId) => {
    const url = `/comment/getComment/${postId}`;
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getListComments = () => {
    const url = '/comment/getAll';
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}


export const getUserComment = (userId) => {
    const url = `/comment/getUserComment/${userId}`;
    return new Promise((resolve, reject) => {
        const promise = get(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const deleteComment = (commentId) => {
    const url = `/comment/deleteComment/${commentId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response) => {
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const updateComment = (updatedComment, commentId) => {
    const url = `/comment/updateComment/${commentId}`;
    return new Promise((resolve, reject) => {
        const promise = post(url, updatedComment)
        promise.then((response) => {
            console.log(response);
            resolve({
                type: 'SAVE_COMMENT',
                payload: response
            })
        }).catch((error) => {
            reject(error)
        })
    })
}


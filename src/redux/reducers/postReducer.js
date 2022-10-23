const initialState = [];

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_POST':
            return state = action.payload;
        default:
            return state;
    }
}

export default postReducer;
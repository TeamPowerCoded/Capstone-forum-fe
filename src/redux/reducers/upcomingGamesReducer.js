const initialState = [];

const upcomingGamesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_GAMES':
            return state = action.payload;
        default:
            return state;
    }
}

export default upcomingGamesReducer;
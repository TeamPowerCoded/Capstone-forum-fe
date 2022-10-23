export const getGames = (games) => {
    return (dispatch) => {
        dispatch({
            type: "FETCH_GAMES",
            payload: games
        })
    }
}
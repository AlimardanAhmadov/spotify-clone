export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    //token: "BQC075KXGHUnpIQ_PQ_OrALUBUNs1lFe-QtES2YEq1E4YU42Mw…eRc1wp9Q26GXM2UEY9zdTmepIigF0kvUSmBvfJSGj07FeHkq0",
};

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_USER" :
            return {
                ...state, 
                user: action.user
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            }
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case "SET_PLAYING":
            return {
                ...state, 
                playing: action.playing
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item
            }
        case "SET_MY_TOP_TRACKS":
            return {
                ...state,
                featured_playlists: action.featured_playlists
            }
        case "SET_FEATURED_ARTISTS":
            return {
                ...state,
                featured_artists: action.featured_artists
            }
        case "SET_RECENTLY_PLAYED_TRACKS":
            return {
                ...state,
                recently_played_tracks: action.recently_played_tracks
            }
        case "SELECTED_MIX":
            return {
                ...state,
                selected_mix: action.selected_mix
            }
        default:
            return state;
    }
}

export default reducer;
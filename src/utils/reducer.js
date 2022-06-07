import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "1Yuhd6pRezxQ5KfC0FAOG4",
  stateClick: false,
  selectListTrackFavorite: null,
  recommned_tracks: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_STATE_CLICK:
      return {
        ...state,
        stateClick: action.stateClick,
      }; 
    case reducerCases.SET_LISTTRACKS_FAVORITE:
      return {
        ...state,
        selectListTrackFavorite: action.selectListTrackFavorite,
      };
    case reducerCases.SET_RECOMMEND:
      return {
        ...state,
        recommned_tracks: action.recommned_tracks,
      };    
    default:
      return state;
  }
};

export default reducer;

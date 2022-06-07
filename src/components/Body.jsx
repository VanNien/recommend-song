import axios from "axios";
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import {FaMusic} from "react-icons/fa"
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle,AiFillHeart } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
export default function Body({ headerBackground }) {

  const [TracksFav, setTracksFav] = useState("");
  const [TracksRecommned, setTracksRecommend] = useState("");
  const [DataTrack, setTrackData] =useState([]);

  const [{  token,
            selectedPlaylist,
            selectedPlaylistId,
            stateClick,
            }, dispatch] = useStateProvider();

 
  useEffect(() => { 
    if (stateClick) {
      const getInitialFavorite = async () => {
        const response = await axios.get(        
          "https://api.spotify.com/v1/me/tracks",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: null,
          name: "All Track Favorited",
          image: null,
          tracks: response.data.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        const selectListTrackFav = {
          tracks: response.data.items.slice(0, 5).map(({ track }) => ({
            name: track.album.name,
            year: parseInt((track.album.release_date).split("-")[0]),
          })),            
        };
        var selectListTrackFavorite =JSON.stringify(Object.values(selectListTrackFav)[0]);
       // var obj= JSON.stringify(selectListTrackFav);
        setTracksFav(selectListTrackFavorite);
        dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        
       
        //console.log("get track favorite", res_recommend);
      };
      getInitialFavorite();
      
    } else {
      const getInitialPlaylist = async () => {
        const response = await axios.get(        
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Playlist data",response.data);
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        
      };
      getInitialPlaylist();
    }
    
   
  }, [token, dispatch, selectedPlaylistId, stateClick]);

  useEffect(() => {
    const res_recommend = async () => {
      const recommned_tracks = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: TracksFav
      });
      if(recommned_tracks.ok){
        console.log(); //first consume it in console.log
        recommned_tracks.json().then(value => {
          console.log(value); 
          setTracksRecommend(value);
        }).catch(err => {
          console.log(err);
        });
       }
      
    };
   res_recommend();
  console.log("Favorite music", TracksFav);
  console.log("Recommend Music", TracksRecommned);
  }, [TracksFav])
 
  const getTrack = async(id) => {
    await  axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((response) => { 
    const data_track = {
      id: response.data.id,
      name: response.data.name,
      artists: response.data.artists.map((artist) => artist.name),
      image: response.data.album.images[2].url,         
      duration: response.data.duration_ms,
      album: response.data.album.name,
      context_uri: response.data.album.uri,
      track_number: response.data.track_number,
    }
    if ( (DataTrack.length)==0) {
      setTrackData(prevArray  => [...prevArray , data_track]) ;    
    } else
    if (DataTrack.length>5) {
      setTrackData(DataTrack.slice(0,5));
    }
    
    console.log(DataTrack);
  }); 
};
 
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playTrack = async (id,name,artists,image, duration,album,context_uri,track_number) => 
  {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play", {
        context_uri,
        offset: {
          position :track_number-1
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status=204) {
      const currentPlaying= {
        id,
        name,
        artists,
        image,
      }
      dispatch({type:reducerCases.SET_PLAYING,currentPlaying});
      dispatch({type:reducerCases.SET_PLAYER_STATE, playerState: true});
    }
    else {
      dispatch({type:reducerCases.SET_PLAYER_STATE, playerState: true});
    }
  };

  
  return (
    <Container headerBackground={headerBackground}>
       {
         selectedPlaylist && (
          <>
          <div className="playlist">
            <div className="image">
            {(() => {
        if (stateClick) {
          return (
            <AiFillHeart  size={300} color={"white"}/>
          )
        } else {
          return (
            <img src={selectedPlaylist.image} alt="selectedPlaylist" />
          )
        }
      })()}
              
            </div>
            <div className="details">
            {(() => {
              if (stateClick) {
                return (
                  <span className="type">List Tracks</span>
                )
              } else {
                return (
                  <span className="type">Playlists</span>
                )
              }
            })()}                
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span><AiFillClockCircle/></span>
              </div>
            </div>
            <div className="tracks">
              {     
                selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    },
                    index
                  ) => {
                    return (
                      <div
                        className="row"
                        key={id}       
                        onClick = {()=>playTrack(id,name,artists,image, duration,album,context_uri,track_number)}               
                      >
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                          <div className="image">
                            <img src={image} alt="track" />
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinutesAndSeconds(duration)}</span>
                        </div>
                      </div>
                    );

                })
              }
            </div>
            <div/>
            </div>
            <div className="astrodivider">
              <div className="astrodividermask"></div>
              <span><i>&#10038;</i></span>
            </div>
            {(() => {
              
                return (
                  <div className="tracks_recommend">
            <div className="details2">
                
                  <h1 className="title">Recommend</h1>
                  <p>Based on the tracks included in this list favorite</p>
                
            </div>
            <div className="list">
              
            <div className="tracks">
              {     TracksRecommned && TracksRecommned.map &&
                TracksRecommned.map(
                  ( {id} ) => {
                    getTrack(id);                 
                  }
              )
            }

            { 
            DataTrack &&   
                DataTrack.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    },
                    index
                  ) => {
                    
                    return (
                      <div
                        className="row"
                        key={index}       
                        onClick = {()=>playTrack(id,name,artists,image, duration,album,context_uri,track_number)}               
                      >
                        <div className="col">
                          <span>{index + 1}</span>
                        </div>
                        <div className="col detail">
                          <div className="image">
                            <img src={image} alt="track" />
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists}</span>
                          </div>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinutesAndSeconds(duration)}</span>
                        </div>
                      </div>
                    );

                })
              }

           
          </div>
          </div>
        </div>
              )
            
          })()} 
        
        
        </>

       )
     }
  </Container>
);
}

const Container = styled.div`
.astrodivider {
  margin:64px auto;
  width:400px; 
  max-width: 100%;
  position:relative;
}

.astrodividermask { 
    overflow:hidden; height:20px; 
}

.astrodividermask:after { 
      content:''; 
      display:block; margin:-25px auto 0;
      width:100%; height:25px;  
        border-radius:125px / 12px;
       box-shadow:0 0 8px #049372;
}
.astrodivider span {
    width:50px; height:50px; 
    position:absolute; 
    bottom:100%; margin-bottom:-25px;
    left:50%; margin-left:-25px;
    border-radius:100%;
   box-shadow:0 2px 4px #4fb39c;
    background:#fff;
}
.astrodivider i {
    position:absolute;
    top:4px; bottom:4px;
    left:4px; right:4px;
    border-radius:100%;
    border:1px dashed #68beaa;
    text-align:center;
    line-height:40px;
    font-style:normal;
     color:#049372;
}
.playlist {
  margin: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  .image {
    img {
      height: 15rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #e0dede;
    .title {
      color: white;
      font-size: 4rem;
    }
  }
}
.list {
  .header-row {
    display: grid;
    grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
    margin: 1rem 0 0 0;
    color: #dddcdc;
    position: sticky;
    top: 15vh;
    padding: 1rem 3rem;
    transition: 0.3s ease-in-out;
    background-color: ${({ headerBackground }) =>
      headerBackground ? "#000000dc" : "none"};
  }
  .tracks {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
    .row {
      padding: 0.5rem 1rem;
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      .col {
        display: flex;
        align-items: center;
        color: #dddcdc;
        img {
          height: 40px;
          width: 40px;
        }
      }
      .detail {
        display: flex;
        gap: 1rem;
        .info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
.details2 {
  gap: 1rem;
  color: #e0dede;
  padding: 1rem 3rem;
  .title {
    color: white;
    font-size: 2rem;
  }
}
`;

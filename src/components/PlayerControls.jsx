import React from 'react';
import styled from 'styled-components';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
  } from "react-icons/bs";
  import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
  import { FiRepeat } from "react-icons/fi";
  import { useStateProvider } from "../utils/StateProvider";
  import axios from "axios";
  import { reducerCases } from "../utils/Constants";
// import { Container } from './styles';

function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();
    const changeSong = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,{},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          console.log("Next-Prev song", response.data);
          if (response.data !== "") {
            const currentPlaying = {
              id: response.data.item.id,
              name: response.data.item.name,
              artists: response.data.item.artists.map((artist) => artist.name),
              image: response.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
          }
    };
    const changeState = async (type) => {
        const state = playerState ? "pause" : "play";
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`, {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
    };
   
  return <Container> 
      <div className="shuffle">
          <BsShuffle/>
      </div>
      <div className="previous">
          <CgPlayTrackPrev onClick={()=>changeSong("prev")}/>
      </div>
      <div className="state">
          {playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill  onClick={changeState}/>}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={()=>changeSong("next")}/>
      </div>
      <div className="repeat">
          <FiRepeat/>
      </div>

  </Container>;
}

const Container = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
export default PlayerControls;
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
// import { Container } from './styles';

function Volume() {
    const [{ token}] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
            `https://api.spotify.com/v1/me/player/volume`,{},
            {
                params: {
                    volume_percent: parseInt(e.target.value)
                },
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
    }
  return <Container>
      <p> <b className='volume'>Volume</b>&nbsp; &nbsp; 
        <span> <input type="range" min={0} max={100} onMouseUp={(e=>setVolume(e))}/></span>

      </p>
     
      </Container>;
}
const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    align-content: center;
    input {
    width: 12rem;
    border-radius: 1.5rem;
    height: 0.4rem;
    }
    .volume{
        color: white;

    }
`;
export default Volume;
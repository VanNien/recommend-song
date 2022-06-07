import React from 'react';
import { MdHomeFilled } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import styled from 'styled-components';
import Playlist from './Playlists';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import Image from '../images/images'

function Sidebar() {
  const [{stateClick }, dispatch] = useStateProvider();
  console.log("StateCLick",stateClick);
  const handleClick =() => {
    dispatch({ type: reducerCases.SET_STATE_CLICK, stateClick: true });    
  }
  return <Container> 
      
      <div className="top__links">
        <div className="logo">
          <img
            src={Image.LOGO}
            alt="spotify"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          
          <li  onClick={() => handleClick()}>
            <IoLibrary />
            <span >Your Favorite </span>
          </li>
        </ul>
    </div>    
        <Playlist/>
       </Container>;
}

const Container = styled.div`

background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;
export default Sidebar;
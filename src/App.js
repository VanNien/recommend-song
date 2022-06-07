import React, { Component, useState, useEffect } from 'react';
import Login from "./components/Login";
import WebMusic from "./components/WebMusic";
import { reducerCases } from './utils/Constants';
import { useStateProvider } from './utils/StateProvider';

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log("Token", token)
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    
  }, [dispatch, token]);
  return <div>{token ? <WebMusic /> : <Login />}</div>;
}
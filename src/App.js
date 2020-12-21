import logo from './logo.svg';
import './App.css';
import GlobalNav from './components/GlobalNav';
import SearchArea from './components/SearchArea';
import VideoList from './components/VideoList';
import {useState} from 'react'

function App() {
  let payload = {}
  let VideoCache = []

  return (
    <div className="App" style = {{backgroundColor:"#282c34"}}>
      <GlobalNav></GlobalNav>
      <br></br>
      <SearchArea load = {payload} videos = {VideoCache}></SearchArea>
      <VideoList videos = {VideoCache}></VideoList>
    </div>
  );
}

export default App;

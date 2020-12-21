import logo from './logo.svg';
import './App.css';
import GlobalNav from './components/GlobalNav';
import SearchArea from './components/SearchArea';
import VideoList from './components/VideoList';
import {useState} from 'react'

function App() {
  let payload = {}
  let VideoCache = {}

  const [showVideo, setVideo] = useState(false)
  const [obj, setObj] = useState([])

  const updateVideoList = (answer) =>{
    setVideo(answer)
  }

  if(showVideo === false){
    return (
      <div className="App" style = {{backgroundColor:"#282c34"}}>
        <GlobalNav></GlobalNav>
        <br></br>
        <SearchArea load = {payload} videos = {VideoCache} show = {showVideo} status = {updateVideoList} Setoj = {setObj} oj = {obj}></SearchArea>
      </div>
    );
  }else{
    return (
      <div className="App" style = {{backgroundColor:"#282c34"}}>
        <GlobalNav></GlobalNav>
        <br></br>
        <SearchArea load = {payload} videos = {VideoCache} show = {showVideo} status = {setVideo} Setoj = {setObj} oj = {obj}></SearchArea>
        <VideoList videos = {obj} show = {showVideo} status = {updateVideoList} Setoj = {setObj} oj = {obj}></VideoList>
      </div>
    );
  }
  
}

export default App;

import logo from './logo.svg';
import './App.css';
import GlobalNav from './components/GlobalNav';
import SearchArea from './components/SearchArea';
import VideoList from './components/VideoList';
import {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';


function App() {
  let payload = {}
  let userpayload = {}
  let VideoCache = {}

  const [showVideo, setVideo] = useState(false)
  const [obj, setObj] = useState([])
  const [user, setUser] = useState("")

  const updateVideoList = (answer) =>{
    setVideo(answer)
  }

  /*if(showVideo === false){
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
  }*/
  return(
    <Router>
      <Switch>
        <Route exact path="/">  
          <Login set = {setUser} userload = {userpayload}></Login>
        </Route>
        <Route path="/VideoList">
          <GlobalNav></GlobalNav>
          <VideoList videos = {obj} show = {showVideo} status = {updateVideoList} Setoj = {setObj} oj = {obj}></VideoList>
        </Route>
        <Route path = "/search">
          <GlobalNav></GlobalNav>
          <SearchArea load = {payload} videos = {VideoCache} show = {showVideo} status = {setVideo} Setoj = {setObj} oj = {obj}></SearchArea>
        </Route>
      </Switch>
    </Router>
  )
  
}

export default App;

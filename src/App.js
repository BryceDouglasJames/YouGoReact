import logo from './logo.svg';
import './App.css';
import GlobalNav from './components/GlobalNav';
import SearchArea from './components/SearchArea';
import VideoList from './components/VideoList';
import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';

const useStateWithLocalStorage =  CacheKey => {
  const [value, setValue] = useState(
    CacheKey.getItem(CacheKey) || ''
  );
 
  useEffect(() => {
    CacheKey.setItem(CacheKey, value);
  }, [value]);
 
  return [value, setValue];
};

function App() {
  let payload = {}
  let userpayload = {}
  let VideoCache = {}

  const [showVideo, setVideo] = useState(false)
  const [obj, setObj] = useState([])
  
  const [user, setUser] = useStateWithLocalStorage(
    "Currentuser"
  )

  const [loggedIn, setLogin] = useStateWithLocalStorage(
    "SignedIn"
  )

  const updateVideoList = (answer) =>{
    setVideo(answer)
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/">  
          <Login set = {setUser} user = {user} userload = {userpayload} logged = {loggedIn} setLogged = {setLogin}></Login>
        </Route>
        <Route path="/VideoList">
          <GlobalNav user = {user} ></GlobalNav>
          <VideoList videos = {obj} show = {showVideo} status = {updateVideoList} Setoj = {setObj} oj = {obj}></VideoList>
        </Route>
        <Route path = "/search">
          <GlobalNav  user = {user}></GlobalNav>
          <SearchArea user = {user} load = {payload} videos = {VideoCache} show = {showVideo} status = {setVideo} Setoj = {setObj} oj = {obj}></SearchArea>
        </Route>
      </Switch>
    </Router>
  )
  
}

export default App;

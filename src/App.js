import './App.css';
import SearchArea from './components/SearchArea';
import VideoList from './components/VideoList';
import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage'

const useStateWithLocalStorage =  CacheKey => {
  const [value, setValue] = useState(
    localStorage.getItem(CacheKey) || ''
  );
 
  useEffect(() => {
    localStorage.setItem(CacheKey, value);
  }, [value]);
 
  return [value, setValue];
};

function App() {
  
  let payload = {}
  let userpayload = {}

  const [showVideo, setVideo] = useState(false)
  const [obj, setObj] = useState([])
  
  const [user, setUser] = useStateWithLocalStorage(
    "Currentuser"
  )


  const [loggedIn, setLogin] = useStateWithLocalStorage(
    "SignedIn"
  )

  const [time, setTime] = useStateWithLocalStorage(
    "SessionTimeout"
  )
 
  const updateVideoList = (answer) =>{
    setVideo(answer)
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/">  
          <Login set = {setUser} user = {user} userload = {userpayload} logged = {loggedIn} setLogged = {setLogin} setTime = {setTime}></Login>
        </Route>
        <Route path="/VideoList">
          <VideoList videos = {obj} user = {user} setUser = {setUser} show = {showVideo} status = {updateVideoList} Setobj = {setObj} oj = {obj} loggedIn = {loggedIn} setLogged = {setLogin} setTime = {setTime}></VideoList>
        </Route>
        <Route path = "/search">
          <SearchArea user = {user} setUser = {setUser} load = {payload} videos = {obj} Setobj = {setObj} show = {showVideo} status = {setVideo} Setoj = {setObj} oj = {obj} time = {time} setTime = {setTime} loggedIn = {loggedIn} setLogged = {setLogin}></SearchArea>
        </Route>
        <Route path="/home">
          <HomePage user = {user} setLogged = {setLogin}></HomePage>
        </Route>
      </Switch>
    </Router>
  )
  
}

export default App;

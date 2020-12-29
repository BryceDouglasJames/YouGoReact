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

var timer = {}

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
  let VideoCache = {}

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

 var myinterval = 10*1000; 
      
  setInterval(function(){ 

        var tempPayload = {User: user}
        fetch("/hello",{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Content-Type": "text/html; charset=utf-8"
                },
                body: JSON.stringify(tempPayload),
            }).then(res => {
                res.text().then(text =>{
                    var arr = null
                    arr = JSON.parse(text);
                    
                    console.log(arr.SessionTime)
                    if(arr.SessionTime>=60000){
                      localStorage.removeItem("SignedIn")
                      localStorage.removeItem("SessionTimeout")
                      localStorage.removeItem("Currentuser")
                      setLogin(false)
                      setUser("")
                      setTime("")
                      console.log(localStorage.getItem("SignedIn"))
                      console.log(localStorage.getItem("SessionTimeout"))
                      console.log(localStorage.getItem("Currentuser"))
                    }else{
                      localStorage.setItem("SessionTimeout", arr.SessionTime)
                    }                    
                })
            })
      
  },myinterval);

  const resetStorage = () =>{
      
      
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/">  
          <Login set = {setUser} user = {user} userload = {userpayload} logged = {loggedIn} setLogged = {setLogin} setTime = {setTime}></Login>
        </Route>
        <Route path="/VideoList">
          <VideoList videos = {obj} user = {user} show = {showVideo} status = {updateVideoList} Setoj = {setObj} oj = {obj} loggedIn = {loggedIn} setLogged = {setLogin}></VideoList>
        </Route>
        <Route path = "/search">
          <SearchArea user = {user} load = {payload} videos = {VideoCache} show = {showVideo} status = {setVideo} Setoj = {setObj} oj = {obj} time = {time} setTime = {setTime} loggedIn = {loggedIn}></SearchArea>
        </Route>
      </Switch>
    </Router>
  )
  
}

export default App;

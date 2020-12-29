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
  const [canFetch, setFetch] = useState(false)
  
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

 var myinterval = 10000;
 
 var thread = 0
      
/*setInterval(()=>{
    if(!canFetch){
      setFetch(true)
    } 
        var tempPayload = {User: user}
        if(canFetch){
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
                      if(localStorage.getItem("SignedIn") === true){
                        setLogin(true)
                      }
                      
                      if(localStorage.getItem("Videos") !== null && arr.SessionTime % 2000 == 0){
                        setObj(JSON.parse(localStorage.getItem("Videos")))
                      }
                      
                      //console.log(arr.SessionTime)
                      if(arr.SessionTime>=60000){
                        localStorage.removeItem("SignedIn")
                        localStorage.removeItem("SessionTimeout")
                        localStorage.removeItem("Currentuser")
                        localStorage.removeItem("Videos")
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
              setFetch(false)
            }
  },myinterval);*/

  const resetStorage = () =>{
      
      
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
      </Switch>
    </Router>
  )
  
}

export default App;

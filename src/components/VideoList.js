import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button} from 'react-bootstrap'
import {Link, withRouter} from "react-router-dom";
import GlobalNav from "./GlobalNav"
import FadeLoader from "react-spinners/FadeLoader";

class VideoList extends Component{
    constructor(props){
        super(props)
        this.state = {
            change: false,
            loading: false
        }
    }

    componentDidMount(){
        //set load state
        this.setState({loading: true})

        //Async did not work too well... set 3 second timeout to allow proper response
        setTimeout(() =>{
            var tempPayload = {User: this.props.user}
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

                    /*****Check for session timeout*****/
                    if(localStorage.getItem("SignedIn") === true){
                        this.props.setLogged(true)
                    }
                    if(localStorage.getItem("Videos") !== null && arr.SessionTime % 2000 == 0){
                        this.props.Setobj(JSON.parse(localStorage.getItem("Videos")))
                    }
                    if(arr.SessionTime>=60000 || arr.SessionTime === "0"){
                        localStorage.removeItem("SignedIn")
                        localStorage.removeItem("SessionTimeout")
                        localStorage.removeItem("Currentuser")
                        localStorage.removeItem("Videos")
                        this.props.setLogged(false)
                        this.props.setUser("")
                        this.props.setTime("")
                    }else{
                        localStorage.setItem("SessionTimeout", arr.SessionTime)
                    }       

                    //complete loading state
                    this.setState({loading: false})             
                })
            })
        }, 3000)
    }

    render(){
        var tempVideoList = JSON.parse(localStorage.getItem("Videos"))
        if(this.state.loading){
            return(
                <>
                    <GlobalNav user = {this.props.user}></GlobalNav>
                    <div className = "m-auto p-2 justify-content-center" style = {{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                        <FadeLoader size ={80} color = {"#282c34"} loading = {this.state.loading}/>
                    </div>
                </>
            )
        }else{
            return(
                <div>
                    {(()=>{
                        if(localStorage.getItem("SessionTimeout") === "0"){
                            return(
                                <>  
                                    <div className = "m-auto p-2" style = {{backgroundColor:"#282c34", border: "none", textAlign: "center", color:"white", height: '100vh', minHeight: '100vh'}}>
                                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                        <h3>It seems your session has expired! <br></br> <br></br> Log back in to create a new session.</h3>   
                                        <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                                        <Link to="/">
                                            <Button variant="outline-light">
                                                Log back in
                                            </Button>
                                        </Link>
                                        <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                                        </div>
                                    </div>
                                </>
                            )
                            }else{
                                if(localStorage.getItem("SignedIn") === false || localStorage.getItem("SignedIn") === null || localStorage.getItem("Currentuser") === ""){
                                    this.setState({change: true})
                                    this.props.setLogged(false)
                                }else if(this.props.videos !== null){
                                    tempVideoList = JSON.parse(localStorage.getItem("Videos"))
                                    if(tempVideoList !== null && tempVideoList[0]!==null){
                                        //console.log(this.props.videos)
                                        return(
                                            <>
                                                <GlobalNav user = {this.props.user}></GlobalNav>
                                                {this.props.videos.map(item =>{
                                                    var youtube = "https://youtube.com/watch?v="
                                                    var nail = "https://img.youtube.com/vi/"+item.VideoID+"/default.jpg"
                                                    // /<Card.Link href={youtube + item.VideoID} >Card Link</Card.Link>
                                                    return(
                                                        <div className = "m-auto p-4" style = {{textAlign:"center"}}>
                                                            <Card  className="m-auto" style={{ width: "70vw" }}>
                                                                <Card.Body>
                                                                    <Card.Title><p>{item.VideoTitle}</p></Card.Title>
                                                    
                                                                    <img className="p-3 m-auto" style={{width:"60vw"}} src = {nail} alt = "nun"/>
                                                    
                                                                    <Card.Subtitle className="mb-2 text-muted"><p></p></Card.Subtitle>

                                                                    <Button  className = "m-auto p-2" style = {{fontSize:"20px"}} variant="light" onClick={()=>{window.open(youtube + item.VideoID)}}>
                                                                        Watch this video
                                                                    </Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    )
                                                })}  
                                            </>
                                        )   
                                    }else{
                                        return( 
                                            <>
                                                <GlobalNav user = {this.props.user}></GlobalNav>
                                                <div className = "m-auto p-2" style = {{backgroundColor:"#282c34", border: "none", textAlign: "center", color:"white", height: '100vh', minHeight: '100vh'}}>
                                                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                                    <h3>You have no searches yet 🥺<br></br></h3>
                                                    <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                                                    <Link to="/search">
                                                        <Button variant="outline-light">
                                                            Back to search
                                                        </Button>
                                                    </Link>
                                                    <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                            }
                        }
                    )()}
                </div>
            )
        }
    }    
}

export default withRouter(VideoList)


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
            loading: false,
            novid: true
        }
    }

    componentDidMount(){
        //set load state
        this.setState({loading: true})

        //Async did not work too well... set 3 second timeout to allow proper response
        setTimeout(() =>{
            var tempPayload = {User: this.props.user}
            fetch("/userbank/1999",{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tempPayload),
            }).then(res => {
                res.text().then(text =>{
                    var arr = null
                    arr = JSON.parse(text);

                    console.log("Starting")
                    /*****Check for session timeout*****/
                    if(localStorage.getItem("SignedIn") === true){
                        console.log("1")
                        this.props.setLogged(true)
                    }
                    else if(localStorage.getItem("Currentuser") === ""){
                        console.log("2")
                        this.props.Setobj(JSON.parse(localStorage.getItem("Videos")))
                        this.setState({novid:false})
                        this.props.setLogged(false)
                        this.props.setUser("")
                        this.props.setTime("")
                    }
                    else if(arr.Searches !== null){
                        localStorage.setItem("Videos", JSON.stringify(arr.Searches))
                    }
                    else{
                        console.log("AYO")
                        localStorage.setItem("SessionTimeout", arr.SessionTime)
                    }       

                    //complete loading state
                    this.setState({loading: false})             
                })
            })
        }, 300)
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
                        
                        if(this.props.loggedIn !== true && localStorage.getItem("SessionTimeout") === "0"){
                            console.log("IM HERE 1")
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
                                if(tempVideoList !== null && tempVideoList.length >= 1){
                                    console.log("IM HERE 2")
                                    tempVideoList.sort(()=>Math.random() - Math.random())
                                    return(
                                        <>
                                            <GlobalNav user = {this.props.user}></GlobalNav>
                                            {tempVideoList.map(item =>{
                                                var youtube = "https://youtube.com/watch?v="
                                                var nail = "https://img.youtube.com/vi/"+item.VideoID+"/default.jpg"
                                                // /<Card.Link href={youtube + item.VideoID} >Card Link</Card.Link>
                                                return(
                                                    <div className = "m-auto p-4" style = {{textAlign:"center", backgroundColor: "#282c34"}}>
                                                        <Card  className="m-auto" style={{ width: "50vw"}}>
                                                            <Card.Body>
                                                                <Card.Title><p style ={{fontSize: "20px"}}>{item.VideoTitle}</p></Card.Title>
                                                
                                                                <img className="p-3 m-auto" style={{width:"40vw"}} src = {nail} alt = "nun"/>
                                                
                                                                <Card.Subtitle className="mb-2 text-muted"><p></p></Card.Subtitle>
                                                                <Button  className = "m-auto p-2" style = {{fontSize:"15px"}} variant="light" onClick={()=>{window.open(youtube + item.VideoID)}}>
                                                                    Watch this video
                                                                </Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                )
                                            })}  
                                        </>
                                    )   
                                }else if (this.state.novid || localStorage.getItem("Videos") === null){
                                    console.log("IM HERE 3")
                                    //setTimeout(window.location.reload(),3000)
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
                    )()}
                </div>
            )
        }
    }    
}

export default withRouter(VideoList)


import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button} from 'react-bootstrap'
import {Link, withRouter} from "react-router-dom";
import GlobalNav from "./GlobalNav"



/*const getSearches = () =>{
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
            console.log(res);
            res.text().then(text =>{
                var arr = null
                arr = JSON.parse(text);
                this.setState({videos: arr.SearchList})
        })
    })
}*/

class VideoList extends Component{
    constructor(props){
        //setInterval(function(){this.getSearches();}, 2000)

        super(props)

        this.state = {
            change: false,
        }
    }

    render(){
        return(
            <div>
                {(()=>{
                    switch(this.state.change) {
                    case true:
                        console.log("WORD")
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
                    case false: 
                        console.log("OHHH") 
                        if(localStorage.getItem("SignedIn") === false || localStorage.getItem("SignedIn") === null){
                            this.setState({change: true})
                            this.props.setLogged(false)
                        }else if(this.props.videos !== null && this.props.videos !== 0){
                            return(
                                <>
                                    <GlobalNav user = {this.props.user}></GlobalNav>
                                    {this.props.videos.map(item =>{
                                        var youtube = "https://youtube.com/watch?v="
                                        var nail = "https://img.youtube.com/vi/"+item.VideoID+"/default.jpg"
                                        // /<Card.Link href={youtube + item.VideoID} >Card Link</Card.Link>
                                        return(
                                            <div className = "m-auto p-4">
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
                        }else if(this.props.videos[0] !== undefined && this.props.videos.length[0] !== 0){
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
                        default:
                            return(
                                <div>
                                    HELLOOOOO
                                </div>
                            )
                    }
                }
            )()}
            </div>
        )
    }    
}

export default withRouter(VideoList)




        
        /*//let videos = this.state.videos
        //let{videos, loggedIn} = this.props
        /*console.log(loggedIn)
        console.log(videos.length)
        console.log(localStorage.getItem("Currentuser"))
        console.log(localStorage.getItem("SessionTimeout"))
        if(localStorage.getItem("SessionTimeout") !== 0){
            if(videos !== null && videos.length !== 0){
                var videoLink = []
                var index = 0
                console.log(videos)
                    return(
                        <>
                            <GlobalNav user = {this.props.user}></GlobalNav>
                            {videos.map(item =>{
                                var youtube = "https://youtube.com/watch?v="
                                var nail = "https://img.youtube.com/vi/"+item.VideoID+"/default.jpg"
                                // /<Card.Link href={youtube + item.VideoID} >Card Link</Card.Link>
                                return(
                                    <div className = "m-auto p-4">
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
                }
            else{
                if(videos[0] !== undefined && videos.length[0] !== 0){
                    
                    if(localStorage.getItem("Currentuser") === null || loggedIn === false){
                        console.log("HOEEEE")
                        this.forceUpdate()    
                    }else{
                        this.setState({change: true})
                    }
            
                }
                console.log(videos)
                console.log(this.props.oj)
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
        
        if(localStorage.getItem("SessionTimout") === 0 || localStorage.getItem("Currentuser") === null || loggedIn === false)
        {
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
        }
       
       //let{videos, loggedIn} = this.props */
import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import GlobalNav from './GlobalNav';

class SearchArea extends Component{
    constructor(props){
        super(props);
        this.currentInput = ""
        this.Index = 0
        this.updateSearch = this.updateSearch.bind(this)
        this.getVideoList = this.getVideoList.bind(this)

        this.state={
            userLog: this.props.loggedIn
        }
    }


    componentDidMount(){
        setTimeout(() =>{
            var tempPayload = {User: this.props.user}
            fetch("/hello",{
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
                    console.log(text)
                    if(localStorage.getItem("SignedIn") === true){
                        this.props.setLogged(true)
                    }

                    
                    
                    if(localStorage.getItem("Videos") !== null && arr.SessionTime % 2000 === 0){
                        this.props.Setobj(JSON.parse(localStorage.getItem("Videos")))
                    }
                    
                    //console.log(arr.SessionTime)
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
                    
                    
                })
            })
        }, 1000)
    
}


    updateSearch = () =>{
        //this.props.load = {}
        this.props.load.id = this.currentInput
        this.props.load.user = this.props.user
        fetch("/query",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "false"
            },
            body: JSON.stringify(this.props.load),
          }).then((resp) => {
            resp = resp.text()
            console.log(resp)
        })

        this.getVideoList();
    }    
    
    
    getVideoList = () =>{
            localStorage.setItem("Videos", null)
            var tempPayload = {User: this.props.user}
            setTimeout(() => {fetch("/hello",{
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tempPayload),
                }).then(res => {
                    if(res.status === 401){
                        localStorage.setItem("SessionTimeout", "")
                    }else{
                        res.text().then(text =>{
                            var arr = null
                            var tempIndex = 0
                            arr = JSON.parse(text)

                            
                            if(arr.Searches === null){
                                setTimeout(this.getVideoList(),1000)
                            }else{
                                console.log("Okay")
                                tempIndex = arr.Searches.length
                                console.log("RESPONSE LENGTH: " + arr.Searches.length + " CURRENTLENGTH: " + this.props.videos.length)
                                if(arr.Searches.length === this.props.videos.length){
                                    console.log("WE GOING AGAIN")
                                    setTimeout(this.getVideoList(), 1000)
                                }else{
                                    console.log("Cool")
                                    this.index = tempIndex
                                    console.log(arr.Searches)
                                    this.props.Setoj(arr.Searches)
                                    localStorage.setItem("SessionTimeout", arr.SessionTime)
                                    localStorage.setItem("Videos", JSON.stringify(arr.Searches))
                                }
                            }
                        })
                    }
                })
    
            this.props.status("true")
        },3000)
    }
    
 


    render(){
        if(this.props.loggedIn !== true && localStorage.getItem("SessionTimeout") === "0"){

            return(            
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
            )
        }else{
            //console.log(localStorage.getItem("SessionTimeout"))
            return(
                <>
                    <GlobalNav user = {this.props.user}></GlobalNav>
                    <div className = "m-auto p-3" style = {{backgroundColor: "#282c34", textAlign:"center", height: '100vh', minHeight: '100vh'}}>
                        <Form>
                            <Form.Group controlId="searchbar">
                                <br></br>
                                <Form.Label className = "p-2 m-auto" style = {{color: "white", fontSize: "40px"}}>Search for your topic</Form.Label>
                                <br></br><br></br><br></br>
                                <Form.Control className="m-auto Search" style = {{width:"70vw"}} type="text" placeholder="" onChange={search => this.currentInput = search.target.value}/>
                                <Form.Text className="blockquote p-4 m-auto" style={{color: "white"}}>
                                    Search your topic, no funny stuff.
                                </Form.Text>
                            </Form.Group>
                            
                                <Button variant="outline-light SearchSubmit" type="submit" onClick = {(e)=>{e.preventDefault(); this.updateSearch(this.currentInput);}}>
                                    <Link to="/VideoList" style ={{color: "white", textDecoration: 'none'}}>
                                        Find videos
                                    </Link>
                                </Button>
                            
                        </Form>
                        
                        
                    </div>
                    <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                        <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                    </div>
                </>
            )
        }
                                    
    }
        
}

//export default withRouter(SearchArea)
export default SearchArea
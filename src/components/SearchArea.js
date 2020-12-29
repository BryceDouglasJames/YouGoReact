import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'
import {Link, withRouter} from "react-router-dom";
import GlobalNav from './GlobalNav';

class SearchArea extends Component{
    constructor(props){
        super(props);
        this.currentInput = ""
        this.Click = 1
        this.updateSearch = this.updateSearch.bind(this)
        this.getVideoList = this.getVideoList.bind(this)

        this.state={
            userLog: this.props.loggedIn
        }
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
                    if(res.status === 401){
                        localStorage.setItem("SessionTimeout", "")
                    }else{
                        res.text().then(text =>{
                            var arr = null
                            arr = JSON.parse(text);
                            if(arr.Searches === null){
                                this.getVideoList()
                            }else{
                                this.Click++
                                console.log(arr.Searches)
                                this.props.Setoj(arr.Searches)
                                localStorage.setItem("SessionTimeout", arr.SessionTime)
                            }
                        })
                    }
                })
        this.props.status("true")
        //this.props.history.push('/VideoList')
    }
    
 


    render(){
        console.log(localStorage.getItem("SessionTimeout"))
        console.log(this.props.loggedIn)       
        /*if(this.props.loggedIn !== true){
            this.setState({userLog: false})
        }*/

        if(this.state.userLog !== true){
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
            console.log(localStorage.getItem("SessionTimeout"))
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
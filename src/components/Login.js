import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import GlobalNav from "./GlobalNav"

export default class Login extends Component{
    constructor(props){
        super(props);
        this.currentInput = ""

        this.handleClick = this.handleClick.bind(this)
    }

    getUserName = (name) =>{
        this.props.set(name)
        console.log(this.props.logged)
        this.props.setLogged(true)

        console.log(this.props.logged)
        this.props.userload.id = name
        fetch("/userpass",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "false"
            },
            body: JSON.stringify(this.props.userload),
        }).then(resp =>{
            alert("You are all set, "+name+"!")
            resp = resp.text()
            console.log(resp)
        })
    }

    handleClick = (e) =>{
        this.getUserName(this.currentInput)
        e.cancelBubble = true;
    }

    
    render(){
        if(this.props.logged === false){
            return(
                <>
                    <div className = "m-auto p-3" style = {{backgroundColor: "#282c34", textAlign: "center", height: '100vh', minHeight: '100vh'}}>
                        <br></br><br></br><br></br><br></br><br></br>
                        <Form>
                            <Form.Label className = "p-2 m-auto" style = {{color: "white", fontSize: "40px"}}>Welcome to YouGo!</Form.Label>
                            <br></br><br></br><br></br>
                            <Form.Group controlId="login">
                                <Form.Control className="m-auto" style = {{width:"70vw"}} type="text" placeholder="" onChange={e => this.currentInput = e.target.value}/>
                                <Form.Text className="blockquote p-4 m-auto" style={{color: "white"}}>
                                    Enter a name so we can keep track of your searches 
                                </Form.Text>
                            </Form.Group>

                            <Link to="/search">
                                <Button variant="outline-light" type="submit" value = "Submit" onClick = {(e) => this.handleClick(e)}>
                                    Start searching!
                                </Button>
                            </Link>
                        
                        </Form>

                        
                        <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                            <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                        </div>
                    </div>
                    
                </>
            )}else{
                return(
                    <>
                        <GlobalNav></GlobalNav>  
                        <div className = "m-auto p-2" style = {{backgroundColor:"#282c34", border: "none", textAlign: "center", color:"white", height: '100vh', minHeight: '100vh'}}>
                            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                            <h2>Hey {this.props.user}, it looks like you are signed in.</h2>   
                            <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                                <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                            </div>
                        </div>
                       
                        
                
                    </>
                )
            }
        
        // <Button variant="outline-light" type="submit" onClick = {this.getUserName(this.currentInput)}>
       // Start searching!
        //</Button>
    }
}
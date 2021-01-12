import React, {Component} from 'react'
import {Link} from "react-router-dom";
import GlobalNav from './GlobalNav';
import {Button} from 'react-bootstrap'

export default class MainPage extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        if(this.props.loggedIn !== true && localStorage.getItem("SessionTimeout") == "0"){

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
            return(    
                <>
                    <GlobalNav user = {this.props.user}></GlobalNav>
                    <div>
                        <h1> Welcome to the home page!</h1>
                    </div>
                </>
            )
        }
            
    }
}


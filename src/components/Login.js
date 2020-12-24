import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class Login extends Component{
    constructor(props){
        super(props);
    }

    getUserName = (e) =>{
        this.props.set(e)
        this.props.userload.id = e
        fetch("/userpass",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "false"
            },
            body: JSON.stringify(this.props.userload),
        }).then(resp =>{
            alert("You are all set, "+e+"!")
            resp = resp.text()
            console.log(resp)
        })
    }

    render(){
        return(
            <>
                <div className = "m-auto p-3" style = {{backgroundColor: "#282c34", textAlign: "center", height: '100vh', minHeight: '100vh'}}>
                    <br></br><br></br><br></br><br></br><br></br>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Label className = "p-2 m-auto" style = {{color: "white", fontSize: "40px"}}>Welcome to YouGo!</Form.Label>
                        <br></br><br></br><br></br>
                        <Form.Group controlId="searchbar">
                            <Form.Control className="m-auto" style = {{width:"70vw"}} type="text" placeholder="" onChange={e => this.currentInput = e.target.value}/>
                            <Form.Text className="blockquote p-4 m-auto" style={{color: "white"}}>
                                Enter a name so we can keep track of your searches 
                            </Form.Text>
                        </Form.Group>
                    </Form>

                    <Link to="/search">
                        <Button variant="outline-light" type="submit" onClick = {(e) => {}}>
                            Start searching!
                        </Button>
                    </Link>
                    
                    <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                        <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                    </div>
                </div>
                
            </>
        )
    }
}
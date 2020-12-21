import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'

export default class SearchArea extends Component{
    constructor(props){
        super(props);
    }

    

    updateSearch = (e) =>{
        this.props.load.id = e 
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
    }    
    
    
    getVideoList = () =>{
        var idk = {}
        fetch("/videos",{
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    "Content-Type": "text/html; charset=utf-8"
                }
            }).then(res => {
                res.text().then(text =>{
                    var temp = null
                    temp = JSON.parse(text)
                   this.props.Setoj(temp.Searches)
                   console.log(this.props.oj)
                    if(this.props.videos.length !== 0){
                        this.props.status("true")
                    }else{
                        console.log("help")
                        this.getVideoList()
                    }
                })
                //var temp = this.props.videos.Searches
                
            })
    }
    
 


    render(){
        return(
            <>
                <div className = "m-auto p-3" style = {{backgroundColor: "#282c34"}}>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Group controlId="searchbar">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className="m-auto" style = {{width:"70vw"}} type="text" placeholder="" onChange={e => this.currentInput = e.target.value}/>
                            <Form.Text className="blockquote p-4 m-auto" style={{color: "white"}}>
                                Search your topic, no funny stuff.
                            </Form.Text>
                        </Form.Group>
                    </Form>

                    <Button variant="outline-light" type="submit" onClick = {(e) => {this.updateSearch(this.currentInput); this.getVideoList()}}>
                        Find videos
                    </Button>
                </div>
                <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                    <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                </div>
            </>
        )
    }
}
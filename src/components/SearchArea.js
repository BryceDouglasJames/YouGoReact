import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'

export default class SearchArea extends Component{
    constructor(props){
        super(props);
    }

    

    updateSearch = (e) =>{
        this.props.load = {}
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

            this.getVideoList()
        })
    }    
    
    
    getVideoList = () =>{
        var idk = {}
        fetch("/hello",{
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
                    
                    this.props.Setoj(temp[0].Searches)
                    
                    if(this.props.videos.length !== 0){
                        
                    }else{
                        console.log("help")
                        this.getVideoList()
                    }
                })
                //var temp = this.props.videos.Searches
            })
            this.props.status("true")
    }
    
 


    render(){
        return(
            <>
                <div className = "m-auto p-3" style = {{backgroundColor: "#282c34", textAlign:"center", height: '100vh', minHeight: '100vh'}}>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Group controlId="searchbar">
                            <br></br>
                            <Form.Label className = "p-2 m-auto" style = {{color: "white", fontSize: "40px"}}>Search for your topic</Form.Label>
                            <br></br><br></br><br></br>
                            <Form.Control className="m-auto" style = {{width:"70vw"}} type="text" placeholder="" onChange={e => this.currentInput = e.target.value}/>
                            <Form.Text className="blockquote p-4 m-auto" style={{color: "white"}}>
                                Search your topic, no funny stuff.
                            </Form.Text>
                        </Form.Group>
                    </Form>

                    <Button variant="outline-light" type="submit" onClick = {(e) => {this.getVideoList()}}>
                        Find videos
                    </Button>
                </div>
                <div className="p-3 m-auto" style = {{backgroundColor:"#282c34", border: "none"}}>
                    <hr style={{color: "white",  width:"40vw", borderColor:"white"}} />
                </div>
            </>
        )
        //this.updateSearch(this.currentInput);
    }
}
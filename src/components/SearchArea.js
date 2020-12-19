import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap'

export default class SearchArea extends Component{
    constructor(props){
        super(props);
        var currentInput
    }

    componentWillMount(){
        this.updateSearch(null)
    }

    updateSearch = (e) =>{
        this.props.load.id = e 

        fetch("/query",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(this.props.load),
          }).then((resp) => {
            console.log(resp);
          });
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

                    <Button variant="outline-light" type="submit" onClick = {(e) => {this.updateSearch(this.currentInput)}}>
                        Find videos
                    </Button>
                </div>
            </>
        )
    }
}
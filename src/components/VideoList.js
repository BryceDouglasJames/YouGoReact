import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button} from 'react-bootstrap'

export default class VideoList extends Component{
    constructor(props){
        super(props)

        this.state = {
            change: false
        }
    }


    render(){
        let{videos} = this.props
        if(videos !== undefined && videos.length !== 0){
            var videoLink = []
            var index = 0
            console.log(videos)
                return(
                    videos.map(item =>{
                        var youtube = "https://youtube.com/watch?v="
                        // /<Card.Link href={youtube + item.VideoID} >Card Link</Card.Link>
                        return(
                            <div className = "m-auto p-3">
                                <Card  className="m-auto" style={{ width: "60vw" }}>
                                    <Card.Body>
                                        <Card.Title><p>{item.VideoTitle}</p></Card.Title>
                
                                        <img className="p-3 m-3" style={{width:"30vw"}} src = {item.ThumbnailURL} alt = "nun"/>

                                        <Card.Subtitle className="mb-2 text-muted"><p></p></Card.Subtitle>
                                    
                                        <Button  className = "m-auto p-2" style = {{width:"15vw", fontSize:"20px"}} variant="light" onClick={()=>{window.open(youtube + item.VideoID)}}>
                                            Watch this video
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })   
                )
            }
        else{
            if(videos[0] !== undefined && videos.length[0] !== 0){
                this.setState({change: true})
            }
            console.log(videos)
            console.log(this.props.oj)
            return(
                <div>
                    <h3>Nah</h3>
                </div>
            )
        }
        
    }
}
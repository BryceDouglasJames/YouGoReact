import React, {Component} from 'react'

export default class VideoList extends Component{
    constructor(props){
        super(props)
    }


    render(){
        let{videos} = this.props
        if(videos.length != 0){
            return(
                videos.map(vid=>{
                    return(
                        <div>
                            <h1 style={{color:"white"}}>{vid.name}</h1>
                        </div>
                    )
                })
            )
        }else{
            return(
                <div>
                    <h3>Nah</h3>
                </div>
            )
        }
        
    }
}
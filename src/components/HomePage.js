import React, {Component} from 'react'
import {Link} from "react-router-dom";
import GlobalNav from './GlobalNav';
import {Button} from 'react-bootstrap'
import styled, {keyframes} from 'styled-components'
import {bounce, fadeIn} from 'react-animations'
import logo from '../../src/YouGoLogo.png'
import github from '../../src/Octocat.png'
import linkedin from '../../src/linkedin.png'

const Bounce = styled.div`animation: 3s ${keyframes`${bounce}`} infinite`;
const FadeIn = styled.div`animation: 4s ${keyframes`${fadeIn}`}`;

export default class MainPage extends Component{
    

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
                    <hr style={{color: "white",  width:"100%", borderColor:"white"}} />
                    </div>
                </div>
            )               
        }else{
            return(    
                <>
                    <GlobalNav user = {this.props.user}></GlobalNav>
                    <div className = "m-auto p-auto" style = {{backgroundColor:"#282c34", border: "none", textAlign: "center", color:"white", height: '100%', minHeight: '100vh', width: "auto"}}>
                        <br></br><br></br><br></br>
                        <FadeIn><Bounce><h2 className = "m-auto p-2">This is YouGo</h2></Bounce></FadeIn>
                        <img src = {logo} alt ="null"/>
                        <br></br><br></br>
                        <FadeIn>
                            <p className = "m-auto p-2" style = {{width: "70%"}}>
                                I Created this web app in the name of avoiding clickbait.
                                When trying to study and search up topics, I get bombareded with useless 
                                content not to mention I always lose track of videos I wanted to watch. 
                                YouGo was an attempt to solve this first world issue. Not only that, I devloped this 
                                as a learning experience towards web development and getting aquainted with golang.
                                <br></br><br></br>
                                <i>And this is open source!</i>
                                <br></br><br></br>
                                Thank you for participating in my project :)
                            </p>
                        </FadeIn>
                        <br></br><br></br>
                        <a href ="https://github.com/BryceDouglasJames">
                            <img src = {github} className = "m-auto p-auto" alt="Logo"/>
                        </a> 

                        <a href="https://www.linkedin.com/in/bryce-james-0761821b8?trk=people-guest_people_search-card&challengeId=AQHBFNPy8LP5DgAAAXb5HPE2176tX_G0l-KuOb0tYwdHZL_UXEXKdHTNNUyzox6rVnNXMBHEEkTUNWgdv2LlYH6-JfSmj48S6A&submissionId=4f79e7d1-a9a2-5916-bc9e-ef03ec006b15">
                            <img src = {linkedin} className = "m-auto p-auto" alt="Logo" />
                        </a>
                    </div>
                </>
            )
        }
            
    }
}


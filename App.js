import React, { Component } from 'react';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import PauseIcon from '@material-ui/icons/Pause';
import './App.css';
import { createWorker } from 'tesseract.js';
import { Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { Offline, Online } from "react-detect-offline";
import {Popup} from 'reactjs-popup'
import { red } from '@material-ui/core/colors';


export class App extends Component  {
 state={
    proflieImg : ""
  }
  state = {
    selected: 'eng'
  };
  

 
  componentDidUpdate () {
    alert(document.querySelector('input[name=myRadio]:checked').value);

  
  }
  

  imageHandler = (e) =>  {
    const reader = new FileReader();
    reader.onload =() => {
      if(reader.readyState === 2) {
        this.setState({proflieImg: reader.result})
      }
    }
  reader.readAsDataURL(e.target.files[0])
 }
  

  
  render() { 
      


     if ('speechSynthesis' in window) {
        alert(" your browser  supports text to speech!👍👏👏🎉🎉")
       }else{
         // Speech Synthesis Not Supported 
        alert("Sorry, your browser doesn't support text to speech!😣");
       }
   
    
    function app() {

      
      
   (async () => {

  
  

    

  
    const worker = createWorker({
    logger: m => console.log(m)
    
    })
    var name =   prompt("what is your name");
      


    await worker.load();
    await worker.loadLanguage(document.querySelector('input[name=myRadio]:checked').value);
    await worker.initialize(document.querySelector('input[name=myRadio]:checked').value );
  
    const { data: { text } } = await worker.recognize(proflieImg);
  
    
    
    

    console.log (text)
await worker.terminate()
   // alert("your text is ready  , your text was -:"
  //   + text)
    let utterance = new SpeechSynthesisUtterance(text) 

 
    if(document.querySelector('input[name=myRadio]:checked').value === "hin" || document.querySelector('input[name=myRadio]:checked').value === "mar"){
        
      utterance.lang= "hi-IN"
        
      }
    speechSynthesis.speak( utterance ) 
 
    
})()


};

  function cancel() {
    return(
      speechSynthesis.pause()
    )
  }

  function resume() {
    return(
      speechSynthesis.resume()
    )
  }

  function stop() {
    return(
      speechSynthesis.cancel()
    )
  }


  

  
 



  const {proflieImg} = this.state
  return (
   
    <div className="App"  style={{backgroundImage:`url(https://www.speechtech.cz/wp-content/themes/speechtech/assets/images/products/ST-Gif-3.gif)`  ,width: window.innerWidth , height: window.innerHeight}}>


        <div className= "of"> 
        <Offline ><strong><strong ><span>Sorry You are Offline😱😱😱😭😭😭😭😠😠😡😡</span>                                   

         </strong></strong></Offline>
          </div>


            <Online>
            
              <div className="app1" >
              <img src={proflieImg} alt="" id="img" className="img" />
            
               <div className="inp">

               <div className="imp"> 
                 <Button><input type="file" name="image" id="input" accept="image/*"  onChange={this.imageHandler}/></Button>
                </div>

                <div className="buttons"> 
                  <Button onClick={app}><RecordVoiceOverIcon ></RecordVoiceOverIcon></Button>
                </div>
    
    
                 
                  <div className="b1" >
                      <Button onClick= {cancel} ><PauseIcon ></PauseIcon></Button>

                     
                  </div>

                 <div className="b2">
                    <Button onClick={resume}><PlayArrowIcon ></PlayArrowIcon></Button>
                 </div>

                  <div className="b3">
                        <Button onClick= {stop}><StopIcon ></StopIcon></Button>
                  </div>
             
                    <div className="h2">
                        <input type='radio' id='eng' name='myRadio' value='eng'
                              checked={this.state.selected === 'eng'} onChange={(e) => 
                              this.setState
                              ({ selected: e.target.value })} 
                              /> English
                     </div>
          
         
                        
                </div>
              <div className="h">
                  <input type='radio' id='hin' name='myRadio' value='hin'
                        checked={this.state.selected === 'hin'} onChange={(e) => 
                        this.setState
                        ({ selected: e.target.value })} />Hindi
          
          

                          <Loader type="Audio" color="rgb(247, 15, 85)" height={80} width={80} />
                          
                          
                          </div>
                          <Popup trigger={<Button> Tips to use the app</Button>}   position="right center">
                  <div style={{color: red}}>
                   <strong> 1.Click on Choose File option</strong>
                    </div>
                     
                   
                   
                   
                  <div style={{color: red}}>
                   <strong> 2.Choose an image that you have to read</strong>
                    </div>
                  <div style={{color: red}}>
                     <strong>3.Click on the Speak Button</strong>
                    </div>
                      <div >
                     <strong>4.Wait ~~As we focus on quality and quality is our priority~~</strong>
                    </div>
                    
                    <div  style={{color: red}}>
                      <strong>5.Enjoy yor spoken Text from the Image</strong>
                  </div>

                </Popup>
                          </div>
                          </Online>
      </div>
);

  
}}

 
export default App;


import React,{useState} from 'react'
import PropTypes from 'prop-types'


export default function Navbar(props) {
    const [text,setText] = useState("")

    const handleUpClick = ()=>{
        let newText  = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UPPERCASE","success");
    }
    const handleOnChange = (event)=>{
        setText(event.target.value)

    }

    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase","success");

    }
    const handleClearClick = ()=>{
        setText("");
        props.showAlert("Text Cleared","success");

    }  

    // const countWords = (corpus)=>{
    //     let noSpace = corpus.replace(/\s/g).length;
    //     console.log(corpus.length - noSpace.length)
        
    // }
    return (    
        <>
            <div className="container" style={{color:props.mode==='dark'?'white':'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value = {text} onChange={handleOnChange} id="myBox" rows="8" style={{backgroundColor:props.mode==='dark'?'grey':'white', color:props.mode==='dark'?'white':'black'}} ></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpClick} >Convert to Uppercase</button>
                <button className="btn btn-primary mx-3" onClick={handleLoClick} >Convert to Lowercase</button>
                <button className="btn btn-primary" onClick={handleClearClick} >Clear</button>


            </div>
            <div className="container" style={{color:props.mode==='dark'?'white':'black'}}>
                <h1>Your text summary</h1>  
                <p> {text.split(" ").length} and {text.length} characters</p>
                <p> {text.split(" ").length *0.008} minutes read</p>
                <h2>Preview</h2>
                <p> {text.length>0?text:"Enter something to preview"}</p>
            </div>
        </>
    )
}

Navbar.propTypes = {title: PropTypes.string}
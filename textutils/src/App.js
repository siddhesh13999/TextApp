import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React,{ useState } from "react";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null);

  const showAlert = (msg, type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  
  const toggleMode = ()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = '#2f4f4f';
      showAlert("Dark Mode has been enabled", "success")
    }
    else
    {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      
    }
  }

  const togglePinkMode = ()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = '#863A6F';
      showAlert("Pink Mode has been enabled", "success")
    }
    else
    {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      
    }
  }
  return (
    <>
    <Router>
      <Navbar title="textutils" mode = {mode} toggleMode = {toggleMode} moreModes = {togglePinkMode} />
      <Alert alert = {alert}></Alert>
      <div className="container my-3">
        <Routes>
          <Route path="/about" element = {<About mode={mode}/>}/>
          <Route  path="/" element = {<TextForm showAlert = {showAlert} heading = "Enter the text to analyse" mode = {mode} moreModes = {togglePinkMode}></TextForm>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import  Navbar  from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Alert from './components/alert';
import Login from './components/login';
import SignUp from './components/signUp';
import { useState } from 'react';
function App() {
  const [alert, setAlert]= useState(null)

  const showAlert=(message, type)=>{
    setAlert({
    msg: message,
    type:type
  })
  setTimeout(()=>{
    setAlert(null);
  },1500);
  }

  return (
    
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route  path="/about" element={<About/>}/>
              <Route   path="/home" element={<Home showAlert={showAlert}/>}/>
              <Route   path="/" element={<Login showAlert={showAlert}/>}/>
              <Route   path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route   path="/signup" element={<SignUp showAlert={showAlert}/>}/>
            
            </Routes>
        </div>
        </BrowserRouter>
      </NoteState>
    </div>

  );
}

export default App;

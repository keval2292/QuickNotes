// src/App.js
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound'; 
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProfileUpdate from './components/ProfileUpdate';
import Profile from './components/Profile';

function App() {
  
  return (
    <NoteState>
      <Navbar />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Home  />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Login" element={<Login  />} />
        <Route exact path="/Signup" element={<Signup  />} />
        <Route exact path="/ProfileUpdate" element={<ProfileUpdate  />} />
        <Route exact path="/Profile" element={<Profile/>} />
        <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
        <Route exact path="/ResetPassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NoteState>
  );
}

export default App;

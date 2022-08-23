
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Home from './pages/user/Home';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Login/>} />
            <Route path='/register' element={<Signup/>} />
            <Route path='/home' element={<Home/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

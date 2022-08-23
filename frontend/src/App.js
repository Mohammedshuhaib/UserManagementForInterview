
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/AdminLogin';
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
          <Route path="/admin">
            <Route index element={<AdminLogin/>} />
            {/* <Route path='/home' element={<AdminHome/>} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

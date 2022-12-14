import React, { useEffect } from 'react'
import './Header.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Header() {
    let navigate = useNavigate()

    useEffect(() => {
      if(localStorage.getItem('Adminlogin')){
        navigate('/admin/home')
      }else {
        navigate('/admin')
      }
    },[])
    const logout = async() => {
      try {
     let response = await axios({
        url:'/admin/logout',
        method:'post',
        withCredentials:true
      },{withCredentials: true})
      if(response) {
        localStorage.removeItem('Adminlogin')
        navigate('/admin')  
      }
      } catch(err) {
        console.log(err)
      }
    }
  return (
   <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          This is home page
        </Typography>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header
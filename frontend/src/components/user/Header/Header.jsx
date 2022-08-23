import React, { useEffect, useLayoutEffect, useState } from 'react'
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
  const logout = async() => {
    try {
   let response = await axios({
      url:'/logout',
      method:'post',
      withCredentials:true
    },{withCredentials: true})
    if(response) {
      localStorage.removeItem('Userlogin')
      navigate('/')
    }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {

    if(localStorage.getItem('Userlogin')){
      navigate('/home')
    }else {
      navigate('/')
    }
  },[])
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
import React,{useState} from 'react'
import './AdminLogin.scss'
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../../Validationshema/adminSchema'
function AdminLogin() {
  const [err, setErr] = useState('')
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });
  let navigate = useNavigate();

  const submitForm = (data) => {
    console.log(data)
  }
  return (
    <div className="loginContainer">
    <div className="loginForm">
      <div className="loginHeader">
        <p>Admin Login</p>
      </div>
      <div className="body">
        <div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="emailField">
              <TextField
                className="inputField"
                fullwidth
                id="standard-basic"
                label="Email"
                variant="standard"
                name="Email"
                type="email"
                {...register('Email')}
              />
               <p className="errorMessage">{formState.errors.Email?.message}</p>
            </div>
            <div className="passwordField">
              <TextField
                fullwidth
                className="inputField"
                id="standard-basic"
                label="Password"
                variant="standard"
                name="Password"
                type="password"
                {...register('Password')}
              />
               <p className="errorMessage">{formState.errors.Password?.message}</p>
            </div>
            <div className="errorContainer">
              <p>{err}</p>
            </div>
            <div className="button">
              <Button type='submit' variant="contained">Login Now</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin
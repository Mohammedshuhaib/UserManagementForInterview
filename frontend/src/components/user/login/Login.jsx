import React,{useState} from "react";
import "./Login.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../Validationshema/userSchema";
import axios from 'axios'
function Login() {
  const [err, setErr] = useState('')
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });
  let navigate = useNavigate();

  const submitForm = async(data) => {
    try {
       await axios({
        method:'post',
        url:`http://localhost:2000/login`,
        data:{
            data
        }
        })
        navigate('/home')
    } catch(err) {
        if(err.response.status === 401) {
          setErr('Password does not match')
        }else if(err.response.status === 404){
          setErr('You dont have an account please register')
        } else {
          setErr('some error occure')
        }
    }
  }
  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginHeader">
          <p>Login</p>
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
                  type="text"
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
            <div className="bottom">
              <p>
                Dont have an account{" "}
                <span >Please register</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

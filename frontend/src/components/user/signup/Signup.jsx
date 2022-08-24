import React,{useEffect, useState} from "react";
import "./Signup.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../../Validationshema/userSchema'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Signup() {

  useEffect(() => {
    if(localStorage.getItem('Userlogin')){
      navigate('/home')
    }
  },[])
  const navigate = useNavigate()
    const [err, setErr] = useState('')
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signupSchema),
      });

      const submitForm = async(data) => {
        try {
           await axios({
            method:'post',
            url:'/register',
            data:{
                data
            }
            })
            navigate('/')
        } catch(err) {
          console.log(err)
            if(err.response.status === 409) {
              setErr('Email address already exist')
            }else{
              setErr('Some error occure')
            }
        }
      }
  return (
    <div className="signupContainer">
      <div className="signupForm">
        <div className="signupHeader">
          <p>Signup</p>
        </div>
        <div className="body">
          <div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="nameField">
                <TextField
                  className="inputField"
                  fullwidth
                  id="standard-basic"
                  type="text"
                  name="Name"
                  label="Name"
                  variant="standard"
                  {...register('Name')}
                />
                 <p className="errorMessage">{formState.errors.Name?.message}</p>
              </div>
              <div className="emailField">
                <TextField
                  className="inputField"
                  fullwidth
                  id="standard-basic"
                  label="Email"
                  name="Email"
                  type="email"
                  variant="standard"
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
                  name="Password"
                  type="password"
                  variant="standard"
                  {...register('Password')}
                />
                <p className="errorMessage">{formState.errors.Password?.message}</p>
              </div>
              <div className="errorContainer">
                <p>{err}</p>
              </div>
              <div className="button">
                <Button type="submit" variant="contained">
                  Signup
                </Button>
              </div>
            </form>

            <div className="bottom">
              <p>
                Already have an account <span onClick={() => navigate('/')}>Please login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

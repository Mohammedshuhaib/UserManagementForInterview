import React,{useState} from 'react'
import './UserDetails.scss'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../../../Validationshema/userSchema'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserDetails() {
  const [err, setErr] = useState('')

  const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(signupSchema),
    });
 const navigate = useNavigate()
    const submitForm = async(data) => {
      try {
         await axios({
          method:'post',
          url:'/register',
          data:{
              data
          }
          })
          document.getElementById("form").reset();
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
    <div className='detailsContainer'>
      <div className="header">
        <p>Add User</p>
      </div>
      <div className="formContaier">
        <form id='form' onSubmit={handleSubmit(submitForm)}>
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
                  Add Now
                </Button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default UserDetails
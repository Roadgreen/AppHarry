import React, { Fragment, useContext, useState } from 'react';
import logo from './img/Auth/logo.png';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sizing } from '@mui/system';
import {AuthContext} from './firebase/firebase'
import { Mail } from '@mui/icons-material';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useNavigate } from "react-router-dom";



declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

function App() {

const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

let navigate = useNavigate();
const Cont = useContext(AuthContext);

/////////////////////////////////////////
/////Authentification UTILISATEURS///////
/////////////////////////////////////////
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
  await Cont.AuthFunction(email,password);
  if(localStorage.getItem('userAuth') === 'yes'){
    navigate("../Home");
  } else if(localStorage.getItem('userAuthError') === 'yes'){
console.log('une erreur');

  } else {
    console.log('une erreur');
    console.log(localStorage.getItem('userAuth'));
  }
  
 }
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#2F4F4F',
        contrastText: '#fff',
      },
    },
  });

  return (
    <Fragment>
      <div className='bg'>
        <div className='bg-form'>
          <img className='logo' src={logo} alt="logo" />
     
      <Container component="main" sx={{width: '70%', height: '200%'}}>
      
        <Box 
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 2,
            
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0}}>
            <TextField 
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color='primary'
              size='small'
              onChange={event => setEmail(event.target.value)}
              
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size='small'
              color='primary'
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="default" />}
              label="Ce souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='button'
              sx={{ mt: 0, mb: 1, backgroundColor:'#2F4F4F',  '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#2969699f'
             } }}
              
            >
              Connection
            </Button>
            <Grid container>
              <Grid item xs>
                <Link fontSize={10} href="#" variant="body2">
                On vous a jeter un Oubliette? Retrouvez votre mot de passe ici!
                </Link>
              </Grid>
              <Grid item>
                <Link fontSize={10} href="/SignUp" variant="body2">
                  {"Pas de compte? Inscrivez-vous ici!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

        </div>
      </div>
    
    </Fragment>
  );
}

export default App;

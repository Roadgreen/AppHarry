import React, {useState,useContext,useEffect, Fragment, ReactEventHandler} from 'react'
import { HouseTestContext } from '../../../firebase/firebase'
import './HouseResult.css'
import { FormControl, Input, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";


function HouseResult(){
    const {Reponse, CheckHouseTest, WriteHouseDatabase, WriteInfoDatabase, WritePhotos} = useContext(HouseTestContext);
    const result = CheckHouseTest(Reponse);
    const [aloysia, setAloysia] = useState(false);
    const [lonicera, setLonicera] = useState(false);
    const [urtica, setUrtica] = useState(false);
    const [maison,setMaison] = useState('')
    const [birthDate, setBirthDate] = useState('');
    const [username,setUsername] = useState('');
    const [reponse,setReponse] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    function check(result: number){
    if(result < 2){
        setAloysia(true)
        WriteHouseDatabase('Aloysia');
        setMaison(`D'Aloysia`)
    } else if(result > 2 && result < 3){
        setLonicera(true);
        WriteHouseDatabase('Lonicera');
        setMaison(`de Lonicera`)
    } else {
        setUrtica(true);
        WriteHouseDatabase('Urtica');
        setMaison(`D'Urtica`)
    } }
useEffect(() => {
    setTimeout(()=>{check(result);},1000)
})

const handlePhotos = (e: any) => {
  setImage(e.target.files[0])
  
}
function handleSubmit(e: React.FormEvent<HTMLFormElement>){
e.preventDefault();
WriteInfoDatabase(reponse,username);
WritePhotos(image)

navigate('../Home');
}



    return(
        <Fragment>
        <div className='bgHouseResult'> 
        <div className='Box'> <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,margin: 6}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                  <h5>Votre nom de sorcier</h5>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  onChange={(event)=>{setUsername(event.target.value)}}
                  fullWidth
                  id="username"
                  label="Nom d'utilisateur"
                  autoFocus
                  size='small'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                  <h5>Ajoutez une photos de profil:</h5>
                <Input type='file' onChange={handlePhotos}/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
      <FormLabel component="legend">Choisissez votre animal de compagnie</FormLabel>
      <RadioGroup
        aria-label="animal"
        defaultValue="chouette"
        name="radio-buttons-group"
      >
        <FormControlLabel value="chouette" onChange={()=>{setReponse('chouette')}} control={<Radio size='small'/>} label="La Chouette" />
        <FormControlLabel value="rat" onChange={()=>{setReponse('rat')}} control={<Radio size='small'/>} label="Le Rat" />
        <FormControlLabel value="chat" onChange={()=>{setReponse('chat')}} control={<Radio size='small'/>} label="Le Chat" />
        <FormControlLabel value="crapaud" onChange={()=>{setReponse('crapaud')}} control={<Radio size='small'/>} label="Un Crapaud" />
        <FormControlLabel value="botruc" onChange={()=>{setReponse('botruc')}} control={<Radio size='small'/>} label="Un Botruc" />
      </RadioGroup>
    </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          
          </Box></div>
       
    </div> 
        </Fragment>
    )
}

export default HouseResult;
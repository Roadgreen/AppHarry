import React, { Fragment,useState,useEffect,useContext} from "react";
import Loader from '../loader/Loader'
import './Home.css'
import {InfosUser} from '../../firebase/firebase' 
import { ImageAspectRatioOutlined } from "@mui/icons-material";
import { url } from "inspector";
import Infos from './components/Infos'
import reportWebVitals from "../../reportWebVitals";


function Home(){
    interface Props {
        name: string
    }
const {ProfilInfos, ImgDownload} = useContext(InfosUser);
const [imgUrl,setImgUrl] = useState('');
const [profilImage, setProfilImage] = useState(false);
const [infoUser,setInfoUser] = useState('')
const [loading,setLoading] = useState(true); 

setTimeout(()=>{
setLoading(false);
},2500)

    ImgDownload().then(res=>{
      
        setImgUrl(res)
    })
    ProfilInfos().then(res=>{
        setProfilImage(res?.ProfilImg)
        setInfoUser(JSON.stringify(res))


    })

    const style = {
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }




    return(
        <Fragment>
        {loading?( <Loader></Loader>):( 
            <>
            <div className="header"></div>
            <div className="photosProfil" style={style}>
                </div>
                <Infos infos={infoUser}/>
                </>
         )}
         </Fragment>
    );
} 
export default Home;
import React,{Fragment, useContext, useEffect, useState} from "react";
import {ChatContext} from '../../../firebase/firebase'
import './Chat.css'

function Chat(){
    const [info,setInfo] = useState<any[]>([]);
    const [chatInf,setChatInf] = useState(false);
    const {ChatInfosUser} = useContext(ChatContext);
    const func = async ()=>{
        const allInfo = await ChatInfosUser()
        setInfo(allInfo);
        setChatInf(true);
        
    }

func()
    return(
        <Fragment>
<div className="containerChat">
    {chatInf? info.map((doc)=>{
        <div className="ContainerInfo">
        <div className="Photos" style={{background: `url(${doc.ProfilImg})`}}></div>

        </div>

    })
    
: <div className="bj" style={{width:'100px', height: '200px', background: 'red'}}></div>}
</div>
        </Fragment>
    )
}

export default Chat
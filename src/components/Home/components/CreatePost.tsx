import React, { Fragment, useState, useContext } from "react";
import './CreatePost.css'
import { PostUser } from "../../../firebase/firebase";


function CreatePost(){
    const {PostImg,PostText,PostTextAndImg} = useContext(PostUser);
    const [photos,setPhotos] = useState(false)
    const [textArea,setTextArea] = useState(false)
    const [image, setImage] = useState('')
    const [text, setText] = useState('')

    const handlePhotos = (e: any) => {
        setImage(e.target.files[0])
        }
    const handleSubmit = async ()=>{
        if(image !== '' && textArea === false){
          await PostImg(image)
        } else if(image !== '' && textArea === true){
           await PostTextAndImg(image,text)
        } else {
           await PostText(text);
        }
        window.location.reload();
    }
    return(
        <Fragment>
            <div className="container-Create">
                <div className="cart-Create">
                    <div className="firstLigne">
                    <div className="profilPhotos"></div>
                    <button className="buttonPhotos" onClick={()=>{setPhotos(true); setTextArea(false)}}>Photos</button>
                    <button className="buttonText" onClick={()=>{setPhotos(false); setTextArea(false)}}>Texte</button>
                    <button className="buttonTextArea" onClick={()=>{setTextArea(true); setPhotos(true)}}>Texte & Photos</button>
                    </div>        
                    {textArea? <textarea className="input"  placeholder="Écrire ici" value={text} onChange={(e)=>{setText(e.target.value)}}></textarea> : console.log()}
                                {photos? <input className="inputPhotos" type='file' onChange={handlePhotos}/> : <textarea className="input"  placeholder="Écrire ici" value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>}
                    <button className="submitPost" onClick={()=>{handleSubmit()}}>Poster</button>
                </div>

            </div>
        </Fragment>
    )
}

export default CreatePost;
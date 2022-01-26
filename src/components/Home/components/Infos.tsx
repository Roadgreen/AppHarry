import React, {Fragment,useState,useContext, useEffect} from 'react'
import { isPropertyName } from 'typescript';
import './Infos.css'
import CreatePost from './CreatePost'
import {PostAllUserHouse} from '../../../firebase/firebase'
import { url } from 'inspector';
import Chat from  '../components/Chat'

interface Props {
    infos: string
}

function Infos({infos}:Props){
    const [waitPost,setWaitPost] = useState(false);
const User = JSON.parse(infos); 
const [AllPost, setAllPost] = useState<any[]>([])

const testPost = [{
    Username: 'jacob',
    text: 'Bonjour ceci est un post',
    imgProfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png' ,
    imgPost: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'

},
{
    Username: 'jacob',
    text: 'Bonjour ceci est un post',
    imgProfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png',
    imgPost: ''

}]
let AllPostit:any; 
const {PostAll} = useContext(PostAllUserHouse)

setTimeout(async ()=>{
AllPostit = await PostAll();
setAllPost(AllPostit)
setWaitPost(true)
},1000)







    


let CartDisplay = {
    display:"none"
}
let CartDisplayFree = {}


     

const [post, setPost] = useState(CartDisplayFree);
const [clicks , setClicks] = useState(false)
const [chat,setChat] = useState(false)


function click(){
    setPost(CartDisplay)
    setClicks(true)
}



    return (
<Fragment>
    <div className='surbody'>
        <div className='container'>
<h2>{User.Username}</h2>
<li>Animal: {User.Animal}</li>
    <li>Order: {User.House}</li> 
        </div>
        <button className='ChatButton' onClick={()=>{setChat(true)}}>Chat</button> 
        <button className='FeedButton'onClick={()=>{setChat(false)}}>Feed</button>
        {chat? console.log():  <div className='feed'>
        
        <button className='PostButton' onClick={()=>{click()}}>+</button>
        {clicks? <CreatePost/>: console.log()}
       {waitPost? AllPost.map((x:any) => {
           
           return(
               <div className='cart' style={post}>
           <div className='profilPhotos' style={{background: `url(${x.imgProfil})`, backgroundPosition: 'center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat'}}></div>
           <div className='profilText'><h5>{x.Username}</h5>
           <p>13/34/32</p>
   
           </div>
           <div className='profilPost'>
               
              {x.text === false? console.log(): <p>{x.text}</p>} 
          {x.imgURL === false? console.log():   <div className='PostImg' style={{background: `url(${x.imgURL})`,backgroundPosition: `center`, backgroundSize: `cover`,backgroundRepeat: 'no-repeat'}}></div>}
           </div>
           </div>
           )
       }) :console.log('Coucou')}
        
            </div>}
       
       
        
        </div>

</Fragment>
    )
}

export default Infos
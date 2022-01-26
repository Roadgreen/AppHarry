// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, setUserId } from "firebase/analytics";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { send } from "process";
import { formatMuiErrorMessage } from "@mui/utils";
import { getDatabase,set } from "firebase/database";
import { getFirestore, collection, doc, setDoc,addDoc,getDoc,getDocs } from "firebase/firestore"
import { getDownloadURL, getStorage, ref,uploadBytes } from "firebase/storage";
import { AnyRecord } from "dns";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB2IdSjwcrwdPDg0nxEuKHG2LZRpQMm9m0",
  authDomain: "batons-2f771.firebaseapp.com",
  projectId: "batons-2f771",
  storageBucket: "batons-2f771.appspot.com",
  messagingSenderId: "883053226987",
  appId: "1:883053226987:web:7f1bc4490f96bfd8fc87ae",
  measurementId: "G-ZTE3JL1S21"
};

//FIRST FIREBASE APP
{/* const firebaseConfig = {
  apiKey: "AIzaSyBS0nC_kzyuM7pe1dQsOfDPvNP-xgyzP18",
  authDomain: "french-beaux-batons-wizard.firebaseapp.com",
  projectId: "french-beaux-batons-wizard",
  storageBucket: "french-beaux-batons-wizard.appspot.com",
  messagingSenderId: "985446754370",
  appId: "1:985446754370:web:0dc599edaa24ed031ea5db",
  measurementId: "G-4F4PSLSTVY",
  databaseURL: "https://french-beaux-batons-wizard.firebaseio.com"
}; */}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
const firestore = getFirestore(app);
const user = auth.currentUser;
const storage = getStorage(app);
const userid =  auth.currentUser?.uid;



/////////////////////////////////////////
///////CREATION D'UTILISATEURS///////////
/////////////////////////////////////////

export const CreateContext = React.createContext({
  CreateFunction: (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userCreate", "yes");
        localStorage.setItem("createErr", "");
        localStorage.setItem('UserUid', user.uid)
       

        const colref = doc(firestore, `users/${user.uid}`)
        const Data = {
          email: user.email
        }
        setDoc(colref,Data,{merge: true});

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        localStorage.setItem("createErr", errorMessage);

        // ..
      });
  },
});

/////////////////////////////////////////
/////Authentification UTILISATEURS///////
/////////////////////////////////////////

export const AuthContext = React.createContext({
  AuthFunction: (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userAuth", "yes");
        localStorage.setItem('userMethod', `${user}`);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
});

/////////////////////////////////////////
///////ALL ABOUT INSCRIPTION INFOS///////
/////////////////////////////////////////

export const HouseTestContext = React.createContext({
  Reponse: [] as number[],
  CheckHouseTest: (arr: number[]) => {
    function ArrayAvg(myArray: number[]) {
      var i = 0,
        summ = 0,
        ArrayLen = myArray.length;
      while (i < ArrayLen) {
        summ = summ + myArray[i++];
      }
      return summ / ArrayLen;
    }
    return ArrayAvg(arr);
  },
  WriteHouseDatabase: (House:string)=>{
    const auth = getAuth();
  const userid =  localStorage.getItem('UserUid')
    function writeUserData(result:string) {
      
      const colref = doc(firestore, `users/${userid}`)

    const Data ={
      House: result
    }
    setDoc(colref,Data,{merge: true});
      
    }
    writeUserData(House);
  },
  WriteInfoDatabase: (animal:string, username: string) => {
    const auth = getAuth();
    const userid =  auth.currentUser?.uid;
    const ref = doc(firestore, `users/${userid}`)
    const Data = {
      Animal: animal,
      Username: username
    }
    setDoc(ref,Data,{merge:true});
  },
  WritePhotos: async (photos: any)=>{
    const auth = getAuth();
    const userid =  auth.currentUser?.uid;
const imageRef = ref(storage, `${userid}/userprofil`);
await uploadBytes(imageRef,photos);
const imgLink = await getDownloadURL(imageRef)
const dbref = doc(firestore, `users/${userid}`)
const Data = {
  ProfilImg: imgLink,

}
setDoc(dbref,Data,{merge:true})
}});
/////////////////////////////////////////
///////ALL ABOUT INSCRIPTION INFOS///////
/////////////////////////////////////////

export const InfosUser = React.createContext({
ProfilInfos: async () =>{

  const auth = getAuth();
  const userid =  auth.currentUser?.uid;
  const refData = doc(firestore,`users/` + `${userid}`)
  const DataAwait = await getDoc(refData);
  const resultData = DataAwait.data();
  return resultData;
},
ImgDownload:  () => {
  const auth = getAuth();
  const userid =  auth.currentUser?.uid;
  const imageRef =  ref(storage,`${userid}/userprofil`)
    return getDownloadURL(imageRef)
 
}});

/////////////////////////////////////////
////////////ALL ABOUT POST///////////////
/////////////////////////////////////////

export const PostUser = React.createContext({
  PostImg: async (img:any) => {
    const auth = getAuth();
    const userid =  auth.currentUser?.uid;
    function getRandomInt() {
      return Math.floor(Math.random() * 10000);
    }
    const numPost = getRandomInt()
    const imgRef = ref(storage, `${userid}/${numPost}`)
    await uploadBytes(imgRef,img);
    let imgUrl = ''
    await getDownloadURL(imgRef).then(res =>{ imgUrl = res})
    const refData = doc(firestore, `users/${userid}/Post/${numPost}`)
  const date = new Date()
  const Data = {imgUrl,date}
  setDoc(refData,Data);
  const refDat = doc(firestore,`users/` + `${userid}`)
  const DataAwait = await getDoc(refDat);
  const resultData = DataAwait.data()
  const imgProfilRef = ref(storage, `${userid}/userprofil`)
  let imgProfil = '';
  await getDownloadURL(imgProfilRef).then(res => {imgProfil = res})

  const newData = {
    imgURL: imgUrl,
    date,
    House: resultData?.House,
    Username: resultData?.Username,
    imgProfil,
    text: false
  }

  const newRefDoc = doc(firestore, `Post/${resultData?.House}/Post/${numPost}`)
  setDoc(newRefDoc,newData)
},
PostText: async (text:string) => {
  const auth = getAuth();
  const userid =  auth.currentUser?.uid;
  function getRandomInt() {
    return Math.floor(Math.random() * 10000);
  }
  const numPost = getRandomInt()
  const refe = doc(firestore, `users/${userid}/Post/${numPost}`)
  const date = new Date()
  const Data = {text,date}
  setDoc(refe,Data);
  const refData = doc(firestore,`users/` + `${userid}`)
  const DataAwait = await getDoc(refData);
  const resultData = DataAwait.data()
  const imgProfilRef = ref(storage, `${userid}/userprofil`)
  let imgProfil = '';
  await getDownloadURL(imgProfilRef).then(res => {imgProfil = res})

  const newData = {
    text,
    date,
    imgURL: false,
    House: resultData?.House,
    Username: resultData?.Username,
    imgProfil
  }

  const newRefDoc = doc(firestore, `Post/${resultData?.House}/Post/${numPost}`)
  setDoc(newRefDoc,newData)
},
PostTextAndImg: async (img:any, text: string) => {
  const auth = getAuth();
  const userid =  auth.currentUser?.uid;
  function getRandomInt() {
    return Math.floor(Math.random() * 10000);
  }
  const Number = getRandomInt()
  const imgRef = ref(storage, `${userid}/${Number}`)
  await uploadBytes(imgRef,img);
  const refDoc = doc(firestore, `users/${userid}/Post/${Number}`)
  const date = new Date()
  let imgUrl = ''
  await getDownloadURL(imgRef).then(res =>{ imgUrl = res})
  
  const Data = {
    text,
    imgURL: imgUrl,
    date
  }
  setDoc(refDoc, Data)
  const refData = doc(firestore,`users/` + `${userid}`)
  const DataAwait = await getDoc(refData);
  const resultData = DataAwait.data()
  const imgProfilRef = ref(storage, `${userid}/userprofil`)
  let imgProfil = '';
  await getDownloadURL(imgProfilRef).then(res => {imgProfil = res})

  const newData = {
    text,
    imgURL: imgUrl,
    date,
    House: resultData?.House,
    Username: resultData?.Username,
    imgProfil
  }

  const newRefDoc = doc(firestore, `Post/${resultData?.House}/Post/${`${resultData?.Username}` + `${date}`}`)
  setDoc(newRefDoc,newData,{merge: true})
}
})

/////////////////////////////////////////
////////////USE POST FOR HOME////////////
/////////////////////////////////////////

export const PostAllUserHouse = React.createContext({
PostAll:  async () => {
  const auth = getAuth();
  const userid =  auth.currentUser?.uid;
  const refData = doc(firestore,`users/` + `${userid}`)
  const DataAwait =  await getDoc(refData);
  const resultData =  DataAwait.data()
  const response =  await getDocs(collection(firestore, `Post/${resultData?.House}/Post`))
  const newTab:any[] = []
  response.forEach((doc) =>{
    newTab.push(doc.data())
  })
 
  return newTab
}
})

/////////////////////////////////////////
////////////USER CHAT INTERFACE//////////
/////////////////////////////////////////

export const ChatContext = React.createContext({
  ChatInfosUser: async () => {
    const auth = getAuth()
    const userid= auth.currentUser?.uid
    const userCol = collection(firestore, `users/`)
    const ref = await getDocs(userCol);
    const newTab:any[] = []
    ref.forEach((doc) =>{
      newTab.push(doc.data())
    })
    return newTab;
  }
})
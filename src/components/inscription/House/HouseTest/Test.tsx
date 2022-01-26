import React,{useEffect,useState,useContext} from "react";



export const TestContext = React.createContext({
   TestQuestion1: [[`Quel est votre personnage préféré dans Harry Potter?`,`Harry`,`Ron`,`Malefoy`,`Dumbledore`],['Quelle est votre couleur préférée parmi celle-ci ? ', `Rouge`,`Noir`,`Vert`,`Bleu`],[`Quel est le lieu où tu te sens le mieux ?`,`La Montagne`,`La Mer`, `La Campagne`,`La Ville`],[`Quel métier voulez-vous faire après vos études ?`,`Auror`,`Professeur`,`Ministre de la magie`,`Joueur de Quidditch`],['Quel animal préfères-tu parmi ceux-ci?',`L'Ours`,`Le Loup`,`La Fouine`,`Le Sanglier`]],
   QuestionFunction: (resp:number[]): void=>{
    let a:number,b:number,c:number,d:number = 0;
   
    resp.map(x => {
        if(x === 1){
            a += 1
        } else if(x === 2){
            b += 1
        } else if(x === 3){
            c += 1
        } else if(x === 4){
            d += 1
        }
    })
    if(a!>b! && a!>c! && a!>d!){
        localStorage.setItem('Response', 'a')
    } else if(b!>a! && b!>c! && b!>d!){
        localStorage.setItem('Response', 'b')
    } else if(c!>b! && c!>a! && c!>d!){
        localStorage.setItem('Response', 'c')
    } else if(d!>b! && d!>a! && d!>c!){
        localStorage.setItem('Response', 'd')
    }
   }

  })


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
//TODO: set correct import
import { getDatabase, set, ref, onValue ,update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGGM_npD2mFT08G1FHs2ZCmh0JLQ-NLYU",
  authDomain: "treasure-hunt-9a3a1.firebaseapp.com",
  projectId: "treasure-hunt-9a3a1",
  storageBucket: "treasure-hunt-9a3a1.appspot.com",
  messagingSenderId: "965170673320",
  appId: "1:965170673320:web:b12554bf2e5400045b349d",
  measurementId: "G-VGXTVGWNC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// declarations

const controlBox = document.getElementById('controlBox')
const speed = 75
let starttime;
let endtime;
let time=0;


main() //Main function starts

async function main() {

    let txt = `Welcome Son of A'Lars and Daughter of Thanos !! I observe that you have collected all the remaining stones !`
    setTimeout( ()=> red_skull_dialouge(txt), 1000)

    let txt2 = `But this stone is special. You need to give up your most precious thing. The thing that you love most !!`
    setTimeout( ()=> red_skull_dialouge(txt2), 12000)

    let txt3 = ` Look THANOS Look, it is really close to you !! You only get ONE chance`
    setTimeout( ()=> red_skull_dialouge(txt3), 22000)

    starttime = new Date().getTime();

    // setTimeout( ()=> gamora_dialouge(` HA  ! He is a monster He never loved someone ! No Point in Crying now DAD !`), 1000)
    
    // txt = `The Tears are not for him ! these are for you !!`
    // setTimeout( ()=> red_skull_dialouge(txt3), 5000)
    


}


// Show Thanos Objective
async function red_skull_dialouge( txt ) {

    await dialouge("../Images/round6/red_skull.png").then((res) => {

        controlBox.innerHTML =  res.outerHTML

        console.log("Appended");

        const dialougeCon = document.getElementById('dialouge')

        typeWriter(dialougeCon, txt, 0)

    })
}

async function  vanish_red_skull(){

    document.getElementById('heroesCon').style.width = "0%"

}

// Show Thanos Objective
async function gamora_dialouge( txt ) {

    await dialouge("../Images/round6/Gamora_head.png").then((res) => {

        controlBox.innerHTML =  res.outerHTML

        console.log("Appended");

        const dialougeCon = document.getElementById('dialouge')

        typeWriter(dialougeCon, txt, 0)

    })
}


// Creates HTML Body to add Dialouge
const dialouge = (headSrc) => {

    return new Promise((resolve, reject) => {

        const dialougeCon = document.createElement('div')
        dialougeCon.className = " dialougeCon "

        const headCon = document.createElement('div')
        headCon.className = " headCon"

        const head = document.createElement('img')
        head.className = " dialougeHead "
        head.src = headSrc

        headCon.appendChild(head)

        const dialouge = document.createElement('p')
        dialouge.className = " dialouge "
        dialouge.id = "dialouge"

        dialougeCon.appendChild(headCon)
        dialougeCon.appendChild(dialouge)


        resolve(dialougeCon)

    })

}

//TypeWriter Function
function typeWriter(textCon, txt, i) {


    if (i < txt.length) {
  
      textCon.innerHTML += txt.charAt(i);
      i++;
      setTimeout(() => { typeWriter(textCon, txt, i) }, speed);
  
    }
  
  
  }
  


//Show StoneAcquired Function
async function stoneAcquired(stoneSrc, stone) {

    //create another section
    let acquirePage = document.createElement('section')
    acquirePage.className = "acquirePage"
  
    //Add Stone Image
    let stoneImg = document.createElement('img')
    stoneImg.src = stoneSrc
    stoneImg.style.height = "20rem"
  
    //Add Title and Msg
    let title = document.createElement('p')
    title.textContent = `CONGRATULATIONS !`
  
    let msg = document.createElement('p')
    msg.textContent = `You have acquired ${stone} Stone`
  
    //Append All Elements
    acquirePage.append(title, stoneImg, msg)
  
    document.body.innerHTML = acquirePage.outerHTML
  
  }

//Scene 1 ==> Thanos Sacrifies Gamora by thowing her off the Cliff
async function scene1() {

    console.log("In scene 1");
    //Creating Scene 1
    let scene = document.createElement('p')
    scene.id = "dialouge"
  
  
    controlBox.innerHTML = scene.outerHTML
    let txt = "Thanos Sacrifies Gamora by thowing her off the Cliff"
  
    scene = document.getElementById('dialouge')
  
    typeWriter(scene, txt, 0)
    document.getElementById('heroesCon').style.width = "30%"
  
  }


document.getElementById('gamora').onclick = ()=>{


    document.getElementById('thanos').src = "../Images/round6/thanos-crying.gif"
    scene1()

     setTimeout( ()=>{
        document.querySelector('.round2-container').innerHTML = "<img id='final_act' src='../Images/round6/thanos-gamora.gif'>" 
    }, 2000)

    setTimeout( ()=>{ window.location.href = '/HTML/game_over.html' }  , 7000)



}

document.getElementById('gaunlet').onclick = ()=>{
    endtime = new Date().getTime();
    
     time += (endtime - starttime) / 1000;
    console.log(time);

    update(ref(db, 'Users/' + localStorage.getItem('username')), {
        complete:true,
        time6: time,
        round: 6,
    })
    stoneAcquired( '../Images/Stones/soul_stone.png' , "SOUL" )

    setTimeout( ()=>{
        document.body.innerHTML = "<img id='snaps' src='../Images/round6/thanos-infinity.gif'>"
      } , 2000 )

    setTimeout(()=>{ window.location.href = '/HTML/snaps.html'  } , 3500 )
    

}
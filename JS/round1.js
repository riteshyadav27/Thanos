

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


main() //Main function starts


async function main() {

  setTimeout(thanos_obj, 1000)
  setTimeout(() => { scene1() }, 20000)
  setTimeout(() => { thanos_choice() }, 25000)


}


// Show Thanos Objective
async function thanos_obj() {

  await dialouge("../Images/thanos.png").then((res) => {

    controlBox.appendChild(res)

    console.log("Appended");

    const dialougeCon = document.getElementById('dialouge')

    let txt = ` I am Thanos ! My Planet has been destroyed because of depreciating resources ! I am going to bring balance by Killing the Half Universe so that Peace can be RESTORTED !   But for this I need 6 INFINITY STONES !
  `
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


//Scene 1 ==> Loki and Thor Appears
async function scene1() {

  console.log("In scene 1");
  //Creating Scene 1
  let scene = document.createElement('p')
  scene.id = "dialouge"


  controlBox.innerHTML = scene.outerHTML
  let txt = "Loki and Thor Arrives at the Scene ! Loki has SPACE STONE"

  scene = document.getElementById('dialouge')

  typeWriter(scene, txt, 0)
  document.getElementById('heroesCon').style.width = "30%"

}

//Choice for thanos 
async function thanos_choice() {

  
  //Create HTML BODY
  let Choicebox = document.createElement('div')
  Choicebox.className = " thanosChoiceCon "

  //Dialouge 
  let choiceTitle = document.createElement('p')
  choiceTitle.id = "dialouge"

  let txt = "You need to get the SPACE STONE from LOKI"

  // Button Container
  let choiceBtnCon = document.createElement('div')
  choiceBtnCon.className = " choiceBtnCon "

  let killLokiBtn = document.createElement('button')
  killLokiBtn.id = "killLokiBtn"
  killLokiBtn.textContent = "Kill Loki And Get the Stone"


  let askLokiBtn = document.createElement('button')
  askLokiBtn.id = "askLokiBtn"
  askLokiBtn.textContent = "Ask Loki Nicely to get the Stone"


  //Appending All the Components
  choiceBtnCon.append(killLokiBtn, askLokiBtn)
  Choicebox.append(choiceTitle, choiceBtnCon)

  controlBox.innerHTML = Choicebox.outerHTML

  // Create Event Listeners for Buttons
  document.getElementById('killLokiBtn').onclick = () => { killLokiAction() }
  document.getElementById('askLokiBtn').onclick = () => { lokiRiddle() }

  typeWriter(document.getElementById('dialouge'), txt, 0)

}

//Loki gets Killed
async function killLokiAction() {

  let loki = document.getElementById('lokiChar')
  loki.src = '../Images/Round1/dead_loki.png'

  let thor = document.getElementById('thorChar')
  thor.src = '../Images/Round1/thor_screaming.png'
  thor.style.height = "40%"

  loki.style.animation = "2s ease-in-out loki_killed  "

  setTimeout(() => stoneAcquired('../Images/Stones/space_stone.png', "Space"), 2000)

  setTimeout( ()=>{ window.location.href = '/HTML/round2.html' }  , 1000 )

}

//Loki gives a Riddle
async function lokiRiddle() {
  starttime=new Date().getTime();

  await dialouge("../Images/Round1/loki_smiling.png").then((res) => {

    controlBox.innerHTML = res.outerHTML

    console.log("Appended");

    const dialougeCon = document.getElementById('dialouge')

    const riddleBox = document.createElement('input')
    riddleBox.className = "user_input"
    riddleBox.id = "loki_riddle_ans"

    let txt = ` I am LOKI ! GOD OF MISCHIEF I will give you if you solve this riddle first ! `
    typeWriter(dialougeCon, txt, 0)

    txt = ` Riddle : I am vast, but I have no boundaries. I am dark, but I am filled with light. I am full of wonders, but you cannot touch me. What am I?`
    setTimeout(() => {

      dialougeCon.innerHTML = ""
      typeWriter(dialougeCon, txt, 0)
      controlBox.append(riddleBox)

      //Event Listeners
      document.getElementById('loki_riddle_ans').onchange = (e) => { checkAns(e.target.value) }

    }, 8000)

  })

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
  msg.innerHTML = `You have acquired ${stone} Stone`

  //Append All Elements
  acquirePage.append(title, stoneImg, msg)

  document.body.innerHTML = acquirePage.outerHTML

  
}

//TypeWriter Function
function typeWriter(textCon, txt, i) {


  if (i < txt.length) {

    textCon.innerHTML += txt.charAt(i);
    i++;
    setTimeout(() => { typeWriter(textCon, txt, i) }, speed);

  }


}


//CheckAns Function

async function checkAns(ans) {

  ans = ans.trim()
  ans = ans.toLowerCase()

  if (ans === "space") {
    endtime=new Date().getTime();
    let time = (endtime-starttime)/1000;

    console.log(time);
    console.log(localStorage.getItem('username'));

    update(ref(db, 'Users/'+ localStorage.getItem('username')), {
      time1 : time,
      round : 1,
    })



    stoneAcquired('../Images/Stones/space_stone.png', "<span>SP<span class='purple' >A</span>CE</span>")
    setTimeout( ()=>{ window.location.href = '/HTML/round2.html' }  , 2000 )
  }
  else alert("Wrong Ans Try Again !")


}




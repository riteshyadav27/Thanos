

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
//TODO: set correct import
import { getDatabase, set, ref, onValue ,update,get,child} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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

let starttime;
let endtime;
let time = 0;
// declarations
var rows = 3;
var columns = 3;

var currTile;
var blanktile;
var otherTile;

var turns = 0;

let speed = 75

var sol = ["1","2","3","4","5","6","7","8","9"];

var imgOrder = ["/Images/round4/2",
    "/Images/round4/5",
    "/Images/round4/9",
    "/Images/round4/7",
    "/Images/round4/1",
    "/Images/round4/6",
    "/Images/round4/4",
    "/Images/round4/8",
    "/Images/round4/3"];

window.onload = function () {
    starttime=new Date().getTime();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);


            document.getElementById("board").append(tile);
        }
    }

    function dragStart() {
        currTile = this;
    }

    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.preventDefault();
    }
    function dragLeave(e) {
        e.preventDefault();
    }
    function dragDrop(e) {
        otherTile = this;
    }
    function dragEnd(e) {

        if (!otherTile.src.includes("9.jpg")) {
            return;
        }

        let currCords = currTile.id.split("-");
        let r1 = parseInt(currCords[0]);
        let c1 = parseInt(currCords[1]);

        let otherCords = otherTile.id.split("-");
        let r2 = parseInt(otherCords[0]);
        let c2 = parseInt(otherCords[1]);

        let moveleft = r1 == r2 && c1 == c2 - 1;
        let moveright = r1 == r2 && c1 == c2 + 1;
        let moveup = r1 == r2 - 1 && c1 == c2;
        let movedown = r1 == r2 + 1 && c1 == c2;

        let isAdjacent = movedown || moveleft || moveright || moveup;
        if (isAdjacent) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

            turns++;
            document.getElementById("turns").innerText = turns;
        }

        let updatedBoard = document.getElementById('board')
        var doc = new DOMParser().parseFromString(updatedBoard.innerHTML, "text/xml");
        
        let currentSeq = []

        for( let i = 0 ; i < 3 ; i++){

            for( let j = 0 ; j < 3 ; j++ ){

                let doc = document.getElementById(`${i}-${j}`).src + "" 
                let seq = (doc).charAt( doc.length-5) 

                currentSeq.push(seq)

            }

        }

        console.log(currentSeq);
        console.log(sol);
        
        if( JSON.stringify(currentSeq) === JSON.stringify(sol) ) {
            endtime = new Date().getTime();

            time += (endtime - starttime) / 1000;

            update(ref(db, 'Users/' + localStorage.getItem('username')), {
                time4: time,
                round: 4,
            })
            stoneAcquired('../Images/Stones/time_stone.png', "<span class='purple'>TI</span>ME")
            setTimeout(()=>{ window.location.href = '/HTML/round5.html' } , 2000)
        }
        


    }
}


//Main Function
main()


async function main(){

    setTimeout( drStange_obj , 2000 )


}

// Show Thanos Objective
async function drStange_obj() {

    await dialouge("../Images/round4/Dr_strange.png").then((res) => {
  
      controlBox.appendChild(res)
  
      console.log("Appended");
  
      const dialougeCon = document.getElementById('dialouge')
  
      let txt = ` Welcome Thanos and Gamora to my Mirror Dimension Spell ! I have shattered the pieces of mirror. You can only get out if you can rearrange the mirror again !! `
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
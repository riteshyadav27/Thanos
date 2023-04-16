
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
//TODO: set correct import
import { getDatabase, set, ref, onValue, update, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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
let time = 0;

main() //Main function starts

async function main() {

    setTimeout(thanos_obj, 1000)
    setTimeout(gamora_dialouge, 12000)
    setTimeout(appendInput, 22000)


}


// Show Thanos Objective
async function thanos_obj() {

    await dialouge("../Images/thanos.png").then((res) => {

        controlBox.appendChild(res)

        console.log("Appended");

        const dialougeCon = document.getElementById('dialouge')

        let txt = `Guardians of the Galaxy !! We meet again !!! Hand over the POWER Stone, My Daughter. I Will spare the lives of your puny friends !!`
        typeWriter(dialougeCon, txt, 0)


    })
}

async function gamora_dialouge() {

    await dialouge("../Images/round3/Gamora_head.png").then((res) => {
        starttime = new Date().getTime();
        controlBox.innerHTML = res.outerHTML

        console.log("Appended");

        const dialougeCon = document.getElementById('dialouge')

        let txt = `Don't call me daughter. You are no longer my DAD !! Anyway, you cannot get the stone without the last number in the sequence !!!`
        typeWriter(dialougeCon, txt, 0)


    })

}

async function thanos_takes_gamora() {

    await dialouge("../Images/thanos.png").then((res) => {

        controlBox.innerHTML = res.outerHTML

        console.log("Appended");

        const dialougeCon = document.getElementById('dialouge')

        let txt = `I got the POWER Stone !! My Daughter, you are coming with me !! hahahaha !!`
        typeWriter(dialougeCon, txt, 0)


    })

}

async function appendInput() {

    const riddleBox = document.createElement('input')
    riddleBox.className = "user_input"
    riddleBox.id = "loki_riddle_ans"

    controlBox.append(riddleBox)

    //Event Listeners
    document.getElementById('loki_riddle_ans').onchange = (e) => { checkAns(e.target.value) }

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

//CheckAns Function
async function checkAns(ans) {

    console.log(ans);

    if (ans === "4") {
        endtime = new Date().getTime();

        time += (endtime - starttime) / 1000;


        update(ref(db, 'Users/' + localStorage.getItem('username')), {
            time3: time,
            round: 3,
        })
        thanos_takes_gamora()
        setTimeout(() => stoneAcquired('../Images/Stones/power_stone.png', "POWER"), 7000)
        setTimeout(() => window.location.href = '/HTML/round4.html', 9000)

    }
    else alert("Wrong Ans Try Again !")

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
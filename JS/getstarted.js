
const txt = 
`During the Big Bang, the Universe Exploded and a whole new journey began.With the creation of the Universe, 6 stones were also born that hold the power to change the UNIVERSE.Anyone who possesses this INFINITY STONES can do whatever they want. 
`

const storyCon = document.getElementById("startStory")
const speed = 75
let i=0



function typeWriter() {
  
    if (i < txt.length) {

      storyCon.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
    else{
      document.getElementById("container2").style.display = "block";
    }
  }
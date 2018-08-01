let keyboard = {
  up: 38,
  down: 40,
  space: 32,
  plus: 187,
  minus: 189,
}
let scrollConfig = {}
document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('autoscroll').addEventListener('click', function(){
      scrollTo(50000);   
  })
  document.getElementById('trasposeUp').addEventListener('click', function(){
    traposeChordsUp();  
  })
  document.getElementById('trasposeDown').addEventListener('click', function(){
    traposeChordsDown();  
  })
  document.addEventListener('keydown', function(e){
    if(e.keyCode == keyboard.space){
      e.preventDefault();
      stopScroll();
      document.documentElement.scrollTop -= 300;
      scrollTo(50000);   
    }
    if(e.keyCode == keyboard.minus){
      e.preventDefault();
      stopScroll();
      scrollTo(100000);   
    }
  })
});
var isScrollActivated = true;
function scrollTo(duration) {
    var start = document.documentElement.scrollTop,
    change = document.body.clientHeight - start,
    currentTime = 0,
    increment = 10;
    isScrollActivated = true;
    var animateScroll = function(){  
      currentTime += increment;
      var val = start + (currentTime * change / duration)
      document.documentElement.scrollTop = Math.floor(val); 
      if(currentTime < duration && isScrollActivated) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  function stopScroll(){
    isScrollActivated = false;
  }

  chordArr = ['A', 'A#','B','C','C#','D','D#','E','F','F#','G','G#']

  function traposeChordsUp(chord){
    let chordValue, newValue;
    let chords = document.getElementsByClassName('chord');
    Array.from(chords).forEach(e =>{
      chordValue = e.innerText.slice(0,1)
      if(e.innerText.slice(1,2) === '#'){
        chordValue = e.innerText.slice(0,2)
      }
      switch (chordValue){
        case 'A': newValue = 'A#'; break;
        case 'A#': newValue = 'B'; break;
        case 'B': newValue = 'C'; break;
        case 'C': newValue = 'C#'; break;
        case 'C#': newValue = 'D'; break;
        case 'D': newValue = 'D#'; break;
        case 'D#': newValue = 'E'; break;
        case 'E': newValue = 'F'; break;
        case 'F': newValue = 'F#'; break;
        case 'F#': newValue = 'G'; break;
        case 'G': newValue = 'G#'; break;
        case 'G#': newValue = 'A'; break;
      }
      e.innerText = newValue + e.innerText.slice(chordValue.length);
    })
  }
  function traposeChordsDown(chord){
    let chordValue, newValue;
    let chords = document.getElementsByClassName('chord');
    Array.from(chords).forEach(e =>{
      chordValue = e.innerText.slice(0,1)
      if(e.innerText.slice(1,2) === '#'){
        chordValue = e.innerText.slice(0,2)
      }
      switch (chordValue){
        case 'A': newValue = 'G#'; break;
        case 'A#': newValue = 'A'; break;
        case 'B': newValue = 'A#'; break;
        case 'C': newValue = 'B'; break;
        case 'C#': newValue = 'C'; break;
        case 'D': newValue = 'C#'; break;
        case 'D#': newValue = 'D'; break;
        case 'E': newValue = 'D#'; break;
        case 'F': newValue = 'E'; break;
        case 'F#': newValue = 'F'; break;
        case 'G': newValue = 'F#'; break;
        case 'G#': newValue = 'G'; break;
      }
      e.innerText = newValue + e.innerText.slice(chordValue.length);
    })
  }

  let test = function(){
    console.log('hey')
  }
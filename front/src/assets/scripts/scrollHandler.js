let keyboard = {
  up: 38,
  down: 40,
  space: 32,
  plus: 187,
  minus: 189,
}
let scrollConfig = {}
document.addEventListener('DOMContentLoaded', function(){

  
  document.addEventListener('keydown', function(e){
    if(e.keyCode == keyboard.space){
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

  function stopScroll(){
    isScrollActivated = false;
  }
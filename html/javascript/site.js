
function setInterval(){
    var list = ["A place to grow", "A place to live", "A mind to give"];
    var count = 0;
  setInterval(intervalChange(list[count]), 1000);
}

function intervalChange(item){
  document.getElementById('change').innerHTML = item;
  return ++count;
}

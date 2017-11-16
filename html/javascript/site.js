
var list = ["a developer", "a journalist", " a writer", " a data enthusiast", "a husband", "a veteran", "a traveler"];
var counter = 0;
var elem = document.getElementById("change");
setInterval(change, 1000);
function change() {
  elem.innerHTML = list[counter];
  counter++;
  if (counter >= list.length) {
    counter = 0;
  }
}

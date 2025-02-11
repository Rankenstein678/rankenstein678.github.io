scoreboard = document.getElementById("score")
jetziges_Element = document.getElementById("curr_el")

to_revert = []
to_revert_colors = []
elemente = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"];
elementeNoShuffle = [...elemente];

let correct = 0
let wrong = 0
let remaining = elemente.length + 1

function update_scoreboard() {
  scoreboard.innerText = `Korrekte Elemente: ${correct}
Falsche Elemente: ${wrong}\nNoch Verbleibend: ${remaining}`
}

function markElement(cls, right) {
  let el = cls;
  let color;
  console.log(el)
  let newClass;
  if (right) {
    color = "green"
    right++;
  } else {
    color = "red";
    wrong++
    newClass = ".ele-" + String(elementeNoShuffle.indexOf(jetziges_Element.innerText) + 1);
    console.log(newClass)
    markElement(document.querySelectorAll(newClass)[0], true)
  }
  console.log(el)

  to_revert_colors.push(el.style.backgroundColor);
  to_revert.push(el)

  el.style.backgroundColor = color;
  el.children[0].style.color = "rgba(0, 0, 0, 1)";

  setTimeout(function () {
    let m = to_revert.shift();
    m.style.backgroundColor = to_revert_colors.shift();
    m.children[0].style.color = "rgba(0, 0, 0, 0)";
  }, 3000);
}

function handleClick(cls) {
  let me = document.getElementsByClassName(cls)[0]
  markElement(me, me.children[0].innerText === jetziges_Element.innerText)
  update_scoreboard()
  getNextElement()
}

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(elemente);

function getNextElement() {
  remaining--;
  if (elemente.length !== 0) {
    jetziges_Element.innerText = elemente.pop();
  } else {
    jetziges_Element.innerText = "Durch";
  }
}

update_scoreboard()
getNextElement()

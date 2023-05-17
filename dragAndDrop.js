function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  var numRectanglesMoved = document.querySelectorAll(".dropped").length;
  if (numRectanglesMoved === 6) {
    document.getElementById("confermaButton").style.display = "block";
    document
      .getElementById("confermaButton")
      .addEventListener("click", function () {
        conferma();
      });
  }
}


function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text/plain");
  var droppedElement = document.getElementById(data);
  ev.target.appendChild(document.getElementById(data));
  droppedElement.classList.add("dropped");
}

function conferma() {
  
  var ordineRettangoli = [];
  var testoRettangoli = [];

  var containerR = document.getElementById("containerR");
  var rettangoli = containerR.querySelectorAll(".rectangle");
  for (var i = 0; i < rettangoli.length; i++) {
    ordineRettangoli.push(rettangoli[i].id);
    testoRettangoli.push(rettangoli[i].querySelector("span").innerText);
  }

  //localStorage
  localStorage.setItem("ordineRettangoli", JSON.stringify(ordineRettangoli));
  localStorage.setItem("testoRettangoli", JSON.stringify(testoRettangoli));
  localStorage.setItem("indexArray", JSON.stringify(-1));

  // cambio pagina
  window.location.href = "first-diagram.html";
}



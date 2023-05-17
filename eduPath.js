
window.onload = function () {
  
  var container = document.getElementById("container");

  // rettangoli
  for (var i = 0; i < 7; i++) {
    var rectangle = document.createElement("div");
    rectangle.className = "rectangle";
    rectangle.id=i; //id singolo div
    rectangle.setAttribute("draggable", "true");
    rectangle.setAttribute("ondragstart", "drag(event)");
    rectangle.innerHTML = "<span>LO " + (i+1) + "</span>";

    //rectangle.innerHTML = "LO " + (i+1); //testo
    
    container.appendChild(rectangle);
  }

  var containerR = document.getElementById("containerR"); 

  // rettangoli
  for (var i = 0; i < 7; i++) {
    var rectangleDrop = document.createElement("div");
    rectangleDrop.className = "rectangleDrop";
    rectangleDrop.id=i; //id singolo div
    
    rectangleDrop.setAttribute("ondrop","drop(event)");
    rectangleDrop.setAttribute("ondragover", "allowDrop(event)");
    
    containerR.appendChild(rectangleDrop);
  }

};

//mostra/nascondi immagine
function toggleImage() {
  var imageContainer = document.getElementById("imageContainer");
  if (imageContainer.style.display === "none") {
    imageContainer.style.display = "block";
  } else {
    imageContainer.style.display = "none";
  }
}

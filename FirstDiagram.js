/// <reference path="typescript/global.d.ts" />

//localStorage
var ordineRettangoli = JSON.parse(localStorage.getItem("ordineRettangoli"));
var testoRettangoli = JSON.parse(localStorage.getItem("testoRettangoli"));

//MindFusion
var Diagram = MindFusion.Diagramming.Diagram;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var NodeListView = MindFusion.Diagramming.NodeListView;
var Theme = MindFusion.Diagramming.Theme;
var Style = MindFusion.Diagramming.Style;


var Rect = MindFusion.Drawing.Rect;
var Size = MindFusion.Drawing.Size;

var diagram = null;
var pattern;

document.addEventListener("DOMContentLoaded", function () {
  // create a DiagramView component that wraps the "diagram" canvas
  var diagramView = MindFusion.Diagramming.DiagramView.create(
    document.getElementById("diagram")
  );
  diagram = diagramView.diagram;
  diagram.backBrush = "#f0f5f5";

  diagram.addEventListener("nodeCreated", onNodeCreated);
  diagram.addEventListener("linkCreated", onLinkCreated);

  //TEMA
  //diagram.theme = MindFusion.Diagramming.Theme.getGreen();

  var theme = new Theme();
  var shapeNodeStyle = new Style();

  shapeNodeStyle.brush = "#556b2f";
  shapeNodeStyle.stroke = "#fffff";
  shapeNodeStyle.textColor = "#ffffff";
  shapeNodeStyle._selectedBrush = "#2f4f4f";
  shapeNodeStyle.fontName = "Verdana";
  shapeNodeStyle.fontSize = 5;
  theme.styles.set("std:ShapeNode", shapeNodeStyle);

  var linkStyle = new Style();
  linkStyle.stroke = "#000000";
  linkStyle.textColor = "#000000";
  linkStyle.fontName = "Verdana";
  linkStyle.fontSize = 3;
  theme.styles.set("std:DiagramLink", linkStyle);

  diagram.theme = theme;

  //NODI
  var nodeList = NodeListView.create(document.getElementById("nodeList"));
  nodeList.iconSize = new Size(96, 96);
  nodeList.defaultNodeSize = new Size(24, 24);

  for (var i = 0; i < ordineRettangoli.length; i++) {
    var rect = new ShapeNode(diagram);
    rect.id = ordineRettangoli[i];
    rect.shape = "File";
    //rect.iconSize = new Size(200,200)
    rect.bounds = new Rect(50, 15, 30, 25);
    rect.text = testoRettangoli[i];
    rect.font_size = 6;
    rect.brush = "#556b2f";
    nodeList.addNode(rect);
  }

  //PUNTI DI ANCORAGGIO
  pattern = new MindFusion.Diagramming.AnchorPattern(
    [
      //new MindFusion.Diagramming.AnchorPoint(0,0, true, false, MindFusion.Diagramming.MarkStyle.Circle, "#3399ff"), //angolo alto sinistra
      //new MindFusion.Diagramming.AnchorPoint(25,0, true, false, MindFusion.Diagramming.MarkStyle.Circle, "#3399ff"), //1/4 alto
      new MindFusion.Diagramming.AnchorPoint(
        50,
        0,
        true,
        false,
        MindFusion.Diagramming.MarkStyle.Circle,
        "#ff6600"
      ), //alto centro
      new MindFusion.Diagramming.AnchorPoint(
        100,
        50,
        false,
        true,
        MindFusion.Diagramming.MarkStyle.Circle,
        "#3399ff"
      ), //destra centro
      new MindFusion.Diagramming.AnchorPoint(
        50,
        100,
        false,
        true,
        MindFusion.Diagramming.MarkStyle.Circle,
        "#3399ff"
      ), //basso centro
      new MindFusion.Diagramming.AnchorPoint(
        -0,
        50,
        false,
        true,
        MindFusion.Diagramming.MarkStyle.Circle,
        "#3399ff"
      ), //sinistra centro
    ],
    MindFusion.Diagramming.MarkStyle.Circle,
    "#3399ff"
  );
});

//PUNTI DI ANCORAGGIO
function onNodeCreated(sender, args) {
  var node = args.node;
  node.anchorPattern = pattern; //MindFusion.Diagramming.AnchorPattern.topInBottomOut;//fromId("topInBottomOut");
}

//LINK
function onLinkCreated(sender, args) {
  var link = args.link;
  //link.headShape = "Circle";
  //link.headBrush = "yellow";
  link.headShapeSize = 5;
}


//save
function saveDiagram() {
  if (StorageAvaliable("localStorage")) {
    localStorage.setItem("jsdiagram", diagram.toJson());
  } else {
    alert("Sorry no local storage");
  }
}

function StorageAvaliable(type) {
  try {
    var storage = window[type],
      x = "_storage_test_";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

//load
function loadDiagram() {
  var diagramString = localStorage.getItem("jsdiagram");
  diagram.fromJson(diagramString);
}

/*-----------------------------------------\
| By:      Bart Mulckhuijse - WerkVanBart  |
| Web:     http://werkvanbart.nl           |
| Licence: CC-SA-BY v3.0            (2017) |
\-----------------------------------------*/
var myGraph2 = new Path();
myGraph2.strokeColor = 'black';

var toggleEnable = true;
var pass = 0;
var spiroName = ""; 

 
function toggleAnimation(){
  if (toggleEnable){
    toggleEnable = false;
    myGraph2.simplify(1); // default 2.5 - lower = more exact and more nodes
    myGraph2.fullySelected = true; // just to notify the viewer
  }else{
    // toggleEnable = true;  starting to draw again will destroy the graph
  }
}

function onMouseDown(event) {
  toggleAnimation();
}

function onFrame(event) {
    if (toggleEnable){
      var i = event.count
      var R = 300
      var r = -120
      var O = -60
      var x =500 + (R+r)*Math.cos( Math.PI* (i+60)/180) - (r+O)*Math.cos(((R+r)/r)*(Math.PI* (i+60)/180));
      var y =500 + (R+r)*Math.sin( Math.PI* (i+60)/180) - (r+O)*Math.sin(((R+r)/r)*(Math.PI* (i+60)/180));
      var x0 = 500 + (R+r) - (r+O)
      var y0 = 500
      myGraph2.add(new Point(x,y));

      if (pass == 0){
          pass =1
          while ( (pass*R)%r > 0){
          pass ++;
          }
      }

      if ( i > pass * 360 ){ // if the next point will be the final - close the path
        myGraph2.closed = true
        toggleAnimation()
      }
      
      if (spiroName==""){
          spiroName = "spiro_"+R+"_"+r+"_"+O
      }
    }  
}

//currently name doesn't seem to work in some browsers.
//Save SVG from paper.js as a file.
var downloadAsSVG = function (fileName) {

   if(!fileName) {
       fileName = "paperjs_example.svg"
   }

   var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));

   var link = document.createElement("a");
   link.download = fileName;
   link.href = url;
   link.click();
}

function onKeyDown(event) {
 if(event.character == "P") {
           downloadAsSVG(spiroName);
       }   
}

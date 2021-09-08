objects = [];
status = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectname = document.getElementById("item");
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
  
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,480,380)
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects"+ objects.length;
            
            fill("#FF5555");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+"" + percent+ "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF5555");
            rect(objects[i].x,objects[i].y, objects[i].height) ;
        }
        if( objectname = objects){
           document.getElementById("number_of_objects").innerHTML = "object Detected";
        }
    }
    
}
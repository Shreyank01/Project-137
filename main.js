function setup() {
    canvas = createCanvas(450,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(450,350);
}

function start() {
    objectDetector =  ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Object : Detecting video...";
    input_text = document.getElementById("input_box").value;
 }

 status = "";
 object = [];
 input_text = ""

 function modelLoaded() {
    console.log("Model Loaded!");
   status = true;
}

function draw() {
    image(video,0,0,450,350);
    if(status != "") {
        objectDetector.detect(video ,gotResult);

        for(i=0; i < object.length; i++ ) {
            document.getElementById("status").innerHTML = "Status : Objects Detected!";
            
            percent = floor(object[i].confidence * 100);
            fill("red");
            text(object[i].label + " " + percent  + "%", object[i].x , object[i].y );
            noFill();
            stroke("red");
            rect(object[i].x , object[i].y , object[i].width , object[i].height);

            if(object[i].label == input_text){
                video.stop();
                document.getElementById("object_found").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }  

        }
    }
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

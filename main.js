//let's go! WHEREEEEEEE

video = "";
status1 = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function gotResults(results, error) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        console.log(objects.length);
        for (i = 0; i < objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            fill("#ffff00");
            percentage = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ffff00");
            rect (objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

}



//NOW COMES THE GREATEST PART..

function modelLoaded() {
    console.log("模型已加載成功！享受吧，伙計們！哈哈哈……");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
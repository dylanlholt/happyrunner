// Adapted from ml5.js: Pose Estimation with PoseNet
// Originally Posted by: The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;
let outputData = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

const posesToCapture = [
    ['halfSquat-start', 'halfSquat-end'],
    ['standQuadStretch-start','standQuadStretch-end'],
    ['hamstringCurl-start', 'hamstringCurl-end']
]

// Starts Data Collection Process
function keyPressed() {
    console.log('Starting Collection');
    let set = 10;
    let interval = 0;
    let threshold = 3;
    let poseIndex = 0;
    let timer = setInterval(()=>{
        interval++
        console.log("Interval", interval)
        if(interval == threshold){
            console.log("Got Data!", posesToCapture[0][poseIndex])
            createData(posesToCapture[0][poseIndex]);
            interval = 0;
            set--;
            console.log("You're on Set #", set);
            poseIndex == 1 ? poseIndex = 0 : poseIndex = 1
        }
        if(set==0){
            console.log("Done!");
            clearInterval(timer);
        }
    }, 1000);
}

function createData(poseID) {
    let newData = {
        poseID: poseID,
        imageID: "Need Image",
        pose: pose
    }
    outputData.push(newData)
    console.log(outputData)
}

// function draw() {
//   image(video, 0, 0);

//   if (pose) {
//     // let eyeR = pose.rightEye;
//     // let eyeL = pose.leftEye;
//     // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
//     // fill(255, 0, 0);
//     // ellipse(pose.nose.x, pose.nose.y, d);
//     // fill(0, 0, 255);
//     // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
//     // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       fill(0, 255, 0);
//       ellipse(x, y, 16, 16);
//     }

//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       strokeWeight(2);
//       stroke(255);
//       line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }

//   }
// }
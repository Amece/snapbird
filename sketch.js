// Get the div details
const video = document.getElementById("video");
let accuracy = 0;

// Create the video segment
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

// Make a loop
const loop = classifier => {
  classifier.classify().then(results => {
    document.getElementById("result").innerHTML = results[0].label;
    accuracy = results[0].confidence * 100;
    document.getElementById("accuracy").innerHTML = accuracy.toFixed(2);
    loop(classifier);
  });
};

ml5.imageClassifier('./models/model.json', video).then(classifier => loop(classifier));
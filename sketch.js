// Get the div details
const video = document.getElementById("video");

// Create the video segment
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

// Make a loop
const loop = classifier => {
  classifier.classify().then(results => {
    document.getElementById("result").innerHTML = results[0].label;
    document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2);
    loop(classifier);
  });
};

ml5.imageClassifier('./models/model.json', video).then(classifier => loop(classifier));
//click to start the song
let song, analyzer;
var fft, peakDetect;
function setup() {
  song = loadSound("black_coffee_short.mp3");
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB, 360, 100, 100, 100);

  //create amplitude analyzer
  analyzer = new p5.Amplitude();

  //patch the input to a volume analyzer
  analyzer.setInput(song);

  // p5.PeakDetect requires a p5.FFT
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

function draw() {
  let rms = analyzer.getLevel();
  if (song.isPlaying()) {
    if (frameCount % 5 === 0) {
      // you’ll use === for equality
      fill(0, 0, 0, 5); //5% alpha, black
      rect(0, 0, width, height);
    }
    var xPos = random(0, width); //create a variable to store random position
    var yPos = random(0, height);
    var hue = map(xPos, 0, width, 100, 200); //map hue to position using some //limited range of colors – full hue    range is 0-360 – here limit to 100    range
    hue = (hue + frameCount) % 360; //changing hue value incrementing w/frameCount – use modulus to keep in range 0,360

    //var bright = brightness(hue);
    //var w = map(bright, 0, 255, 500, 1000);

    //peakDetect accepts an fft post-analysis
    fft.analyze();
    peakDetect.update(fft);

    if (peakDetect.currentValue >= 0.14) {
      //print("Peak DETECTED");
      for (var i = 1; i <= 20; i = i + 1) {
        //brightness(hue)*1.5;
        fill(hue, random(50, 100), random(50, 100), random(30, 100));
        stroke(hue, random(50, 100), random(50, 100), random(30, 100));
        ellipse(xPos, yPos, 15 + rms * 500, 10 + rms * 400);
      }
    } else if (
      peakDetect.currentValue >= 0.06 &&
      peakDetect.currentValue <= 0.08
    ) {
      //print("bass DETECTED");
      for (var i = 1; i <= 10; i = i + 1) {
        fill(hue, random(50, 100), random(20, 80), random(30, 100));
        stroke(hue, random(50, 100), random(20, 80), random(30, 100));
        ellipse(xPos, yPos, 10 + rms * 400, 15 + rms * 500);
      }
    } 
    else{
      fill(hue, random(50, 100), random(20, 80), random(30, 100));
      stroke(hue, random(50, 100), random(20, 80), random(30, 100));
      ellipse(xPos, yPos, 8 + rms * 350, 8 + rms * 350);
      
    }
  }
}

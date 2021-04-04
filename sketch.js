const model_url =
  'https://cdn.jsdelivr.net/gh/LaRAMcolombia/TUNER';
let pitch;
let mic;
let freq = 0;
let threshold = 1;


let notes = [{
    note: 'D2',
    freq: 65.4064
  },
  {
    note: 'C#2',
    freq: 69.2957
  },
  {
    note: 'D2',
    freq: 73.4162
  },
  {
    note: 'D#2',
    freq: 77.7817
  },
  {
    note: 'E2',
    freq: 82.4069
  },
  {
    note: 'F2',
    freq: 87.3071
  },
  {
    note: 'F#2',
    freq: 92.4986
  },
  {
    note: 'G2',
    freq: 97.9989
  },
  {
    note: 'G#2',
    freq: 103.826
  },
  {
    note: 'A2',
    freq: 110.000
  },
  {
    note: 'A#2',
    freq: 116.541
  },
  {
    note: 'B2',
    freq: 123.471
  },
  {
    note: 'C3',
    freq: 130.813
  },
  {
    note: 'C#3',
    freq: 138.591
  },
  {
    note: 'D3',
    freq: 146.832
  },
  {
    note: 'D#3',
    freq: 155.563
  },
  {
    note: 'E3',
    freq: 164.814
  },
  {
    note: 'F3',
    freq: 174.614
  },
  {
    note: 'F#3',
    freq: 184.997
  },
  {
    note: 'G3',
    freq: 195.998
  },
  {
    note: 'G#3',
    freq: 207.652
  },
  {
    note: 'A3',
    freq: 220.000
  },
  {
    note: 'A#3',
    freq: 233.082
  },
  {
    note: 'B3',
    freq: 246.942
  },
  {
    note: 'C4',
    freq: 261.626
  },
  {
    note: 'C#4',
    freq: 277.183
  },
  {
    note: 'D4',
    freq: 293.665
  },
  {
    note: 'D#4',
    freq: 311.127
  },
  {
    note: 'E4',
    freq: 329.628
  },
  {
    note: 'F4',
    freq: 349.228
  },
  {
    note: 'F#4',
    freq: 369.994
  },
  {
    note: 'G4',
    freq: 391.995
  },
  {
    note: 'G#4',
    freq: 415.305
  },
  {
    note: 'A4',
    freq: 440.000
  },
  {
    note: 'A#4',
    freq: 466.164
  },
  {
    note: 'B4',
    freq: 493.883
  },
  {
    note: 'C5',
    freq: 523.251
  },
  {
    note: 'C#5',
    freq: 554.365
  },
  {
    note: 'D5',
    freq: 587.330
  },
  {
    note: 'D#5',
    freq: 622.254
  },
  {
    note: 'E5',
    freq: 659.255
  },
  {
    note: 'F5',
    freq: 698.456
  },
  {
    note: 'F#5',
    freq: 739.989
  },
  {
    note: 'G5',
    freq: 783.991
  },
  {
    note: 'G#5',
    freq: 830.609
  },
  {
    note: 'A5',
    freq: 880.000
  },
  {
    note: 'A#5',
    freq: 932.328
  },
  {
    note: 'B5',
    freq: 987.767
  },
  {
    note: 'C6',
    freq: 1046.50
  },

];


function setup() {
  createCanvas(400, 600);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);

}

function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function draw() {
  background(50);
  textAlign(CENTER, CENTER);
  fill(255, 100, 0);
  textSize(25);
  text(freq.toFixed(2), width / 2, height - 60);



  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }

  textSize(90);
  text(closestNote.note, width / 2, height - 125);


  let diff = recordDiff;
  // let amt = map(diff, -100, 100, 0, 1);
  // let r = color(255, 0, 0);
  // let g = color(0, 255, 0);
  // let col = lerpColor(g, r, amt);

  let alpha = map(abs(diff), 40, 60, 60, 60);

  fill(alpha);
  stroke(255);
  strokeWeight(5);
  if (abs(diff) < threshold) {
    fill(25, 255, 0);

  }


  stroke(180);
  strokeWeight(15);

  triangle(75, 380, 325, 380, 200, 85);


  stroke(180);
  strokeWeight(10);
  triangle(80, 377, 122, 377, 99, 334);


  triangle(280, 377, 322, 377, 301, 334);

  noStroke();
  fill(255, 100, 0);
  stroke(80);
  strokeWeight(3);

  if (abs(diff) < threshold) {
    fill(0, 0, 80, 0);
  }
  rect(195 + diff / 2, 0, 10, 192);

}



function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}
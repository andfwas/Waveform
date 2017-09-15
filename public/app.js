var sin = document.getElementById('sin')
var square = document.getElementById('square')
var saw = document.getElementById('saw')
var triangle = document.getElementById('triangle')

var waveIds = ['sin', 'square', 'saw', 'triangle']

var myCanvas
var frequencyLabel
var volumeLabel

var myAudioContext
var oscillator
var gainNode

//Notes
var lowNote = 20.0
var highNote = 6000.0

var oscillatorType = 'sine'

sin.addEventListener('click', function() {
  oscillatorType = 'sine';

})
square.addEventListener('click', function() {
  oscillatorType = 'square';

})
saw.addEventListener('click', function() {
  oscillatorType = 'sawtooth';

})
triangle.addEventListener('click', function() {
  oscillatorType = 'triangle';

})


var SynthPad = (function() {
  //Variables


  //Constructor
  var SynthPad = function() {
    myCanvas = document.getElementById('synth-pad')
    frequencyLabel = document.getElementById('frequency')
    volumeLabel = document.getElementById('volume')

    // Create an audio context.
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    myAudioContext = new window.AudioContext()

    SynthPad.setupEventListeners()
  }

  // Event Listeners
  SynthPad.setupEventListeners = function() {

      // Disables scrolling on touch devices.
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault()
    }, false)

    myCanvas.addEventListener('mousedown', SynthPad.playSound)
    myCanvas.addEventListener('touchstart', SynthPad.playSound)

    myCanvas.addEventListener('mouseup', SynthPad.stopSound)
    document.addEventListener('mouseleave', SynthPad.stopSound)
    myCanvas.addEventListener('touchend', SynthPad.stopSound)

  }


  // Play a note.
  SynthPad.playSound = function(event) {
    oscillator = myAudioContext.createOscillator()
    gainNode = myAudioContext.createGain()

    oscillator.type = oscillatorType
    console.log(oscillatorType)


    gainNode.connect(myAudioContext.destination)
    oscillator.connect(gainNode)

    SynthPad.updateFrequency(event)

    oscillator.start(0)

    myCanvas.addEventListener('mousemove', SynthPad.updateFrequency)
    myCanvas.addEventListener('touchmove', SynthPad.updateFrequency)

    myCanvas.addEventListener('mouseout', SynthPad.stopSound)

  }


  // Stop the audio.
  SynthPad.stopSound = function(event) {
    oscillator.stop(0)

    myCanvas.removeEventListener('mousemove', SynthPad.updateFrequency)
    myCanvas.removeEventListener('touchmove', SynthPad.updateFrequency)
    myCanvas.removeEventListener('mouseout', SynthPad.stopSound)
  }


  // Calculate the note frequency.
  SynthPad.calculateNote = function(posX) {
    var noteDifference = highNote - lowNote
    var noteOffset = (noteDifference / myCanvas.offsetWidth) * (posX - myCanvas.offsetLeft)
    return lowNote + noteOffset
  }


  // Calculate the volume.
  SynthPad.calculateVolume = function(posY) {
    var volumeLevel = 1 - (((100 / myCanvas.offsetHeight) * (posY - myCanvas.offsetTop)) / 100)
    return volumeLevel
  }


  // Fetch the new frequency and volume.
  SynthPad.calculateFrequency = function(x, y) {
    var noteValue = SynthPad.calculateNote(x)
    var volumeValue = SynthPad.calculateVolume(y)

    oscillator.frequency.value = noteValue
    gainNode.gain.value = volumeValue

    frequencyLabel.innerHTML = 'Frequency ' + Math.floor(noteValue) + ' Hz'
    volumeLabel.innerHTML = 'Volume ' + Math.floor(volumeValue * 100) + '%'
  }


  // Update the note frequency.
  SynthPad.updateFrequency = function(event) {
    if (event.type == 'mousedown' || event.type == 'mousemove') {
      SynthPad.calculateFrequency(event.x, event.y)
    } else if (event.type == 'touchstart' || event.type == 'touchmove') {
      var touch = event.touches[0]
      SynthPad.calculateFrequency(touch.pageX, touch.pageY)
    }
  }


  // Export SynthPad.
  return SynthPad
})()


window.onload = function() {
  var synthPad = new SynthPad()
}

function moveWaveId(arr, oldIndex, newIndex) {
  while (oldIndex < 0) {
    oldIndex += arr.length;
  }
  while (newIndex < 0) {
    newIndex += arr.length
  }
  if (newIndex >= arr.length) {
    var k = newIndex - arr.length
    while ((k--) + 1) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
}


function getWave() {
  var button = document.getElementsByClassName('button')
  for (var i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function(event) {
      var el = event.target.attributes.id.nodeValue
      for (var j = 0; j < waveIds.length; j++) {
        if (el === waveIds[j]) {
          moveWaveId(waveIds, j, 0)
          activeWave()
        }
      }
    })
  }
}

function getQuote() {
  var button = document.getElementsByClassName('button')
  for (var i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function(event) {
      var el = document.getElementById('credit')
      var ell = document.getElementById('deckCard')
      var elll = document.getElementById('strategy')
      el.innerHTML = 'Oblique Strategies By Brian Eno & Peter Schmidt'
      fetch('https://galvanize-cors-proxy.herokuapp.com/http://brianeno.needsyourhelp.org/draw')
      .then(function(response) {
        return response.json()
        .then(function(oblique) {
          ell.innerHTML = 'Deck # ' + oblique.edition + ' - ' + 'Card# ' +  oblique.cardnumber
          elll.innerHTML = oblique.strategy
        })
      })
    })
  }
}


activeWave = function() {
  for (var i = 0; i < waveIds.length; i++) {
    if (i !== 0) {
      el = waveIds[i]
      el = eval(el)
    } else {
      el = waveIds[i]
      el = eval(el)
      var synthBg = document.getElementById('synth-pad')
      if (el == sin) {
        synthBg.style.backgroundImage = "url('sinGrey.png')"
      } else if (el == square) {
        synthBg.style.backgroundImage = "url('squareGrey.png')"
      } else if (el == saw) {
        synthBg.style.backgroundImage = "url('sawGrey.png')"
      } else {
        synthBg.style.backgroundImage = "url('triangleGrey.png')"
      }
    }
  }
}

getWave()
getQuote()

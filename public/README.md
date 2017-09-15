# Waveform

## A Web-based Synth Pad For Everyone

## Description
The app is intended to allow everyone to enjoy the satisfaction of creating and manipulating monophonic 

## Who has this problem?
- People without synthesizers
- People who aren't experts in sound synthesis or wave visualization
- People without synthesizer software or hardware

## How will your project solve this problem?
Eliminate the need for a hardware or software synthesizers or visualizers

## What inputs does it need?
- Click
- Drag
- Touch

## What web API(s) will it use?
- [Web Audio API](http://blog.teamtreehouse.com/building-a-synthesizer-with-the-web-audio-api)
- [Oblique Strategies](http://brianeno.needsyourhelp.org/)

## What technologies do you plan to use?
- HTML
- CSS
- Bulma
- Javascript
- Firebase

## Feature list
- Produce tones with a waveform generator
- Click or touch a region on the synth pad to produce various sounds
- Change the type of sound to play
  - Select a waveform for generation
- Display a creative strategy on the bottom of the page each time a new waveform is selected

## Upcoming Features
- Frequency range sliders
  - Low frequency limit
  - High frequency limit
  - Low frequency setting cannot be higher than high frequency limit & vice versa
- Waveform select buttons will stay lit and turn off when another waveform is selected
  - This will eliminate the need for the pad background to display the current waveform
    - PadInstructions.png can remain 100% of the time
- Pad images
  - Create PadInstructions.png so that the dark grey fades into a lighter grey simulating wear and tear
- Make all h-tag innerHTML in the main html file appear to be coming from a backlit led display
  - Monochromatic or multi-color?

## Upcoming Modifications
- Margins:
  - Space between waveform select buttons and blue glowing gradient in header should be slightly larger
  - Space between "credit" and "deckCard" tags should be larger
  - Space between "credit" and "strategy" tags should be smaller
    - For the above 2 items, make them the opposite of what they are now

## Upcoming Fixes
- stopSound
  - Sometimes stopSound doesn't work & page needs to be refreshed
- Separate functions more effectively
  - Bugs that come from unnecessarily interwoven functionality
    - Fetch from remote servers vs. local processes should be separated
  - Separate js app files if necessary

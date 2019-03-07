# Scope

## Definitions

* Atomic unit is shot (image) of single DOM element in certain state

## Algorithm

* Iterate over user-defined snippets of code
  * Run snippet to obtain shot
  * Store image
  * Store comparison result (image) if there is a reference image

## UI

* Display shots
* Allow to select certain shot as reference image
* Allow to comment any shot
* Allow to resolve any comment

## Data

* shots `${root}/shots/${name}/${new Date().getTime()}.png`
* reference shots `${root}/shots/${name}/reference.png`
* comments, acceptance date, etc `${root}/shots/${name}/metadata.json`

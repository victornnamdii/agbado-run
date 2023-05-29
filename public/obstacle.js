import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperties.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const world = document.querySelector('[data-world]')

let nextObstacleTime
export function setUpObstacle() {
  nextObstacleTime = OBSTACLE_INTERVAL_MIN
  document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
    obstacle.remove()
  })
}

export function animateObstacle(elapsed, speedLevel) {
  document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
    incrementCustomProperty(obstacle, '--left', elapsed * speedLevel * SPEED * -1)
    
    if (getCustomProperty(obstacle, '--left') <= -100) {
      obstacle.remove()
    }
  })

  if (nextObstacleTime <= 0) {
    createObstacle()
    nextObstacleTime = random(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedLevel
  }
  nextObstacleTime -= elapsed
}

export function getObstaclePosition() {
  return [...document.querySelectorAll('[data-obstacle]')].map(obstacle => {
    return obstacle.getBoundingClientRect()
  })
}

function createObstacle() {
  const obstacle = document.createElement('img')
  obstacle.dataset.obstacle = true
  obstacle.src = '/src_images/corn.png'
  obstacle.classList.add('obstacle')
  setCustomProperty(obstacle, '--left', 100)
  world.append(obstacle)
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

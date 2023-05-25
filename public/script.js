import { animateGround, setUp } from './ground.js';
import { animateRunner, getRunnerPosition, setRunnerLoss, setUpRunner } from './runner.js';
import { animateObstacle, getObstaclePosition, setUpObstacle } from './obstacle.js';

const HEIGHT = 30
const WIDTH = 100
const SPEED_INCREMENT = 0.00001

const world = document.querySelector('[data-world]')
const scoreBoard = document.querySelector('[data-score]')
const startText = document.querySelector('[data-start-screen]')

if (navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)) {
  startText.textContent = 'Swipe to start'
  document.addEventListener('touchmove', start, { once: true })
} else {
  document.addEventListener('keydown', start, { once: true })
}

setScale()
window.addEventListener('resize', setScale)

let prevTime
let speedLevel
let score
function update(time) {
  if (prevTime === null) {
    prevTime = time
    window.requestAnimationFrame(update)
    return
  }
  const elapsed = time - prevTime

  animateGround(elapsed, speedLevel)
  animateRunner(elapsed, speedLevel)
  animateObstacle(elapsed, speedLevel)
  updateSpeedLevel(elapsed)
  updateScore(elapsed)

  if (lossChecker()) return gameOver()

  prevTime = time
  window.requestAnimationFrame(update)
}

function lossChecker() {
  const runnerPosition = getRunnerPosition()
  return getObstaclePosition().some(position => isCollision(position, runnerPosition))
}

function isCollision(obstaclePosition, runnerPosition) {
  return (
    obstaclePosition.left < runnerPosition.right &&
    obstaclePosition.top < runnerPosition.bottom &&
    obstaclePosition.right > runnerPosition.left &&
    obstaclePosition.bottom > runnerPosition.top
  )
}

function updateSpeedLevel(elapsed) {
  speedLevel += elapsed * SPEED_INCREMENT
}

function updateScore(elapsed) {
  score += elapsed * 0.01
  scoreBoard.textContent = Math.floor(score)
}

function start() {
  prevTime = null
  speedLevel = 1
  score = 0
  setUp()
  setUpRunner()
  setUpObstacle()
  startText.classList.add('hide')
  window.requestAnimationFrame(update)
}

function gameOver() {
  setRunnerLoss()
  setTimeout(() => {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      document.addEventListener('touchmove', start, { once: true })
    } else {
      document.addEventListener('keydown', start, { once: true })
    }
    startText.textContent = `Game Over. Your score: ${scoreBoard.textContent}`
    startText.classList.remove('hide')
  }, 100)
}

function setScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WIDTH / HEIGHT) {
    worldToPixelScale = window.innerWidth / WIDTH
  } else {
    worldToPixelScale = window.innerHeight / HEIGHT
  }

  world.style.height = `${HEIGHT * worldToPixelScale}px`
  world.style.width = `${WIDTH * worldToPixelScale}px`
}

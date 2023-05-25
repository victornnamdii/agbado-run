import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperties.js"

const runnerElement = document.querySelector('[data-runner]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const RUNNER_FRAME_COUNT = 2
const FRAME_TIME = 200

let isJumping
let currentFrameTime
let runnerFrame
let yVelocity
export function setUpRunner() {
  isJumping = false
  currentFrameTime = 0
  runnerFrame = 0
  yVelocity = 0
  setCustomProperty(runnerElement, '--bottom', 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function animateRunner(elapsed, speedLevel) {
  run(elapsed, speedLevel)
  jumpHandler(elapsed)
}

export function getRunnerPosition() {
  return runnerElement.getBoundingClientRect()
}

export function setRunnerLoss() {
  runnerElement.src = '/src_images/flag-lose.png'
}

function run(elapsed, speedLevel) {
  if (isJumping) {
    runnerElement.src = `/src_images/flag-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    runnerFrame = (runnerFrame + 1) % RUNNER_FRAME_COUNT
    runnerElement.src = `/src_images/flag-run-${runnerFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += elapsed * speedLevel
}

function jumpHandler(elapsed) {
  if (!isJumping) return

  incrementCustomProperty(runnerElement, '--bottom', yVelocity * elapsed)

  if (getCustomProperty(runnerElement, '--bottom') <= 0) {
    setCustomProperty(runnerElement, '--bottom', 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * elapsed
}

function onJump(event) {
  if (event.code !== 'Space' || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}

import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperties.js"

const groundElements = document.querySelectorAll('[data-ground]')
const SPEED = 0.05

export function setUp() {
  setCustomProperty(groundElements[0], '--left', 0)
  setCustomProperty(groundElements[1], '--left', 300)
}

export function animateGround(elapsed, updatedSpeed) {
  groundElements.forEach(ground => {
    incrementCustomProperty(ground, '--left', elapsed * updatedSpeed * SPEED * -1)

    if (getCustomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600)
    }
  })
}

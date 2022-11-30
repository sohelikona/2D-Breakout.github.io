const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 1170
const boardHeight = 850
let timerId
let xDirection = -5
let yDirection = 5
let score = 0


const userStart =  [230, 10]
let currentPositon = userStart

const ballStart = [270, 40]
let ballCurrentPositon = ballStart


// Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}


// All my Block
const blocks = [
  new Block(30, 800),
  new Block(170, 800),
  new Block(310, 800),
  new Block(450, 800),
  new Block(590, 800),
  new Block(730, 800),
  new Block(870, 800),
  new Block(1010, 800),
  
  
  new Block(30, 755),
  new Block(170, 755),
  new Block(310, 755),
  new Block(450, 755),
  new Block(590, 755),
  new Block(730, 755),
  new Block(870, 755),
  new Block(1010, 755),

  
  new Block(30, 710),
  new Block(170, 710),
  new Block(310, 710),
  new Block(450, 710),
  new Block(590, 710),
  new Block(730, 710),
  new Block(870, 710),
  new Block(1010, 710),


  new Block(30, 665),
  new Block(170, 665),
  new Block(310, 665),
  new Block(450, 665),
  new Block(590, 665),
  new Block(730, 665),
  new Block(870, 665),
  new Block(1010, 665),


  new Block(30, 620),
  new Block(170, 620),
  new Block(310, 620),
  new Block(450, 620),
  new Block(590, 620),
  new Block(730, 620),
  new Block(870, 620),
  new Block(1010, 620),


  new Block(30, 575),
  new Block(170, 575),
  new Block(310, 575),
  new Block(450, 575),
  new Block(590, 575),
  new Block(730, 575),
  new Block(870, 575),
  new Block(1010, 575),


  new Block(30, 530),
  new Block(170, 530),
  new Block(310, 530),
  new Block(450, 530),
  new Block(590, 530),
  new Block(730, 530),
  new Block(870, 530),
  new Block(1010, 530),


  new Block(30, 485),
  new Block(170, 485),
  new Block(310, 485),
  new Block(450, 485),
  new Block(590, 485),
  new Block(730, 485),
  new Block(870, 485),
  new Block(1010, 485),


  new Block(30, 440),
  new Block(170, 440),
  new Block(310, 440),
  new Block(450, 440),
  new Block(590, 440),
  new Block(730, 440),
  new Block(870, 440),
  new Block(1010, 440),


  new Block(30, 395),
  new Block(170, 395),
  new Block(310, 395),
  new Block(450, 395),
  new Block(590, 395),
  new Block(730, 395),
  new Block(870, 395),
  new Block(1010, 395),


  new Block(30, 350),
  new Block(170, 350),
  new Block(310, 350),
  new Block(450, 350),
  new Block(590, 350),
  new Block(730, 350),
  new Block(870, 350),
  new Block(1010, 350),
]






// Draw all my Block
function addBlocks() {

  for (let i = 0; i < blocks.length; i++) {
  const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0] + 'px'
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  grid.appendChild(block)
  }
}

addBlocks()

// Add User
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


// Draw the User
function drawUser() {
  user.style.left = currentPositon[0] + 'px'
  user.style.bottom = currentPositon[1] + 'px'
}


// Draw the ball

function drawBall() {
  ball.style.left = ballCurrentPositon[0] + 'px'
  ball.style.bottom = ballCurrentPositon[1] + 'px'
}



// Move User

function moveUser(e) {
  switch(e.key) {
    case 'ArrowLeft':
    if (currentPositon[0] > 0) {
      currentPositon[0] -=50
      drawUser()
    }
      break;

      case 'ArrowRight':
        if (currentPositon[0] < 925) {
          currentPositon[0] += 50
           drawUser()
        }        
        break;
  }
}


document.addEventListener('keydown', moveUser)

// Add Ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


// Move the Ball
function moveBall() {
  ballCurrentPositon[0] += xDirection
  ballCurrentPositon[1] += yDirection
  drawBall()
  checkForCollisitions()
}

timerId = setInterval(moveBall, 3)

// Check for collisions

function checkForCollisitions() {
  // Check for block collisions
  for (let i = 0; i < blocks.length; i++) {
   if (
     (ballCurrentPositon[0] > blocks[i].bottomLeft[0] && ballCurrentPositon[0] < blocks[i].bottomRight[0]) &&
    ((ballCurrentPositon[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPositon[1] < blocks[i].topLeft[1])
    ) {
     const allBlocks = Array.from(document.querySelectorAll('.block'))
     allBlocks[i].classList.remove('block')
     blocks.splice(i, 1)
     changeDirection()
      score++
      scoreDisplay.innerHTML = score

      // Check for Win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'YOU WIN'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }

  }
}




  // Check for wall collisions
  if (
    ballCurrentPositon[0] >= (boardWidth - ballDiameter) || 
    ballCurrentPositon[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPositon[0] <= 0
    ) {
    changeDirection()
  }







  // Check for user collisions
if (
  (ballCurrentPositon[0] > currentPositon[0] && ballCurrentPositon[0] < currentPositon[0] + blockWidth) && 
  (ballCurrentPositon[1] > currentPositon[1] && ballCurrentPositon[1] < currentPositon[1] + blockHeight) 
  
) {
  changeDirection()
}





  // Check for Game Over
  if (ballCurrentPositon[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', moveUser)
  }
}




function changeDirection() {
  if (xDirection === 5 && yDirection === 5) {
    yDirection = -5
    return
  }
  if (xDirection === 5 && yDirection === -5) {
    xDirection = -5
    return
  }
  if (xDirection === -5 && yDirection === -5) {
    yDirection = 5
    return
  }
  if (xDirection === -5 && yDirection === 5) {
    xDirection = 5
    return
  }
}






































//  02:21
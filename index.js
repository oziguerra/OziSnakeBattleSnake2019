const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const up = 0
const down = 1
const left = 2
const right = 3
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 8082))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---
var lastMoveDir = 0
var firstMoveDone = false
var boardWidth
var boardHeight
var sequenceMoveSelector = 0
var xHeadPos
  var yHeadPos
  var pastxHeadPos
  var pastyHeadPos
  var generalHeadPosition
  //console.log(request.body.you.body)
  var randomMovementChoice = Math.floor(Math.random() * 4) //numbers from 0 to 3
  var body
  var obstacle = [false, false, false, false] //obstacle up down left right, in order
  // 0 == up, 1 == down, 2 == left, 3 == right
  var movesChar = ['up', 'down', 'left', 'right']
  var circleSequenceRight = ['up', 'right', 'down', 'left']
  var circleSequenceLeft = ['up', 'left', 'down', 'right']
function start(request){
	
	console.log('starting')
	console.log(JSON.stringify(request.body.you))
	//console.log(JSON.stringify(request.body.board.snakes))
}
/*
for (var i = 0; i < (request.body.board.snakes.length); i++){
	console.log(JSON.stringify(request.body.board.snakes[i]))
}*/

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  start(request)
  // Response data
  const data = {
    color: '#DFFF00',
	"headType": "silly",
	"tailType": "pixel"
  }
  
  firstMoveDone = false
  boardWidth = request.body.board.width
  boardHeight = request.body.board.height
  
  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  //console.log(JSON.stringify(request.body))
  //position of head of snake
  xHeadPos = request.body.you.body[0].x
  yHeadPos = request.body.you.body[0].y
  generalHeadPosition = request.body.you.body
  //console.log(request.body.you.body)
  randomMovementChoice = Math.floor(Math.random() * 4) //numbers from 0 to 3
  body = request.body.you.body
  obstacle = [false, false, false, false] //obstacle up down left right, in order
  // 0 == up, 1 == down, 2 == left, 3 == right
  movesChar = ['up', 'down', 'left', 'right']
  circleSequenceRight = ['up', 'right', 'down', 'left']
  circleSequenceLeft = ['up', 'left', 'down', 'right']
  
  function checkObstacle(direction, request)
  {
	  
  }
  
   // 0 == up, 1 == down, 2 == left, 3 == right
  function improvedMovement(request)
  {
	  
	  
	  //avoid wall: check board limits, get snake direction
	  //rightmost postition of the board
	 if(xHeadPos == boardWidth - 1)
	{
		console.log('rightmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going up')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going up or go left maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going down or go left maybe
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			
			break;
			
			case right:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going right')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going right')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
		}
	}
	
	//leftmost position
	if(xHeadPos == 0)
	{
		console.log('leftmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going up')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going up or go right maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going down or go right maybe
				//randomMovementChoice = Math.floor((Math.random()*2)+1)
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going left')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going left')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			
			break;
		}
	}
	
	//bottom of the board
	if(yHeadPos == boardHeight - 1)
	{
		console.log('bottom')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			
			break;
			
			case down:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	
	//top of the board
	if(yHeadPos == 0)
	{
		console.log('top of board')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case down:
			
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	  
	  
	  //avoid own body
	  for(var i = 0; i < request.body.you.body.length; i++)
	  {
		  
	  }
	  //avoid other snake
	  
	  //find food
	  
	  
	  //random movement, first time it comes here, after: only if no above conditions 
	  console.log('random move chosen: ' + movesChar[randomMovementChoice])
	  switch(randomMovementChoice)
	  {
		  case up:
		  if(lastMoveDir == down)
		  {
			  //keep going same dir, after checking for walls, own body, other bodies
		  }
		  else
		  {
			console.log('up')
			lastMoveDir = up
			return 'up'
		  }
		  break;
		  
		  case down:
		  if(lastMoveDir == up)
		  {
			  //keep going same dir, after checking for walls, own body, other bodies
		  }
		  else
		  {
			console.log('down')
			lastMoveDir = down
			return 'down'
		  }
		  break;
		  
		  case left:
		  if(lastMoveDir == right)
		  {
			  //keep going same dir, after checking for walls, own body, other bodies
		  }
		  else
		  {
			console.log('left')
			lastMoveDir = left
			return 'left'
		  }
		  break;
		  
		  case right:
		  if(lastMoveDir == left)
		  {
			  //keep going same dir, after checking for walls, own body, other bodies
		  }
		  else
		  {
			console.log('right')
			lastMoveDir = right
			return 'right'
		  }
		  break;
		  
		  default:
			return movesChar[lastMoveDir]
		  break;
	  }
  }
  
  function randomMove(request)
  {
	  console.log('yab0i')
	  //console.log(request.body.you.body[0].x)
	  console.log('entering switch with: ' + randomMovementChoice)
	  console.log('last movement direction was ' + lastMoveDir)
	  //check if direction snake wants to go has own body or not
	  //rightmost position
		if(xHeadPos == boardWidth - 1)
		{
		console.log('rightmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going up')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going up or go left maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going down or go left maybe
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			
			break;
			
			case right:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going right')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going right')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
		}
	}
	
	//leftmost position
	if(xHeadPos == 0)
	{
		console.log('leftmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going up')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going up or go right maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going down or go right maybe
				//randomMovementChoice = Math.floor((Math.random()*2)+1)
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going left')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going left')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			
			break;
		}
	}
	
	//bottom of the board
	if(yHeadPos == boardHeight - 1)
	{
		console.log('bottom')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			
			break;
			
			case down:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	
	//top of the board
	if(yHeadPos == 0)
	{
		console.log('top of board')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			
			case up:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case down:
			
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	  //TODO: check if direction snake wants to go is blocked by another snake
	  //check snakes
	  for(var i = 0; i < request.body.board.snakes.length; i++)
	  {
		 //check x
		 for(var xCol = 0; xCol < request.body.board.snakes[i].body.length; xCol++)
		 {
			 //check y
			 for(var xRow = 0; xRow < request.body.board.snakes[i].body.length; xRow++)
			 {
				  //obstacle left
				  if(request.body.board.snakes[i].body[xCol].x == xHeadPos - 1 && request.body.board.snakes[i].body[xRow].y == yHeadPos)
				  {
					  console.log('obstacle found!!!!!!!! ')
					  obstacle[2] = true;
				  }
				  //obstacle up
				  if(request.body.board.snakes[i].body[xCol].x == xHeadPos && request.body.board.snakes[i].body[xRow].y == yHeadPos + 1)
				  {
					  console.log('obstacle found!!!!!!! ')
					  obstacle[0] = true;
				  }
				  //obstacle right
				  if(request.body.board.snakes[i].body[xCol].x == xHeadPos + 1 && request.body.board.snakes[i].body[xRow].y == yHeadPos)
				  {
					  console.log('obstacle found!!!!!! ')
					  obstacle[3] = true;
				  }
				  //obstacle down
				  if(request.body.board.snakes[i].body[xCol].x == xHeadPos && request.body.board.snakes[i].body[xRow].y == yHeadPos - 1)
				  {
					  console.log('obstacle found!!!!! ')
					  obstacle[1] = true;
				  }
			 }
			 
		 }
		  
	  }
	  
	  //check own body

			 for(var i = 0; i < request.body.you.body.length; i++)
			 {
				  //obstacle left
				  if(request.body.you.body[i].x == xHeadPos - 1 && request.body.you.body[i].y == yHeadPos)
				  {
					  console.log('body left')
					  obstacle[2] = true;
				  }
				  //obstacle up
				  if(request.body.you.body[i].x == xHeadPos && request.body.you.body[i].y == yHeadPos + 1)
				  {
					  console.log('body up')
					  obstacle[0] = true;
				  }
				  //obstacle right
				  if(request.body.you.body[i].x == xHeadPos + 1 && request.body.you.body[i].y == yHeadPos)
				  {
					  console.log('body right')
					  obstacle[3] = true;
				  }
				  //obstacle down
				  if(request.body.you.body[i].x == xHeadPos && request.body.you.body[i].y == yHeadPos - 1)
				  {
					  console.log('body down')
					  obstacle[1] = true;
				  }
			 } 
		
		
	  
	  
	  switch(randomMovementChoice){
		  case 1:
			if(lastMoveDir != 2 && obstacle[0] == false)
			{
				lastMoveDir = randomMovementChoice;
				return 'up'
			}
			else
			{
				console.log('invalid move, choosing new one...')
				//random lleft or right movement
				randomMovementChoice = Math.floor(Math.random() * 2) + 3
				console.log(randomMovementChoice + ' chosen')
				if(randomMovementChoice == 3 && obstacle[2] == false)
				{
					lastMoveDir = randomMovementChoice
					return 'left'
				}
				else
				{
					lastMoveDir = randomMovementChoice
					return 'right'
				}
				
			}
		  break;
		  
		  case 2:
			if(lastMoveDir != 1 && obstacle[1] == false)
			{
				lastMoveDir = randomMovementChoice;
				return 'down'
			}
			else
			{
				console.log('invalid move, choosing new one...')
				//random left or right
				randomMovementChoice = Math.floor(Math.random() * 2) + 3
				console.log(randomMovementChoice + ' chosen')
				if(randomMovementChoice == 3 && obstacle[2] == false)
				{
					lastMoveDir = randomMovementChoice
					return 'left'
				}
				else
				{
					lastMoveDir = randomMovementChoice
					return 'right'
				}
				
			}
		  break;
		  
		  case 3:
			if(lastMoveDir != 4 && obstacle[2] == false)
			{
				lastMoveDir = randomMovementChoice;
				return 'left'
			}
			else
			{
				console.log('invalid move, choosing new one...')
				//random up or down movement
				randomMovementChoice = Math.floor(Math.random() * 2) + 1
				console.log(randomMovementChoice + ' chosen')
				if(randomMovementChoice == 1 && obstacle[0] == false)
				{
					lastMoveDir = randomMovementChoice
					return 'up'
				}
				else
				{
					lastMoveDir = randomMovementChoice
					return 'down'
				}
				
			}
		  break;
		  
		  case 4:
			if(lastMoveDir != 3 && obstacle[3] == false)
			{
				lastMoveDir = randomMovementChoice;
				return 'right'
			}
			else
			{
				console.log('invalid move, choosing new one...')
				//random up or down movement
				randomMovementChoice = Math.floor(Math.random() * 2) + 1
				console.log(randomMovementChoice + ' chosen')
				if(randomMovementChoice == 1 && obstacle[0] == false)
				{
					lastMoveDir = randomMovementChoice
					return 'up'
				}
				else
				{
					lastMoveDir = randomMovementChoice
					return 'down'
				}
				
			}
		  break;
		  
	  }
	  lastMoveDir = randomMovementChoice;
	  return 'down'
  }
  
  // 0 == up, 1 == down, 2 == left, 3 == right
  function avoidWall(request)
  {
	  
	 //for debugging purposes, make first movement mandatory somewhere
	 if(!firstMoveDone)
	 {
		 firstMoveDone = true
		 console.log('first move done')
		 lastMoveDir = left
		 return 'left'
	 }
	// TODO: add avoidance of snakes as well when choosing where to go
	//rightmost position
	if(xHeadPos == boardWidth - 1)
	{
		console.log('rightmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going up')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going up or go left maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else
			{
				//random movement, keep going down or go left maybe
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			
			break;
			
			case right:
			if(yHeadPos == 0)
			{
				console.log('top right corner, going right')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom right corner, going right')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
		}
	}
	
	//leftmost position
	if(xHeadPos == 0)
	{
		console.log('leftmost')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going up')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going up or go right maybe
				lastMoveDir = up
				return 'up'
			}
			break;
			
			case down:
			if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			else
			{
				//random movement, keep going down or go right maybe
				//randomMovementChoice = Math.floor((Math.random()*2)+1)
				lastMoveDir = down
				return 'down'
			}
			break;
			
			case left:
			if(yHeadPos == 0)
			{
				console.log('top left corner, going left')
				lastMoveDir = down
				return 'down'
			}
			else if(yHeadPos == boardHeight - 1)
			{
				console.log('bottom left corner, going left')
				lastMoveDir = up
				return 'up'
			}
			//if not in corners, return either up or down to not crash into wall
			else
			{
				console.log('not in ant corners, just shoot up!')
				lastMoveDir = up
				return 'up'
			}
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			
			break;
		}
	}
	
	//bottom of the board
	if(yHeadPos == boardHeight - 1)
	{
		console.log('bottom')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			
			break;
			
			case down:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	
	//top of the board
	if(yHeadPos == 0)
	{
		console.log('top of board')
		//choose a move depending on the direction of the snake
		switch(lastMoveDir)
		{
			case up:
			if(xHeadPos == boardWidth - 1)
			{
				console.log('bottom right corner, going down')
				lastMoveDir = left
				return 'left'
			}
			else if(xHeadPos == 0)
			{
				console.log('bottom left corner, going down')
				lastMoveDir = right
				return 'right'
			}
			//to not crash, go either right or left
			else
			{
				lastMoveDir = right
				return 'right'
			}
			break;
			
			case down:
			
			break;
			
			case left:
			//keep going left or turn up
				lastMoveDir = left
				return 'left'
			//TODO also check if there is another snake in either direction and choose movement depending on that
			break;
			
			case right:
			//keep going right or turn up
				lastMoveDir = right
				return 'right'
			break;
		}
	}
	
	// avoid own body
	//get own body coordinates
	
	
	
  }

function circleForever(request)
{
	sequenceMoveSelector = sequenceMoveSelector + 1
	if(sequenceMoveSelector == 4)
	{
		sequenceMoveSelector = 0;
	}
	console.log(circleSequenceRight[sequenceMoveSelector] + ' : ' + sequenceMoveSelector)
	return circleSequenceRight[sequenceMoveSelector]
}

  // Response data
  const data = {
   //move: randomMove(request), // one of: ['up','down','left','right']
   move: avoidWall(request)
   //move: improvedMovement(request)
   //move: circleForever(request)
  }

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  //console.log(JSON.stringify(request.body))
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})

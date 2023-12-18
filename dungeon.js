const canvas = document.getElementById("game"); //create var for canvas
let canvasContext = canvas.getContext("2d"); // makes the canvas 2d

let widthOfTiles  = 20; // dimension of Tiles

let rows = 30;
let cols = 30;

let grid = []; //stores the Layout

let rooms = []; // stores the Rooms
let collide = false; //Sets Rooms collide false

let amountOfRooms = 7;
let size = 5;
let roomSizeMin = 5

let disX;
let disY;
let corridorWidth = 1;

//--------------------------------------------------------------//

class Cell // cell Object
{
    constructor(col, row, x, y )
    {
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
        this.empty = true;
    }

    
    show()
    {
        if (this.empty)
        {
            canvasContext.fillStyle = "#323232";
            canvasContext.fillRect(this.x, this.y, widthOfTiles, widthOfTiles)
            canvasContext.strokeStyle = "#525252";
            canvasContext.strokeRect(this.x, this.y, widthOfTiles, widthOfTiles)
        } else
        {
            canvasContext.fillStyle = "#696966";
            canvasContext.fillRect(this.x, this.y, widthOfTiles, widthOfTiles)
        }
    };
    

    carveRooms(dis, x, y) //carve out Rooms
    {
        for (let i = 0; i < rooms.length; i++) 
					{
						if(this.col >= rooms[i].y / widthOfTiles && this.col < rooms[i].y / widthOfTiles+rooms[i].h / widthOfTiles && this.row >= rooms[i].x /widthOfTiles && this.row < rooms[i].x/ widthOfTiles +rooms[i].w / widthOfTiles)
							{
								this.empty = false;
							}
					}
    };

    carveH (dis,x,y)//carve out the horizontal corridor
			{
				if(this.row >= x && this.row < x + dis && this.col < y + corridorWidth && this.col > y - corridorWidth)
					{
						this.empty = false;
					}
			}

     carveV(dis, x, y)
    {
        if(this.col >= y && this.col < y + dis && this.row < x + corridorWidth && this.row > x - corridorWidth)
		{
			this.empty = false;
		}
    };
}

function makeGrid() 
{
    for (let r = 0; r < rows; r++)
    {
        for (let c = 0; c < cols; c++)
        {
            let y = r * widthOfTiles;
            let x = c * widthOfTiles;
            let cell = new Cell(c, r, x, y)
            grid.push(cell);
        }

    }
}
//--------------------------------------------------------------//
class Room
{
    constructor (x, y, width, height, i)
    {
        this.x = (x - 1) * widthOfTiles;
        this.y = (y - 1) * widthOfTiles;
        this.w = width * widthOfTiles;
        this.h = height * widthOfTiles;

        this.center = [
            Math.floor(this.x / widthOfTiles + width / 2),
            Math.floor(this.y / widthOfTiles + height / 2)
        ]
    } 

    draw() 
    {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(i, this.x + this.w / 2, this.y+this.h / 2-20)
    }
}
//--------------------------------------------------------------//
class Room
{
    constructor (x, y, width, height, i)
    {
        this.x = (x - 1) * widthOfTiles;
        this.y = (y - 1) * widthOfTiles;
        this.w = width * widthOfTiles;
        this.h = height * widthOfTiles;

        this.center = [
            Math.floor(this.x / widthOfTiles + width / 2),
            Math.floor(this.y / widthOfTiles + height / 2)
        ]
    } 

    draw() 
    {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(i, this.x + this.w / 2, this.y+this.h / 2-20)
    }
}

function createRooms() {
    for (let i = 0; i < amountOfRooms; i++)
    {
     let room = new Room(Math.floor(Math.random() * rows) + 1, Math.floor(Math.random() * cols) + 1, Math.floor(Math.random() * size) + roomSizeMin, Math.floor(Math.random() * size) + roomSizeMin, i)
     rooms.push(room)
    }
}
//--------------------------------------------------------------//

function createRooms()
{
    for (let i = 0; i < amountOfRooms; i++)
    {
        let room = new Room(Math.floor(Math.random() * rows) + 1, Math.floor(Math.random() * cols) + 1, Math.floor(Math.random() * size) + roomSizeMin, Math.floor(Math.random() * size) + roomSizeMin, i) // creats random coordinates in bound
        if (i > 0) //if not the first generated room
        {if (rooms[0].x + rooms[0].w >= canvas.width || rooms[0].x <= 0 || rooms[0].y+rooms[0].h >= canvas.height || rooms[0].y <= 0) //if first room is outside the canvas) 
            
            {
                rooms = [] //restart
                createRooms();
                break;
            }
            for (let e = 0; e < rooms.length; e++)
            {
                collide = false;
                if (room.x <= rooms[e].x + rooms[e].w && room.x + room.w >= rooms[e].x && room.y <= rooms[e].y+rooms[e].h && room.y + room.h >= rooms[e].y) // if rooms collide
                {
                    collide = true; //kill room
                    i--;
                    break;
                }
                else if (room.x + room.w >= canvas.width || room.x <= 0 || room.y + room.h >= canvas.height || room.y <= 0) //if room is out of bounds
                {
                    collide = true; //kill room
                    i--;
                    break;
                }
            }
        }
        if (collide == false)
        {
            rooms.push(room)
            if(i > 0)
            {
                hCorridor(rooms[i-1].center[0], room.center[0], rooms[i-1].center[1], room.center[1])
				vCorridor(rooms[i-1].center[0], room.center[0], rooms[i-1].center[1], room.center[1])
            }
        }
    }
}
//--------------------------------------------------------------//

function hCorridor(x1,x2,y1,y2)//horizontal corridor creator
{
	if(x1 > x2)//if the first room is further towards the right then the second one
	{
		disX = x1-x2 //find the distance between rooms
		disX += 1
			
		for (var i = 0; i < grid.length; i++) 
		{
			grid[i].carveH(disX, x2, y2)//carve out the corridor
		}				
	}
	else//if the second room is further towards the right then the first one
	{
		disX = x2 - x1 //find the distance between rooms
		disX += 1
		for (var i = 0; i < grid.length; i++) 
       	{
			grid[i].carveH(disX, x1, y1)//carve out corridor
		}
	}
			
	}

function vCorridor(x1,x2,y1,y2)//vertical corridor creator
	{
	let x;	
	if(y1 > y2)//if the first room is further towards the bottom then the second one
		{
			disY = y1-y2; //find the distance between rooms
			disY += 1;
			
			if(x2+(disX-1) > x1+(disX-1))//find the correct x coord
				{
					x = x2;
				}
			else 
				{
				x = x2 + (disX - 1);
				}
				
			for(var i = 0; i < grid.length; i++) 
				{
					grid[i].carveV(disY, x, y2);//carve out corridor
				}
			}
	else//if the second room is further towards the bottom then the first one
		{
	    	disY = y2 - y1; //find the distance between rooms
		    disY += 1;
				
			if(x1+(disX-1) > x2+(disX-1))//find the correct x coord
				{
					x = x1;
				}	
			else 
				{
					x = x1 + (disX - 1);
				}
					
			for (var i = 0; i < grid.length; i++) 
				{
					grid[i].carveV(disY, x, y1);//carve out corridor
                }
        }
}
//--------------------------------------------------------------//

function draw()
{
    for (let i = 0; i < grid.length; i++) //draws map
    {
        grid[i].carveRooms(); //carves out rooms
        grid[i].show(); //shows whole map
    }

    for (let i = 0; i < grid.rooms; i++)
    {
        rooms[i].draw(); //draws room numbers
    }
}

makeGrid();
createRooms();
draw();
console.log("x:" + rooms[1].center[0]+ "y:" + rooms[1].center[1])
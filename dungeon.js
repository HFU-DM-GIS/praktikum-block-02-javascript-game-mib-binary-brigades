const canvas = document.getElementById("game"); //create var for canvas
let canvasContext = canvas.getContext("2d"); // makes the canvas 2d

let widthOfTiles  = 20; // dimension of Tiles

let rows = 50;
let cols = 50;

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

     carveH(dis, x, y) //carve out the horizontal corridors
    {
        if (this.row >= y && this.row < y + dis && this.col < corridorWidth && this.col > y - corridorWidth)
        {
            this.empty = false;
        }
    };

     carveV(dis, x, y)
    {
        if (this.col >= y && this.col < y +dis && this.row < x + corridorWidth && this.row > x - corridorWidth)
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

function createRooms() {
    for (let i = 0; i < amountOfRooms; i++)
    {
     let room = new Room(Math.floor(Math.random() * rows) + 1, Math.floor(Math.random() * cols) + 1, Math.floor(Math.random() * size) + roomSizeMin, Math.floor(Math.random() * size) + roomSizeMin, i)
     rooms.push(room)
    }
}
//--------------------------------------------------------------//

function draw()
{
    for (let i = 0; i < grid.length; i++)
    {
        grid[i].carveRooms();
        grid[i].show();
    }

    for (let i = 0; i < grid.rooms; i++)
    {
        rooms[i].draw();
    }
}

makeGrid();
createRooms();
console.log(rooms[1].w)
draw();

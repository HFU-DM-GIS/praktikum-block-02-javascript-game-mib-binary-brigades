const canvas = document.getElementById("game"); //create var for canvas
let canvasContext = canvas.getContext("2d"); // makes the canvas 2d

let widthOfTiles  = 20; // dimension of Tiles

let rows = 50;
let cols = 50;

let grid = []; //stores the Layout

let rooms = []; // stores the Rooms
let collide = false; //Sets Rooms collide false

let amountOfRooms = 7;
let RoomSizeMax = 5;
let RoomSizeMin = 5

let disX;
let disY;
let corridorWidth = 1;

//--------------------------------------------------------------//

function Cell(col, row, x, y )// ohne this// cell Object
{
    this.col = col;
    this.row = row;
    this.x = x;
    this.y = y
    this.empty = false;


    this.show = function()
    {
        if (this.empty == false)
        {
            canvasContext.fillStyle = "#323232";
            canvasContext.fillRect(this.x, this.y, widthOfTiles, widthOfTiles)
        } else
        {
            canvasContext.fillStyle = "#696966";
            canvasContext.fillRect(this.x, this.y, widthOfTiles, widthOfTiles)
        }
    };

    this.carveRooms = function(dis, x, y) //carve out Rooms
    {
        for (let i = 0; i < rooms.length; i++)
        {
            if (this.col >= rooms[i].y  / widthOfTiles && this.col < rooms[i].y / widthOfTiles + rooms[i].h / widthOfTiles && this.row >= rooms[i].x / widthOfTiles && this.row < rooms[i].x / widthOfTiles + rooms[i].widthOfTiles/ widthOfTiles)
                    {
                    this.empty = true;
                    }
        }
    };

    this.carveH = function(dis, x, y) //carve out the horizontal corridors
    {
        if (this.row >= y && this.row < y + dis && this.col < corridorWidth && this.col > y - corridorWidth)
        {
            this.empty = true;
        }
    };

    this.carveV = function(dis, x, y)
    {
        if (this.col >= y && this.col < y +dis && this.row < x + corridorWidth && this.row > x - corridorWidth)
        {
            this.empty = true;
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

function draw()
{
    for (let i = 0; i < grid.length; i++)
    {
        grid[i].show();
        grid[i].carveRooms();
    }

    for (let i = 0; i < grid.rooms; i++)
    {
        rooms[i].draw();
    }
}

makeGrid();
// createRooms(); not implemented yet
draw();

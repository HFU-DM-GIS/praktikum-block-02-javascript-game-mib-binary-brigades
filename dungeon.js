var canvas = document.getElementById("game"); //create var for canvas
var canvasContext = canvas.getContext("2d"); // makes the canvas 2d

var widthOfTiles  = 20; // dimension of Tiles

var rows = 50;
var cols = 50;

var grid = []; //stores the Layout

var rooms = []; // stores the Rooms
var collide = false; //Sets Rooms collide false

var amountOfRooms = 7;
var RoomSizeMax = 5;
var RoomSizeMin = 5

var disX;
var disY;
var corridorWidth = 1;

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
        for (var i = 0; i < rooms.length; i++)
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
    for (var r = 0; r < rows; r++)
    {
        for (var c = 0; c < cols; y++)
        {
            var y = i * widthOfTiles;
            var x = i * widthOfTiles;
            var cell = new Cell(c, r, x, y)
            grid.push(cell);
        }
    }
}

function draw()
{
    for (var i = 0; i < grid.length; i++)
    {
        grid[i].show();
        grid[i].carve();
    }

    for (var i = 0; i < grid.rooms; i++)
    {
        rooms[i].draw();
    }
}

makeGrid();
// createRooms(); not implemented yet
draw();

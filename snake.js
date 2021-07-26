function init(){
    canvas=document.getElementById("mycanvas");
    W=canvas.width=1000;
    H=canvas.height=1000;
    game_over=false;
    pen=canvas.getContext('2d');
    cs=67;
    getRandomFood();
    score=5;
    //Create a Food Object
    food_img= new Image();
    tropy=new Image();
    tropy.src="Assets/trophy.png";
    food_img.src="Assets/apple.png";
   snake={
       init_len:5,
       color:"blue",
       cells:[],
       direction:"right",
       createSnake:function(){
           for(var i=this.init_len;i>0;i--){
               this.cells.push({x:i,y:0});
           }
       },
       drawSnake:function(){
        pen.fillStyle=this.color;
           for(var i=0;i<this.cells.length;i++){
              
               pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
           }
       },
       updateSnake:function(){
        var headX=this.cells[0].x;
        var headY=this.cells[0].y;
           if(food.x==headX&&(food.y==headY))
           {
            getRandomFood();
           score++;
           }
           else{
        this.cells.pop();}
       
        var nextX;
        var nextY;
        if(this.direction=="right"){
            nextX=headX+1;
            nextY=headY;
        }
        else if(this.direction=="down"){
            nextX=headX;
            nextY=headY+1;
        }
        else if(this.direction=="up"){
            nextX=headX;
            nextY=headY-1;
        }
        else if(this.direction=="left"){
            nextX=headX-1;
            nextY=headY;
        }
        var X=nextX;
        var Y=nextY;
        this.cells.unshift({x:X,y:Y});
        var last_x=Math.round(W/cs)
        var last_y=Math.round(H/cs);
        if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>last_y)
        game_over=true;
        
       }
       
   }
   snake.createSnake();
   //Add event listner on document object
   function keyPressed(e){
    if(e.key=="ArrowRight")
    snake.direction="right";
    else if(e.key=="ArrowLeft")
    snake.direction="left";
    else if(e.key=="ArrowDown")
    snake.direction="down";
    else
    snake.direction="up";
   }
   document.addEventListener('keydown',keyPressed);

}
function draw(){
  pen.clearRect(0,0,W,H);
  snake.drawSnake();
  pen.fillStyle=food.color;
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
  pen.drawImage(tropy,18,20,cs,cs);
  pen.fillStyle="blue";
  pen.font="20px Roboto";
  pen.fillText(score,50,50);
}
function update(){
   snake.updateSnake();
    
}
function getRandomFood(){
    var foodX=Math.round(Math.random()*((W-cs)/cs));
    var foodY=Math.round(Math.random()*((H-cs)/cs));
     food={
        x:foodX,
        y:foodY,
        color:"red",
    }
}
function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
    }
  draw();
  update();
    
}
init();

var f=setInterval(gameloop,100);


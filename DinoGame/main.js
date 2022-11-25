var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dinosaur.png';

/** 오브젝트 */
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';            // 초록색 네모를 그리겠다.
        ctx.fillRect(this.x, this.y, this.width, this.height);     // x, y좌표에서 width, height 사이즈인 네모를 만들겠다.
        ctx.drawImage(img2, this.x, this.y);
    }
}

var img1 = new Image();
img1.src = 'cactus.png';

/** 오브젝트 뽑아내는 거 */
class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }

}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function 프레임마다실행(){

    animation = requestAnimationFrame(프레임마다실행);              // 1초에 60번 코드 실행
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);   // 이동 경로를 지워주면서 이동

    if(timer % 200 === 0){                              // 120프레임마다 장애물 생성
        var cactus = new Cactus();  
        cactus여러개.push(cactus);                      // 장애물이 많으니까 array에 보관
    }
    cactus여러개.forEach((a, i, o)=>{                   // array안에 있던 장애물을 다 꺼내서 draw해줌

        /** x좌표가 0미만이면 제거 */
        if(a.x < 0){
            o.splice(i, 1)
        }

        a.x--;                                          // 1초에 60번 왼쪽으로 이동하게 빼준다

        충돌하냐(dino, a);                              // 충돌 체크

        a.draw();
    })

    /** 점프 */
    if(점프중 == true){
        dino.y -= 2;                                    // 1초에 60번 2를 빼준다
        점프timer++;
    }
    if(점프중 == false){
        if(dino.y < 200){
            dino.y++;
        }
    }
    if(점프timer > 100){
        점프중 = false;
        점프timer = 0;
    }
    dino.draw();
}

프레임마다실행();


/** 충돌 확인 */
function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if(x축차이 < 0 || y축차이 < 0){
        ctx.clearRect(this.x, this.y, this.width, this.height);  // canvas clear
        cancelAnimationFrame(animation);
    }
}

var 점프중 = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        점프중 = true;
    }
})
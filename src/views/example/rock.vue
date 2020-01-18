<template>
  <div :style="{'height': clientHeight}" class="special-con pc2 rock">
    <img class="bg" src="//img1.qdingnet.com/1ebb541fe5a54d3492cec87eeff2486d.png" />
    <div class="center-pic stage-1">
      <div class="left-box">
        <div class="left-text">
          <p class="title"></p>
          <!-- <p class="goods">奖品</p> -->
        </div>
        <div class="box-pic">
          <img class="box" src="//img1.qdingnet.com/9c8cc0570ebd151c7fb66dfd328b5319.png" />
        </div>
      </div>
      <div class="middle-box">
        <img
          class="stop"
          src="//img1.qdingnet.com/a37b38b08d4fafe38e14e36a60626318.png"
          v-if="!isShowCanv"
        />
        <img
          class="go"
          src="//img1.qdingnet.com/f849f4f20122b428bad07bc1477d7447.png"
          v-if="isShowCanv"
        />
        <img
          class="dis-btn"
          src="//img1.qdingnet.com/44ae18e5ece731da1e83e4d0b95be15f.png"
          v-show="isDisabled"
        />
        <div class="canvas-box" v-show="isShowCanv">
          <canvas
            class="canvasOne"
            height="350"
            id="canvasOne"
            width="350"
          >Your browser does not support the HTML 5 Canvas.</canvas>
        </div>
        <a @click="goStart" class="btn-go" id="run" v-show="!isDisabled"></a>
      </div>
      <div class="right-box">
        <div class="list-box">
          <h2>中奖人名单</h2>
          <div class="list-title">
            <span>姓名</span>
            <span class="tel">手机号码</span>
          </div>
          <ul>
            <!-- <li>
                <span class="name">{{item.name}}</span><span class="tel">{{item.mobile}}</span>
            </li>-->
          </ul>
        </div>
      </div>
      <!-- <div class="restart-box">
          <img class="box" src="https://img1.qdingnet.com/9b71f94c3fef0846dab626274028bf8c.png" />
          <input type="text" class="re-num" placeholder="请输入抽奖人数" />
          <a class="btn-restart"></a>
      </div>-->
    </div>
    <div class="center-pic big stage-2">
      <div class="title">
        <img src="//img1.qdingnet.com/bf1a55f1d055c0588d73ee33ada20ac7.png" />
      </div>
      <div class="list-box">
        <ul></ul>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 1, window.onresize
 * 2, 动画 animation
 * 3, canvas
 *
 */
export default {
  data() {
    return {
      clientHeight: '660px',
      isOpen: false,
      numBalls: 15, // 运动小球数量  colorSeed 数组长度只能是numBalls的整数倍
      seed: [
        // 初始化小球随机颜色
        { c1: '#ca0d3c', c2: '#ea5893' },
        { c1: '#af14ac', c2: '#f495f6' },
        { c1: '#1e75d4', c2: '#afd1fc' },
        { c1: '#cb6600', c2: '#f5de4f' },
        { c1: '#217505', c2: '#d3eb32' }
      ],
      colorSeed: [],
      context: null, // 画布
      theCanvas: null,
      circle: null,
      balls: null,
      tempSpeed: 5,
      game: null,
      friction: 0, // 摩擦初始值
      isShowCanv: false,
      isDisabled: false
    };
  },
  mounted() {
    // 适应浏览器窗口高度
    this.clientHeight = `${document.documentElement.clientHeight}px`;
    const that = this;
    window.onresize = () => {
      that.clientHeight = `${document.documentElement.clientHeight}px`;
    };
    // 初始化
    this.initData();
    window.onkeydown = event => {
      if (event.keyCode == 32) {
        // 空格键
        if (this.isOpen) {
          return false;
        }
        this.isOpen = true;

        this.startGame();
      }
    };
  },
  methods: {
    // 初始化
    initData: function() {
      // 传入种子数组 和 小球个数。生成 新的colorSeed
      this.colorSeed = this.pad(this.seed, this.numBalls);
      // 画布
      // let theCanvas = window.document.querySelector('.canvasOne');
      let theCanvas = document.getElementById('canvasOne');
      // this.context = theCanvas.getContext('2d');
      this.circle = {
        x: theCanvas.width / 2, //圆心的x轴坐标值
        y: theCanvas.height / 2, //圆心的y轴坐标值
        r: theCanvas.width / 2 //圆的半径
      };
      // 初始化小球
      this.newBall();
    },
    //  初始化小球 的位置 颜色
    newBall: function() {
      let balls = [];
      let circle = this.circle;
      // let tempX = null;
      // let tempY = null;
      let tempRadius = 35;
      let tempSpeed = this.tempSpeed;

      let tmin = circle.r - Math.sqrt(Math.pow(circle.r, 2) / 2); // 圆内矩形小球活动安全坐标区间
      let tmax = tmin + Math.sqrt(Math.pow(circle.r, 2) / 2) * 2;

      for (var i = 0; i < this.numBalls; i++) {
        let tempX = Math.floor(this.RandomNumBoth(tmin + tempRadius, tmax - tempRadius));
        //Y轴最大生成区域需要减去球速和随机速度值，防止下一帧出现溢出区域死循环
        let tempY = Math.floor(this.RandomNumBoth(tmin + tempRadius, tmax - tempRadius - tempSpeed - 5)) + 1;
        //var tmpIndex = Math.floor(Math.random() * 5);
        let tempColor = this.colorSeed[i]['c1'];
        let tempColor2 = this.colorSeed[i]['c2'];
        let tempvelocityx = 1;
        let tempvelocityy = tempSpeed + Math.floor(Math.random() * 5);

        let tempBall = {
          x: tempX, //小球圆心位置
          y: tempY,
          radius: tempRadius, //半径
          speed: tempSpeed, // 小球运行速度。默认常量
          velocityx: tempvelocityx, // x方向的速度
          velocityy: tempvelocityy, //。y方向的速度
          mass: tempRadius * 2, // ？
          nextx: tempX, // 下一帧的x位置
          nexty: tempY, // 下一帧的y位置
          c: tempColor, // 过度色1
          c2: tempColor2 // 过度色2
        };

        balls.push(tempBall);
      }
      this.balls = balls;
    },
    // 返回最大值，最小值之间的随机数
    RandomNumBoth: function(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
    },
    // 渲染小球 更新位置 撞墙测试
    drawScreen: function() {
      // let theCanvas = document.getElementById('canvasOne');
      let theCanvas = document.querySelector('.canvasOne');
      let context = theCanvas.getContext('2d');

      context.clearRect(0, 0, theCanvas.width, theCanvas.height); // 擦掉之前画的
      context.beginPath();
      context.strokeStyle = 'rgba(204, 4, 204, 0)'; //描边
      context.fillStyle = 'rgba(4, 204, 204, 0)'; // 填充
      context.fillRect(0, 0, theCanvas.width, theCanvas.height); //绘制矩形 填充
      context.arc(this.circle.x, this.circle.y, this.circle.r, 0, Math.PI * 2, false); //以圆心为中心绘制弧线
      context.stroke(); // 对路径描边
      context.closePath();
      this.update();
      this.testWalls();
      this.render(context);
    },

    // 速率和下一秒位置更新
    update: function() {
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        ball.velocityy = ball.velocityy - ball.velocityy * this.friction; //velocity 速度 friction 摩擦
        ball.nexty = ball.y += ball.velocityy;
      }
    },

    // 撞墙测试
    testWalls: function() {
      var ball;
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        var tx = Math.abs(ball.nextx - this.circle.r);
        var ty = Math.abs(ball.nexty - this.circle.r);
        var tx2 = Math.pow(tx, 2); // 返回 num 的 n 次方
        var ty2 = Math.pow(ty, 2);
        var aft = Math.ceil(Math.sqrt(tx2 + ty2)); // 开方根
        if (aft + ball.radius + this.tempSpeed >= this.circle.r) {
          //预判下一帧 运动位置是否 大于cirle radius
          ball.velocityx = ball.velocityx * -1; // 做反向运动
          ball.velocityy = ball.velocityy * -1;
        }
      }
    },

    // 画balls数组的小球
    render: function(context) {
      var ball;
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        ball.x = ball.nextx;
        ball.y = ball.nexty;
        context.beginPath();
        var linear_gradient = context.createRadialGradient(
          ball.x,
          ball.y,
          ball.radius,
          ball.x - 40,
          ball.y - 40,
          ball.radius
        );
        linear_gradient.addColorStop(0, ball.c);
        linear_gradient.addColorStop(1, ball.c2);
        context.fillStyle = linear_gradient || 'hsl(' + ball.c + ', 100%, 50%)';
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true); // true. 逆时针计算起止角度
        context.fill();
        context.closePath();
      }
    },
    //
    gameLoop: function() {
      this.game = setTimeout(this.gameLoop, 10); // 等同于setInterval() 避免动作覆盖
      this.drawScreen();
    },
    //
    goStart: function() {
      console.log('333333');
      if (this.isOpen) {
        return false;
      }
      this.isOpen = true;

      this.startGame();
    },
    startGame: function(url, id, type, num) {
      console.log('start...');
      this.game && clearTimeout(this.game);
      this.gameLoop();
      // this.isShowCanv = true;
      // $('#canvasOne').show();
      // $('.go').show();
      // $('.stop').hide();
      setTimeout(() => {
        this.gameLoop();
        this.isShowCanv = true;
        this.shutdownReq();
      }, 500);
    },
    // 刷奖品 //应该是定时反复请求结果
    shutdownReq: function() {
      console.log('shutdownReq...');
      this.isDisabled = true;
      setTimeout(() => {
        console.log('shutdownReq...stop');
        // $('.dis-btn').show();
        // $('.btn-go').hide();
        // var list = res.data.entity.list;
        // if (list.length > 0) {
        //   var liHtml = '';
        //   if (list.length <= 5) {
        //     $('.right-box').show();
        //     $('.stage-2').hide();
        //     for (var i = 0; i < list.length; i++) {
        //       var tmp =
        //         '<li><span class="head-pic"><img src="' +
        //         list[i].imageUrl +
        //         '"/></span> <span class="name">' +
        //         list[i].name +
        //         '</span> <span class="tel">' +
        //         list[i].mobile +
        //         '</span></li>';
        //       liHtml = liHtml + tmp;
        //     }
        //     $('.right-box ul').html(liHtml);
        //   } else {
        //     $('.stage-1').hide();
        //     var tmpHtml = '';
        //     for (var i = 0; i < list.length; i++) {
        //       var tmp =
        //         '<li><span class="head-pic"><img src="' +
        //         list[i].imageUrl +
        //         '"/></span> <span class="name">' +
        //         list[i].name +
        //         '</span> <span class="tel">' +
        //         list[i].mobile +
        //         '</span></li>';
        //       tmpHtml = tmpHtml + tmp;
        //     }
        //     $('.stage-2').show();
        //     $('.big .list-box ul').html(tmpHtml);
        //     $('.right-box').hide();
        //   }
        // }
        // $('.tip').show();
        // $('.mask').show();
        clearTimeout(this.game);
        // $('#canvasOne').hide();
        // $('.go').hide();
        // $('.stop').show();
        this.isShowCanv = false;
        this.isOpen = false;
        this.isDisabled = false;
      }, 5000);
    },

    // 数组重组
    pad: function(seed, ballNums) {
      var length = ballNums % seed.length !== 0 ? Math.ceil(ballNums / seed.length) : ballNums / seed.length;
      var total = new Array(length);
      for (var i = 0; i < total.length; i++) {
        total[i] = seed;
      }

      return this.flattern(total);
    },

    // 数组降维
    flattern: function(target) {
      var res = [];
      let that = this;
      target.forEach(function(item) {
        if (Array.isArray(item)) {
          res = res.concat(that.flattern(item));
        } else {
          res.push(item);
        }
      });
      return res;
    }
  }
};
</script>
<style lang="stylus" scoped>
.special-con
  // width: 100%;
  overflow hidden
  position relative
  height 779px
  margin -20px
.special-con .bg
  width 100%
  height 100%
  left 50%
  margin-left -50%
  position absolute
  height 100%
  top 0px
  display block
  width 100%
  height 100%
.pc2 .center-pic
  width 1800px
  margin 0 auto
  height 550px
  position absolute
  top 50%
  margin-top -275px
  left 50%
  margin-left -900px
.left-box
  width 300px
  float left
  position relative
.left-text .title
  color #fff
  font-size 34px
  width 180px
  text-align center
.left-text .title span
  color #ffaf00
.left-text .goods
  color #ff5d52
  font-size 18px
.middle-box
  float left
  position relative
  width 370px
  text-align center
  height 530px
  margin-left 405px
.right-box
  float right
  width 350px
  margin-top 156px
  color #fff
  display block
  margin-right 160px
.right-box .list-box ul li .head-pic
  margin-right 20px
  margin-left 36px
  display none
.right-box .list-box ul li .name
  width 120px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  margin-right 10px
.list-box
  font-size 22px
.list-box li
  list-style none
  background-color rgba(0, 0, 0, 0.7)
  margin-top 1px
  text-align center
  height 60px
  line-height 60px
  font-size 25px
.list-title
  height 50px
  background-color rgba(0, 0, 0, 0.7)
  text-align center
  line-height 50px
  font-size 25px
.list-title span
  float left
  display block
  text-align center
  margin-left 30px
  margin-right 30px
.list-title span.tel
  margin-left 50px
.list-box h2
  color #ffaf00
  font-size 34px
  margin-bottom 20px
.box-pic
  position absolute
  top 240px
  left 200px
  -webkit-animation bounce 1s 0.2s ease both infinite
  animation bounce 1s 0.2s ease both infinite
@keyframes bounce
  0%, 20%, 50%, 80%, 100%
    -webkit-transform translateY(0)
  40%
    -webkit-transform translateY(-30px)
  60%
    -webkit-transform translateY(-15px)
@keyframes bounce
  0%, 20%, 50%, 80%, 100%
    -webkit-transform translateY(0)
    transform translateY(0)
  40%
    -webkit-transform translateY(-30px)
    transform translateY(0)
  60%
    -webkit-transform translateY(-15px)
    transform translateY(-15px)
.left-text
  margin-top 153px
  margin-left 220px
.list-box ul li span
  float left
  display block
.list-box ul li .head-pic
  width 50px
  height 50px
  margin 5px
  margin-left 15px
  display none
.list-box ul li .head-pic img
  width 100%
  border-radius 25px
.list-box ul li .name
  width 120px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  margin-right 0px
.list-box ul li .tel, .btn-go
  display block
  width 120px
  height 120px
  position relative
  margin 0 auto
  top 376px
.canvas-box
  position absolute
  top 0
  width 340px
  left 50%
  margin-left -170px
  top 26px
.pc2 .center-pic.stage-2
  width 1800px
  margin 0 auto
  height 500px
  position absolute
  top 50%
  margin-top -250px
  left 50%
  margin-left -900px
  display none
.big .list-box
  overflow hidden
  margin 0 auto
  width 1500px
  margin-top 110px
  font-size 25px
.big .list-box ul
  float left
.big .list-box ul li
  list-style none
  width 276px
  float left
  margin-left 20px
  color #fff
.middle-box .go, .middle-box .stop
  position absolute
  left 0
// .middle-box .go
// display none
.restart-box
  width 600px
  position absolute
  height 480px
  left 50%
  margin-left -300px
  top 50%
  margin-top -240px
.restart-box input
  position absolute
  left 50%
  width 370px
  height 90px
  margin-left -185px
  top 172px
  font-size 30px
  color #fede98
  text-align center
  border none
  background-color rgba(204, 204, 204, 0)
.side-btn
  position fixed
  right 0
  height 100%
  width 230px
  z-index 999
.side-btn a
  display none
.restart-box
  display none
.btn-restart
  width 280px
  height 100px
  display block
  position absolute
  left 50%
  margin-left -140px
  top 310px
.stage-2 .title
  width 450px
  height 100px
  margin 0 auto
.dis-btn
  position absolute
  width 110px
  left 50%
  margin-left -53px
  top 388px
  // display none
.message
  width 200px
  background-color rgba(0, 0, 0, 0.6)
  color #fff
  position absolute
  top 50%
  left 50%
  margin-left -100px
  margin-top -40px
  border-radius 20px
  text-align center
  padding 20px
  display none
.message p
  word-wrap break-word
.message a
  width 100%
  bottom 0
  position relative
  display block
</style>
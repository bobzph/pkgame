function person(canvas,cobj,run,jump){
    this.canvas=canvas;
    this.cobj=cobj;
    this.run=run;
    this.jump=jump;
    this.x=70;
    this.y=510;
    this.width=353;
    this.height=618;
    this.status="run";
    this.state=0;
    this.life=3;
    this.speedx=300;
    this.speedy=170;
    this.num=20;

}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy
    }
}
// 障碍物
function hinders(canvas,cobj,hinder){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinder=hinder;
    this.state=0;
    this.x=canvas.width-80;
    this.y=520;
    this.width=160;
    this.height=100;
    this.speedx=6;
}
hinders.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y)
        this.cobj.drawImage(this.hinder[this.state],0,0,274,160,0,0,this.width,this.height)
        this.cobj.restore();
    }

}



// 子弹
function zd(canvas,cobj,zds){
    this.canvas=canvas;
    this.cobj=cobj;
    this.zds=zds;
    this.width=50;
    this.height=50;
    this.speedx=5;
    this.x=0;
    this.y=0;
    this.jia=1;
    this.state=0
}
zd.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zds,0,0,50,50,0,0,this.width,this.height);
        this.cobj.restore();
    }
}


// 血

function lizi(canvas,cobj,person){
    this.canvas=canvas;
    this.person=person;
    this.cobj=cobj;
    this.x=this.person.x;
    this.y=this.person.y+this.person.height/5;
    this.r=1+3*Math.random();
    this.color="red";
    this.speedy =-4;
    this.speedx = Math.random()*6-3;
    this.zhongli = 0.3;
    this.speedr = 0.1;
}
lizi.prototype = {
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle = this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}

function xue(canvas,cobj,person){
    var arr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(canvas,cobj,person);
        arr.push(obj)
    }
    var t= setInterval(function(){
        for(var i =0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t)
        }
    })
}


// 游戏主类
function game1(canvas,cobj,run,jump,hinder,zds,pb,qiang,zc,qt,fenshu,shengming){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinder=hinder;
    this.pb=pb;
    this.qiang=qiang;
    this.zc=zc;
    this.qt=qt;
    this.fenshu=fenshu;
    this.shengming=shengming;
    this.width=canvas.width;
    this.height=canvas.height;
    //定义背景速度
    this.bjx=0;
    this.bjs=15;
    this.person=new person(canvas,cobj,run,jump);
    this.hinderArr=[];
    this.isfire=false;
    this.shuliang=0;
    this.zd=new zd(canvas,cobj,zds);

}
game1.prototype={
    play:function(start,zhezhao){
        start.css("animation","one1 2s ease forwards");
        zhezhao.css("animation","one1 2s ease forwards")
        // 调用person draw方法
        this.runs();
        this.key();
        this.mouse();
    },
    runs:function(){
        var that=this;
        var num=0;
        // 定义障碍物数量
        that.name=prompt("请输入姓名");
        var rand=(4+Math.ceil(6*Math.random()))*1000;
        setInterval(function(){
            that.pb.play();
            that.shengming.innerHTML=that.person.life;
            that.fenshu.innerHTML=that.shuliang;
            num+=50
            that.cobj.clearRect(0,0,that.width,that.height)
            // 用来显示图片NUM
            that.person.num++;
            if(that.person.status=="run"){
                that.person.state=that.person.num%8;
            }else{
                that.person.state=0;
            }

            // 人物X发生变化
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/3){
                that.person.x=that.width/3;
            }
            that.canvas.style.backgroundPositionX=that.bjx+"px";
            that.bjx-=that.bjs
            that.person.draw();

            // 操作障碍物
            if(num%rand==0){
                rand=(4+Math.ceil(6*Math.random()))*800;
                num=0;
                var obj=new hinders(that.canvas,that.cobj,that.hinder);
                obj.state=Math.floor(Math.random()*that.hinder.length);
                that.hinderArr.push(obj);
            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();
            // 碰撞
                if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    // 生命
                    if(!that.hinderArr[i].flag){
                        xue(that.canvas,that.cobj,that.person);
                        that.person.life--;
                        that.zc.play();

                        if(that.person.life==0){
                            var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                            var temp={name:that.name,shuliang:that.shuliang};
                            // 排序
                            messages.sort(function(a,b){
                                return a.shuliang<b.shuliang;
                            })
                            if(messages.length>0){
                                if(temp.shuliang>messages[messages.length-1].shuliang){
                                    if(messages.length==5){
                                        messages[messages.length-1]=temp;
                                    }else if(messages.length<5){
                                        messages.push(temp);
                                    }
                                }
                                // location.reload();

                            }else{
                                messages.push(temp);
                            }
                            // that.hinderArr[i].flag=true;
                            localStorage.messages=JSON.stringify(messages);
                            location.reload();
                        }

                        // 结束游戏
                        // if(that.person.life==0){
                        //     alert("Game over");
                        //     location.reload();
                        // }
                        that.hinderArr[i].flag=true;
                    }
                }
                if(hitPix(that.canvas,that.cobj,that.zd,that.hinderArr[i])) {
                    if (!that.hinderArr[i].flag) {
                        that.hinderArr.splice(i,1)
                    }
                }
                // 分数
                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.shuliang++;
                        that.hinderArr[i].flag1=true;
                    }
                }
            }
            //操作子弹
            if(that.isfire){
                that.zd.speedx+=that.zd.jia;
                that.zd.x+=that.zd.speedx;
                that.zd.draw();
            }

        },80)
    },
    // 跳跃事件
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){

            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){
                that.pb.pause();
                that.qt.play();
                var inita=0;
                var speeda=5;
                var r=150;
                var y=that.person.y;
                // 跳跃动画
               var t=setInterval(function(){
                   that.person.status="jump";
                    inita+=speeda;
                    if(inita>180){
                        clearInterval(t);
                        that.person.status="run"
                        that.person.y=y;
                        flag=true;
                    }else{
                        var top=Math.sin(inita*Math.PI/180)*r;
                        that.person.y=y-top;
                    }
                },100)
            }

        }

    },
    mouse:function(){
        var that=this;
        that.canvas.onclick=function(){
            that.zd.x=that.person.x;
            that.zd.y=that.person.y+that.person.height/15;
            that.qiang.play();
            that.zd.speedx=5;
            that.isfire=true;
        }
    },
    









}


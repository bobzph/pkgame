window.onload=function(){
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=clientw;
    canvas.height=clienth;
    var cobj=canvas.getContext("2d");
    // 人
    var run=document.querySelectorAll(".run")
    // 跳跃
    var jump=document.querySelectorAll(".jump")
    // 障碍物
    var hinder=document.querySelectorAll(".hinder")
    // 子弹
    var zds=document.querySelector(".zd");
    // 音效
    var pb=document.querySelector(".pb");
    var qiang=document.querySelector(".qiang");
    var zc=document.querySelector(".zc")
    var qt=document.querySelector(".qt");
    // 分数
    var fenshu=document.querySelector("span");
    // 生命值
    var shengming=document.querySelector("p");
    var gameobj=new game1(canvas,cobj,run,jump,hinder,zds,pb,qiang,zc,qt,fenshu,shengming);

    // 游戏开始
    var ks=$(".btn");
    var zhezhao=$(".zhezhao");
    var start=$(".start");
   ks.one("click",function(){
       gameobj.play(start,zhezhao)
   });




    

}
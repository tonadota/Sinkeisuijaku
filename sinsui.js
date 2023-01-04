'use strict';

var firstCard = null;
var countUnit = 0;
var startTime;
var timer;
var backTimer;
var elapsedTime;
var cards = [];
var SL;
var finish = false;
var result = document.getElementById('result');

window.onload = function(){

  function Card(suit,num){
    this.suit = suit;
    this.num = num;
    this.front;
    this.setFront = function(){
      this.front = `${this.suit}${('0'+this.num).slice(-2)}.gif`;
    };
  }

  const suits = ['s','d','h','c'];
  shuffle(suits);
  SL = suits.length;

  for(let i=0; i<SL; i++){
    for (let j=1; j<=13; j++){
      let card = new Card(suits[i],j);
      card.setFront();
      cards.push(card);
    }
  }
  shuffle(cards); //下の方に関数作ってある。

  
  const table = document.getElementById('table');
  for(let i=0; i<SL; i++){
    var tr = document.createElement('tr');
    table.appendChild(tr);
    for(let j=0; j<13; j++){
      let td = document.createElement('td');
      let tempCard = cards[i*13+j];
      td.classList.add('card', 'back');
      td.num = tempCard.num;
      td.onclick = turn;
      td.style.backgroundImage = `url(images/${tempCard.front})`;
      tr.appendChild(td);
    }
  }
  startTime = new Date();

  startTimer();
}


function shuffle(cards){
  var n = cards.length;
  while(n){
    var i = Math.floor(Math.random() * n--);
    var temp = cards[n];
    cards[n] = cards[i];
    cards[i] = temp;
  }
}







function turn(e){
  let sec = 2.5;
  let td = e.target;
  
  var pair = document.getElementById('pair');
  if(!td.classList.contains('back') || backTimer){
    return; //表のカードをクリックしてもそのままお返しされ何も起こらない。
  }
  td.classList.remove('back');
  if(firstCard === null){
    firstCard = td;
  } else {
    
    if(firstCard.num === td.num){
      countUnit++;

      backTimer = setTimeout(function(){
        firstCard.classList.add('finish');
        td.classList.add('finish');
        firstCard = null;
        if(!finish){
          td.insertAdjacentHTML("beforeend", "+1 pair!");
          setTimeout(function(){
            td.innerHTML = "";
          }, 1000);
          if(countUnit == 1){
            pair.innerHTML = "You've got " + countUnit + "pair! Complete collecting until " + SL*13/2  + "pairs.";
            setTimeout(function(){
              pair.innerHTML = "";
            }, sec*1000);
          } else if(countUnit < cards.length/2) {
            pair.innerHTML = "You've got " + countUnit + "pairs! Complete collecting until " + SL*13/ 2 + "pairs.";
            setTimeout(function(){
              pair.innerHTML = "";//「3秒間これにする」じゃないといけないみたいね。
            }, sec*1000);
          } else {
            clearInterval(timer);
            time.innerHTML = "Conplete with " + SL + " pairs!<br>Clear Time: " + elapsedTime + " sec.";
            if(elapedTime<=60) pair.innerHTML = "Rank:S";
          }
        }
        backTimer = NaN;
      }, 500);
      
    } else {
      backTimer = setTimeout(function(){
        firstCard.classList.add('back');
        td.classList.add('back');
        firstCard = null;
        backTimer = NaN;
      }, 600);
    }

  }
}



function startTimer(){
  timer = setInterval(showSecond, 1000); //なぜかこの状態でstartTimer()を発動しても処理が発生する。
}

function showSecond() {
  var nowTime = new Date();
  elapsedTime = Math.floor((nowTime - startTime) / 1000); //計算式のとこよくわからん
  var string = 'proceeded time: ' + elapsedTime + 'sec;';
  var time = document.getElementById('time');
  time.innerHTML = string;

  if(elapsedTime>=600){
    //finish = true;
    clearInterval(timer);
    time.innerHTML = "Time UP! ...You faild.";
    var button = document.createElement('button');
    button.innerHTML = "Reveal All Cards by Turning.";
    result.appendChild(button);
    //result.add Reveal All Cards to Turn.
  }

}
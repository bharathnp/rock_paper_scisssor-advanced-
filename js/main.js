var score = 0;

initialize();
/* That function is executed when init the page */
function initialize(){
    update();
    changeMode('original');
}

/* functions to modal rules*/
function openModalRules(){
    document.getElementById('attribution').className = 'no-show';
    document.getElementById('rules-modal').style.display='flex';
}
function closeModalRules(){
    document.getElementById('attribution').className = 'show';
    document.getElementById('rules-modal').style.display='none';
}

/* Change Game Mode */
function changeMode(name){
    var img = document.getElementsByTagName('img');
    var gameMode = document.getElementById('game-mode');
    var choose = document.getElementById('choose-container');
    name = name.toLowerCase();
    choose.className = 'choose '+name;
    for(var i= 0; i < img.length; i++){
        if(img[i].getAttribute("data-"+ name) != null){
            img[i].src = img[i].getAttribute("data-"+name);
        }  
    }

    switch(name){
        case 'original':
            gameMode.innerText = 'expert';
        break;
        case 'expert':
            gameMode.innerText = 'original';
        break;
    }
}

/* Change the step Game */
function changeStepGame(step,item){
    var steps = document.getElementsByClassName('step');
    var content = document.getElementById(step);
    var you = document.getElementById('you');
    var thehouse = document.getElementById('thehouse');
    var youButton = document.getElementById('you-button');
    var thehouseButton = document.getElementById('thehouse-button');
    var thehouseResult;

    for(var i= 0; i < steps.length; i++){
        steps[i].style.display= 'none';
    }
    
    if(step == 'choose'){
        content.style.display = 'flex';
    }else{
        content.style.display = 'flex';
        you.src = chooseImg(item).url;
        youButton.className = item;
        thehouseResult = chooseImg();
        
        setTimeout(function(){
             thehouse.src = thehouseResult.url;
             thehouseButton.className = thehouseResult.name;
        }, 1000);
        setTimeout(function(){
            updateScore(loseOrWin(item,thehouseResult.name));
        }, 2000);
    }
}

/* Get the url images by element */
function chooseImg(item,mode = detectGameMode()){
    var options = [ { name: 'rock', url: "./assets/img/icon-rock.svg"},
                    { name: 'paper', url: "./assets/img/icon-paper.svg"},
                    { name: 'scissors', url: "./assets/img/icon-scissors.svg"},
                    { name: 'spock', url: "./assets/img/icon-spock.svg"},
                    { name: 'lizard', url: "./assets/img/icon-lizard.svg"}
                ];
         if(item != undefined || item != null){
            for(var i= 0; i < options.length; i++){
                if(options[i].name == item){
                    return options[i];
                }
            } 
         }else{
             var a;
             if(mode == 'expert'){
                a = Math.floor((Math.random() * options.length));
             }  else{
                a = Math.floor((Math.random() * 3));
             }
             return options[a];
         } 
}

/* Return if Lose or Win the game */
function loseOrWin(you,thehouse){
    var result = document.getElementById('result');
    var youButton = document.getElementById('you-button');
    var thehouseButton = document.getElementById('thehouse-button');
    var container = document.getElementById('result-container');
    var options = {
        'rock' :      {beat:['lizard','scissors'], isbeating: ['spock','paper']},
        'paper':      {beat:['spock','rock'], isbeating: ['scissors','lizard']},
        'scissors':   {beat:['lizard','paper'], isbeating: ['spock','rock']},
        'spock':      {beat:['rock','scissors'], isbeating: ['lizard','paper']},
        'lizard':     {beat:['paper','spock'], isbeating: ['scissors','rock']}
    }
    if(you == thehouse){
        container.style.display = 'flex';
        result.innerText = "Tie"; 
    }else{
        for (var i = 0; i < options[you].beat.length; i++){
            if(options[you].beat[i] == thehouse){
                youButton.className += " win";
                container.style.display = 'flex';
                result.innerText = "You win";
                return true;
            }else if(options[you].isbeating[i] == thehouse){
                thehouseButton.className += " win";
                container.style.display = 'flex';
                result.innerText = "You lose";
                return false;
            }
        }
    }
        
    

}

/* Update the score  */
function updateScore(state){
    var scoreText = document.getElementById('score');
    if(state != null){
        if(state == true){
            score++;
        }else{
            if(score > 0){
                score--;
            }   
        }
    }
    scoreText.innerText = score;
}

/* Detect Game Mode */
function detectGameMode(){
    var gameMode = (document.getElementById('game-mode').innerText).toLowerCase();
    if(gameMode == 'original'){
        return 'expert';
    }
    else{
        return 'original';
    }
}

/* update */
function update(){
        document.getElementById('result').innerText = '';
        document.getElementById('thehouse').src = '';
        document.getElementById('thehouse-button').className = 'no-choose';
        document.getElementById('result-container').style.display = 'none';
        changeStepGame('choose','none');
        updateScore();
    
}

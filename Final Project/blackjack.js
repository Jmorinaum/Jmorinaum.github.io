var playerWins = -1;
var dealerWins = 0;
var draws = 0;

var playerCount = 0;
var dealerCount = 0;

var playedCards = new Array();

var dealerCards = new Array();
var playerCards = new Array();

var cardHouses = new Array('H', 'D', 'S', 'C');

function reset() {
    playedCards = new Array();
    playerCount = 0;
    dealerCount = 0;
    resetCardBoxDiv('dealer');
    resetCardBoxDiv('player');
    document.getElementById('dealer-blackjack-result').innerText = dealerCount;
    document.getElementById('dealer-blackjack-result').style.color = 'white';
    document.getElementById('player-blackjack-result').innerText = playerCount;
    document.getElementById('player-blackjack-result').style.color = 'white';
}
function generateCardID(whoPlaying) {
    
    let newCard = false;
    let cardNum;

    while(newCard == false)
    {
        var character = "AKQJ023456789";
        cardNum = character.charAt(Math.floor(Math.random()*character.length));
        if (cardNum == 0){
            return cardNum = 10;
        }
        let cardHouseIndex = Math.floor(Math.random()*4);
        let card = ''+cardNum+cardHouses[cardHouseIndex];
        let checkCard = false;

        for(let i = 0;i<playedCards.length;i++)
        {
            if(playedCards[i] == card)
            {
                checkCard = true;
            }
        }
        if(checkCard == false)
        {
            newCard = true;
            playedCards.push(card);
        }
    }
    if(cardNum == "K")
    {
        return 10;
    }
    else if(cardNum == "Q")
    {
        return 10;
    }
    else if(cardNum == "J")
    {
        return 10;
    }
    else if(cardNum<=10 && cardNum>1)
    {
        return parseInt(cardNum);
    }
    else if(cardNum == "A")
    {
        if(whoPlaying == 'player')
        {

            if(playerCount <= 10)
            {
                return 11;
            }
            else
            {
                return 1;
            }

        }
        else if(whoPlaying == 'dealer')
        {
            if(dealerCount <= 10)
            {
                return 11;
            }
            else
            {
                return 1;
            }
        }
    }
}

 
function deal()
 {
    document.getElementById("deal-button").disabled = true;
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stay-button").disabled = false;
    reset();

    if (playerWins === -1)
     {
        playerWins = 0;
        document.getElementById('start-img').remove();
        document.getElementById('start-img').remove();
    }
    dealerCount += generateCardID('dealer');
    addCard('gray_back', 'dealer');
    dealCard('dealer');
    dealCard('player');
    dealCard('player');
    document.getElementById('player-blackjack-result').innerText = playerCount;

    if (playerCount === 21)
     {
        dealer();
    }
}

function dealCard(whoPlaying)
{
    if (whoPlaying == 'dealer')
    {
        dealerCount += generateCardID(whoPlaying);
    }
    else if (whoPlaying == 'player')
    {
        playerCount += generateCardID(whoPlaying);
    }
    addCard(playedCards[playedCards.length-1],whoPlaying);
}

function winner()
{

    if(playerCount ==21 && dealerCount == 21)
    {
        drawBanner();
    }
    else if(playerCount > 21 && dealerCount > 21)
    {
        drawBanner();
    }
    else if(playerCount <=21 && dealerCount <=21)
    {
        if(playerCount>dealerCount)
        {
            winBanner('player');
        }
        else if(dealerCount>playerCount)
        {
            winBanner('dealer');
        }
        else
        {
            drawBanner();
        }
    }
    else
    {
        if(playerCount<dealerCount)
        {
  
            winBanner('player');
        }
        else if(dealerCount<playerCount)
        {
 
            winBanner('dealer');
        }
        else if(dealerCount == 21)
        {
            winBanner('dealer');
        }
        else if(playerCount == 21)
        {
            winBanner('player');
        }
    }
}
function drawBanner()
{

    var im = document.getElementById('dealer-card-box');
    im.remove();

    var divPlayer = document.getElementById('dealer-box');
    var divPlayerCardBox = document.createElement('div');
    divPlayerCardBox.setAttribute('id', 'dealer-card-box');
    divPlayerCardBox.setAttribute('class', 'flex-box-draw');
    divPlayer.appendChild(divPlayerCardBox);

    var image = document.createElement('img');
    image.src = 'cards/draw.gif';
    divPlayerCardBox.appendChild(image);


    var im = document.getElementById('player-card-box');
    im.remove();

    var divPlayer = document.getElementById('player-box');
    var divPlayerCardBox = document.createElement('div');
    divPlayerCardBox.setAttribute('id', 'player-card-box');
    divPlayerCardBox.setAttribute('class', 'flex-box-draw');
    divPlayer.appendChild(divPlayerCardBox);
    var image = document.createElement('img');
    image.src = 'cards/draw.gif';
    divPlayerCardBox.appendChild(image);
}

function winBanner(whoPlaying)
{
    var im = document.getElementById(whoPlaying+'-card-box');
    im.remove();
    var divPlayer = document.getElementById(whoPlaying+'-box');
    var divPlayerCardBox = document.createElement('div');
    divPlayerCardBox.setAttribute('id', whoPlaying+'-card-box');
    divPlayerCardBox.setAttribute('class', 'flex-box-start-cards');
    divPlayer.appendChild(divPlayerCardBox);

    var image = document.createElement('img');
    image.src = 'cards/Winner.png';
    divPlayerCardBox.appendChild(image);
}

function dealer()
{
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stay-button").disabled = true;

    resetCardBoxDiv('dealer');
    
    addCard(playedCards[0],'dealer');
    addCard(playedCards[1],'dealer');
 
    document.getElementById('dealer-blackjack-result').innerText = dealerCount;

    console.log('dealer score='+dealerCount);

    while(dealerCount <= 16)
    {
        dealCard('dealer');
        document.getElementById('dealer-blackjack-result').innerText = dealerCount;
    }

    if(dealerCount > 21)
    {
        document.getElementById('dealer-blackjack-result').innerText = 'BUST';
        document.getElementById('dealer-blackjack-result').style.color = 'red';
        document.getElementById("deal-button").disabled = false;
        
    }
    else if(dealerCount == 21)
    {
        document.getElementById('dealer-blackjack-result').style.color = 'lightgreen';
        document.getElementById("deal-button").disabled = false;
    }
    else
    {
        console.log('safe');
        document.getElementById("deal-button").disabled = false;
    }
    winner();
}

function hitPlayer()
{
    dealCard('player');
    document.getElementById('player-blackjack-result').innerText = playerCount;
    if(playerCount > 21)
    {
        document.getElementById('player-blackjack-result').innerText = 'BUST';
        document.getElementById('player-blackjack-result').style.color = 'red';
        dealer();
    }
    else if(playerCount == 21)
    {
        document.getElementById('player-blackjack-result').style.color = 'lightgreen';
        dealer();
    }
    else
    {
        console.log('player safe');
    }
}

function resetCardBoxDiv(whoPlaying)
{


    var divPlayer = document.getElementById(whoPlaying+'-card-box');
    divPlayer.remove();
    var divPlayer = document.getElementById(whoPlaying+'-box');
    var divPlayerCardBox = document.createElement('div');
    divPlayerCardBox.setAttribute('id', whoPlaying+'-card-box');
    divPlayerCardBox.setAttribute('class', 'flex-box-'+whoPlaying+'-cards');
    divPlayer.appendChild(divPlayerCardBox);
}

function addCard(cardID, whoPlaying)
{
    var image = document.createElement('img');
    var div = document.getElementById(''+whoPlaying+'-card-box');
    image.src = 'cards/'+cardID+'.png';
    div.appendChild(image);
}
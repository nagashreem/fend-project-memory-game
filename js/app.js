/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




$(document).ready(function(){

	var deck = document.getElementsByClassName("deck");
	let classArray = document.querySelectorAll(".deck li");
	let starScore = document.querySelectorAll(".fa-star");
	const idArray = [];
	var html = " ";
	var cardId;
	var openCardList = [];
	var matchedCardList = [];
	var moves = 0;
	

	
	for(i=0;i<classArray.length;i++){	/*Store the ids of all the cards in the deck in idArray */
		idArray[i]=classArray[i].getAttribute("id"); 
	}	

	shuffledDeck(idArray);	/*Start with a shuffled deck*/

	cardClick();	/*Handle the click event on a card*/

	$('.restart').click(function(){	/*Reshuffle the deck when restart is clicked*/
		shuffledDeck(idArray);
		cardClick();
		moves=0;
		updateMoves();
		resetScore();
	});

/*..................Function definitions..............................*/

	/*Shuffle function from http://stackoverflow.com/a/2450976*/
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

	/*Shuffle the cards in the deck*/
	function shuffledDeck(cards){
		var shuffledList= shuffle(cards);
		var html=" ";
		for(i=0;i<shuffledList.length;i++){	
			html += "<li class=\"card\" id=\""+shuffledList[i]+"\">\n"+document.getElementById(shuffledList[i]).innerHTML+ "\n</li>\n";
		}
		$(deck).empty();
		$(deck).append(html);
	}

	/*Handle the  card click*/
	function cardClick(){
		$('.card').click(function(event){
			cardId = String(event.target.id);
			openCard();
			checkForMatch();
		});
	}

	/*Open the card clicked*/
	function openCard(){
		document.getElementById(cardId).classList.add("show", "open");
	};

	/*Close the unmatched card*/
	function closeCard(element){
		setTimeout(function(){
			document.getElementById(element).classList.remove("show", "open");}, 500);
	}

	/*Check if the cards match*/
	function checkForMatch(){
		openCardList.push(cardId);
		if(!(openCardList.length<2)){
			var card1 = String(openCardList[0]).slice(0,String(openCardList[0]).search("-"));
			var card2 = String(openCardList[1]).slice(0,String(openCardList[1]).search("-"));
			moves++;
			updateMoves();
			if(card1==card2){
				matchedCardList.push(openCardList[0]);
				matchedCardList.push(openCardList[1]);
				if(matchedCardList.length==16){
					updateScore();
					console.log("you win");
				}
			}
			else{
				closeCard(String(openCardList[0]));
				closeCard(String(openCardList[1]));
			}
		openCardList.splice(0,2);
		}
	};

	/*Check if the cards match*/
	function updateMoves(){
		document.querySelector("span.moves").textContent = String(moves);
	};

	/*Highlight the stars based on Score*/
	function updateScore(){
		if (moves<=10){
			score = 3;
		}
		else if (moves<=20){
			score = 2;
		}
		else{
			score = 1;
		}
		for(i=0;i<score;i++){
			document.getElementById(starScore[i].getAttribute("id")).classList.add("highlight");
		}
	}

	/*Reset the score*/
	function resetScore(){
		for(i=0;i<starScore.length;i++){
			document.getElementById(starScore[i].getAttribute("id")).classList.remove("highlight");
		}
	}

});





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

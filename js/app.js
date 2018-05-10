/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


$(document).ready(function(){

	var cardId;
	var openCardList = [];
	var matchedCardList = [];
	var moves = 0;

	$('.card').click(function(event){
		cardId = String(event.target.id);
		console.log (cardId);
		openCard();
		moves++;
		updateMoves();
		checkForMatch();
	});

	//Open the card clicked
	function openCard(){
		console.log("inside openCard");
		document.getElementById(cardId).classList.add("show", "open");
	};

	//Close the unmatched card
	function closeCard(element){
		console.log("inside closeCard");
		setTimeout(function(){
			document.getElementById(element).classList.remove("show", "open");}, 500);
	}

	//Check if the cards match
	function checkForMatch(){
		openCardList.push(cardId);
		if(!(openCardList.length<2)){
			console.log(openCardList);
			var card1 = String(openCardList[0]).slice(0,String(openCardList[0]).search("-"));
			console.log(card1);
			var card2 = String(openCardList[1]).slice(0,String(openCardList[1]).search("-"));
			console.log(card2);
			if(card1==card2){
				matchedCardList.push(openCardList[0]);
				matchedCardList.push(openCardList[1]);
				console.log(matchedCardList);
				if(matchedCardList.length==16){
					console.log("you win");
				}
			}
			else{
				closeCard(String(openCardList[0]));
				closeCard(String(openCardList[1]));
			}
		openCardList.splice(0,2);
		console.log(openCardList);
		}
	};

	//Update the number of moves
	function updateMoves(){
		document.querySelector("span.moves").textContent = String(moves);
	};

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

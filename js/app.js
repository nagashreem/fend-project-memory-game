$(document).ready(function(){

	const deck = document.getElementsByClassName("deck");
	const deckId = document.getElementById("display");
	const htmlTemp = deckId.innerHTML;
	const classArray = document.querySelectorAll(".deck li");
	const idArray = [];

	let starScore = document.querySelectorAll(".fa-star");
	let html = " ";
	let cardId, timer;
	let openCardList = [];
	let matchedCardList = [];
	let moves = 0, hour = 0,minute = 0,second = 0, score = 3;
	let hr = document.querySelector(".hr");
	let min = document.querySelector(".min");
	let sec = document.querySelector(".sec");
	
	
	for(let i = 0; i < classArray.length; i++){	/*Store the ids of all the cards in the deck in idArray */
		idArray[i] = classArray[i].getAttribute("id"); 
	}	

	refreshDeck(); /*Start with a shuffled deck and fresh Score Panel*/

	$('.restart').click(function(){	/*Reshuffle the deck when restart is clicked*/
		refreshDeck();
	});


/*..................Function definitions..............................*/

	/**
	* @description Refreshes the desk, score-panel andall teh variables
	*/
	function refreshDeck() {
		deckId.innerHTML = htmlTemp;
		deckId.classList.remove("final");
		shuffledDeck(idArray);
		cardClick();
		moves = 0;
		hour = 0;
		second = 0;
		minute = 0;
		matchedCardList = [];
		html = " ";
		openCardList = [];
		updateMoves();
		resetScore();
		timer = setInterval(myTimer,1000);/*Start the timer*/
	}

	/**
	* @description Shuffle function from http://stackoverflow.com/a/2450976
	* @param {1} array 
	* @returns shuffled array
	*/
	function shuffle(array) {
	    let currentIndex = array.length, temporaryValue, randomIndex;
	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

	/**
	* @description Update the deck with shuffled cards
	* @param {1} array of card Ids
	*/
	function shuffledDeck(cards) {
		let shuffledList = shuffle(cards);
		for(let shuffledCard of shuffledList) {
			html += `<li class="card" id="${shuffledCard}">${document.getElementById(shuffledCard).innerHTML}</li>`;
		}
		$(deck).empty(); /*Clear the deck*/
		$(deck).append(html);/*Load shuffled cards*/
		clearInterval(timer);/*Clear the previous timer*/
	}

	/**
	* @description Handle the  card click
	*/
	function cardClick() {
		$('.card').click(function(event) {
			cardId = String(event.target.id);/*Store the id of the card clicked in cardId*/
			openCard(cardId);
			checkForMatch(cardId);
		});
	}

	/**
	* @description Open the card clicked
	* @param {1} card 
	*/
	function openCard(card) {
		document.getElementById(card).classList.add("show", "open");
	}

	/**
	* @description Close the unmatched cards
	* @param {1} card 
	*/
	function closeCard(card) {
		setTimeout(function() {
			document.getElementById(card).classList.remove("show", "open");}, 500);
	}

	/**
	* @description Check if the cards match
	* @param {1} card 
	*/
	function checkForMatch(card) {
		
		if(openCardList.indexOf(card) == -1) { /*Proceed only if two different cards are clicked*/
			openCardList.push(card); /*Add cards to the openCardist*/
		
			if(openCardList.length >= 2) { /*Proceed only if there are atleast 2 cards to check for match*/
				let card1 = String(openCardList[0]).slice(0,String(openCardList[0]).search("-")); /*Store details of first card in card1*/
				let card2 = String(openCardList[1]).slice(0,String(openCardList[1]).search("-")); /*Store details of second card in card2*/
				moves++; /*Increment the moves*/
				updateMoves(moves);
				updateScore(moves);
		
				if(card1 == card2) { /*Check if the cards match and if they match, add them to a another list*/
					for(let openCard of openCardList) {
						matchedCardList.push(openCard);
					}
					for(let matchedCard of matchedCardList) {
						document.getElementById(matchedCard).classList.add("match");/*Change the background color of matched cards*/
					}				 
		
					if(matchedCardList.length == 16){ /*Check if all cards are matched*/
						updateScore();
						displayMsg(); 
						clearInterval(timer);/*Stop the timer when all cards are matched*/
					}
				}
				else { /*Close cards if they dont match*/
					for (let openCard of openCardList) {
						closeCard(String(openCard));
					}
				}
			openCardList.splice(0,2); /*Remove the unmatched cards from the openCardList*/
			}
		}
	}

	/**
	* @description Update the no of Moves on the Score panel
	*/
	function updateMoves() {
		document.querySelector("span.moves").textContent = String(moves);
	}

	/**
	* @description Highlight the stars based on Score
	*/
	function updateScore() {
		if (moves <= 15) {
			score = 3;
		}
		else if (moves <= 20) {
			score = 2;
		}
		else {
			score = 1;
		}
		for(let i = score; i < 3; i++) {
			document.getElementById(starScore[i].getAttribute("id")).classList.remove("highlight");
		}
	}

	/**
	* @description Reset the score
	*/
	function resetScore() {
		for(let i = 0; i < starScore.length; i++) {
			document.getElementById(starScore[i].getAttribute("id")).classList.add("highlight");
		}
	}

	/**
	* @description Compute and Display the time elapsed
	*/
	function myTimer() {
		if(second<59) {
			second++;
		}
		else{
			second = 0;
			if(minute<59) {
				minute++;
			}
			else{
				minute=0;
				hour++;
			}
		}
		sec.textContent = ((second<10) ? "0"+second : second);
		min.textContent = ((minute<10) ?  "0"+minute : minute);
		hr.textContent = ((hour<10) ? "0"+hour : hour);
	}

	/**
	* @description Display Message on Completion
	*/
	function displayMsg() {
		deckId.classList.add("final");
		$(deck).empty();
			
		deckId.innerHTML = /*Update the deck to show the Congratulatory message upon matching all the cards*/
		`<div class="win">
			<p class="msg">Congratulations! You Won!</p>
			<p>With ${moves} moves and ${score} stars<p>
			<p>Total time taken: ${hour} hr ${minute} min ${second} sec</p>
			<button class="playAgain" type="button" class="btn btn-primary">Play again</button>
		</div>`;

		$('.playAgain').click(function() {	/*Reshuffle the deck when the player wants to play again*/
			refreshDeck();
		});
	}

});



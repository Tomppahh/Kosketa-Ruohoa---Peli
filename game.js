document.addEventListener("DOMContentLoaded", () => {
	// Elementtien valinnat
	const mainMenu = document.getElementById("main-menu");
	const gameScreen = document.getElementById("game-screen");
	const loseScreen = document.getElementById("lose-screen");
	const winScreen = document.getElementById("win-screen");

	const playButton = document.getElementById("play-button");
	const quitButton = document.getElementById("quit-button");
	const yesButton = document.getElementById("yes-button");
	const noButton = document.getElementById("no-button");
	const hoorayButton = document.getElementById("hooray-button");

	const timerElement = document.getElementById("timer");
	const grassArea = document.getElementById("grass-area");
	const player = document.getElementById("player");

	let timer;
	let timeLeft = 10;
	let gameActive = false;

	// Pelaajan liikuttaminen hiirellä
	gameScreen.addEventListener("mousemove", (e) => {
		if (!gameActive) return;

		const gameRect = gameScreen.getBoundingClientRect();
		const x = e.clientX - gameRect.left - player.offsetWidth / 2;
		const y = e.clientY - gameRect.top - player.offsetHeight / 2;

		// Varmistetaan että pelaaja pysyy pelialueella
		const maxX = gameScreen.offsetWidth - player.offsetWidth;
		const maxY = gameScreen.offsetHeight - player.offsetHeight;

		player.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
		player.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
	});

	// Ruohon koskettaminen
	grassArea.addEventListener("click", () => {
		if (!gameActive) return;

		const playerRect = player.getBoundingClientRect();
		const grassRect = grassArea.getBoundingClientRect();

		// Tarkistetaan koskettaako pelaaja ruohoa
		if (playerRect.bottom >= grassRect.top) {
			gameActive = false;
			clearInterval(timer);
			showWinScreen();
		}
	});

	// Pelin aloitus
	function startGame() {
		mainMenu.classList.add("hidden");
		gameScreen.classList.remove("hidden");
		timeLeft = 10;
		timerElement.textContent = timeLeft;
		gameActive = true;

		// Asetetaan pelaaja alkuasentoon
		player.style.bottom = "150px";
		player.style.right = "150px";

		// Käynnistetään ajastin
		timer = setInterval(() => {
			timeLeft--;
			timerElement.textContent = timeLeft;

			if (timeLeft <= 0) {
				clearInterval(timer);
				gameActive = false;
				showLoseScreen();
			}
		}, 1000);
	}

	// Näytetään häviönäkymä
	function showLoseScreen() {
		gameScreen.classList.add("hidden");
		loseScreen.classList.remove("hidden");
	}

	// Näytetään voittonäkymä
	function showWinScreen() {
		gameScreen.classList.add("hidden");
		winScreen.classList.remove("hidden");
	}

	// Paluu päävalikkoon
	function returnToMainMenu() {
		loseScreen.classList.add("hidden");
		winScreen.classList.add("hidden");
		mainMenu.classList.remove("hidden");
	}

	// Tapahtumakuuntelijat napeille
	playButton.addEventListener("click", startGame);

	quitButton.addEventListener("click", () => {
		window.close(); // Huom: Tämä toimii vain jos käyttäjä on avannut ikkunan JavaScriptillä
		alert("Peli suljettu! Voit sulkea välilehden.");
	});

	yesButton.addEventListener("click", startGame);

	noButton.addEventListener("click", returnToMainMenu);

	hoorayButton.addEventListener("click", returnToMainMenu);
});

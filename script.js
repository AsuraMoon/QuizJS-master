const FORM = document.querySelector(".form-quizz");

let userResponses = [];
let checkArray = [];
const responses = ["a", "b"];

// emojis = ✔️	✨	👀	😭  👎	🤯	😱

const TITLERESULT = document.querySelector(".resultats h2");
const NOTERESULT = document.querySelector(".note");
const HELPRESULT = document.querySelector(".aide");
const ALLQUESTION = document.querySelectorAll(".question-block");

/** Des que l'utilisateur soumet le formulaire grâce à l'eventListener */
FORM.addEventListener("submit", (e) => {
	e.preventDefault();

	/** On boucle sur le tableau des réponses */
	for (let i = 1; i <= responses.length; i++) {
		/** Et on push le resultat du user dans le tableau associer
		 * grâce au querySelector qui récupère la valeur de l'input 'checked' dont la question et q{i}
		 * avec i qui part de 1 jusqu'à responses.length
		 * */
		userResponses.push(
			document.querySelector(`input[name="q${i}"]:checked`).value
		);
	}

	/** On appel la fonction checkIsTrue */
	checkIsTrue(userResponses);
	// ici userResponses = [] pour réinitialiser le tableau d'entré
	userResponses = [];
});

/** Fonction checkIsTrue */
function checkIsTrue(array) {
	/** On boucle tant que i < la longueur de notre tableau de reponse */
	for (let i = 0; i < array.length; i++) {
		/** Si ce que l'utilisateur a envoyé === à l'élément dans notre tableau responses */
		if (array[i] === responses[i]) {
			// on retourne true
			checkArray.push(true);
		} else {
			// sinon false
			checkArray.push(false);
		}
	}

	/** Appel de la fonction displayResult */
	displayResult(checkArray);
	/** Appel à la fonction colorsErrors */
	colorErrors(checkArray);
	/** On réinitialise le tableau checkArray */
	checkArray = [];
}

/** Fonction displayResult */
function displayResult(array) {
	/** Une const qui récupère le nombre d'élement qui sont différent de la valeur true */
	const nbFalse = array.filter((element) => element !== true).length;

	/** Un switch / case pour le retour sur le DOM */
	switch (nbFalse) {
		case 0:
			TITLERESULT.innerText = `Bravo, c'est un sans faute !`;
			HELPRESULT.innerText = "";
			NOTERESULT.innerText = "2/2";
			break;
		case 1:
			TITLERESULT.innerText = `Vous y êtes presque !`;
			HELPRESULT.innerText =
				"Retentez une autre réponse dans la case rouge, puis re-validez !";
			NOTERESULT.innerText = "1/2";
			break;
		case 2:
			TITLERESULT.innerText = `Encore un effort ...`;
			HELPRESULT.innerText =
				"Retentez une autre réponse dans les cases rouges, puis re-validez !";
			NOTERESULT.innerText = "0/2";
			break;
		default:
			"Wops, cas innatendu.";
	}
}

/** Fonction colorErrors */
function colorErrors(arrayBool) {
	/** On boucle tant que i < arrayBool */
	for (let i = 0; i < arrayBool.length; i++) {
		/** Si la valeur contenu dans l'index i === true */
		if (arrayBool[i] === true) {
			// alors on affiche un background de couleur vert
			ALLQUESTION[i].style.background = "lightgreen";
		} else {
			/** Sinon c'est rouge avec l'ajout d'une classe echec */
			ALLQUESTION[i].style.background = "#ffb8b8";
			ALLQUESTION[i].classList.add("echec");

			/** On enlève cette classe au bout de 500 miliseconde grâce à setTimeout
			 * comme ça, si l'utilisateur souhaite de nouveau soumettre le formulaire et qu'il se trompe de nouveau
			 * La classe pourra être de nouveau appliqué
			 */
			setTimeout(() => {
				ALLQUESTION[i].classList.remove("echec");
			}, 500);
		}
	}
}

/** Pour toutes les questions, on créer une boucle forEach (pour chaque)
 * avec associer un eventLister, ici le click
 * pour dire que sur chaque question, dès qu'on click dessus, son background devient blanc.
 */
ALLQUESTION.forEach((question) => {
	question.addEventListener("click", () => {
		question.style.background = "#FFF";
	});
});

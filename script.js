// //novo
// let dictionary
// let cleanDictionary
// let targetWords

// //novo
// function fetchData() {
// 	return new Promise((resolve, reject) => {
// 		var xhrTargetWords = new XMLHttpRequest()
// 		xhrTargetWords.open('GET', 'targetWords.json', true)
// 		xhrTargetWords.onreadystatechange = function () {
// 			if (xhrTargetWords.readyState == 4) {
// 				if (xhrTargetWords.status == 200) {
// 					targetWords = JSON.parse(xhrTargetWords.responseText)

// 					var xhrDictionary = new XMLHttpRequest()
// 					xhrDictionary.open('GET', 'dictionary.json', true)
// 					xhrDictionary.onreadystatechange = function () {
// 						if (xhrDictionary.readyState == 4) {
// 							if (xhrDictionary.status == 200) {
// 								dictionary = JSON.parse(xhrDictionary.responseText)
// 								resolve({ targetWords, dictionary })
// 							} else {
// 								reject(new Error('Failed to fetch dictionary'))
// 							}
// 						}
// 					}
// 					xhrDictionary.send()
// 				} else {
// 					reject(new Error('Failed to fetch target words'))
// 				}
// 			}
// 		}
// 		xhrTargetWords.send()
// 	})
// }

// //novo
// function removeSpecialCharacters(word) {
// 	return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
// }

// //novo
// async function fetchDataAndUse() {
// 	try {
// 		const { targetWords, dictionary } = await fetchData()
// 		cleanDictionary = dictionary.map(word => removeSpecialCharacters(word))
//     console.log(dictionary)
//     console.log(cleanDictionary)
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
// //novo
// fetchDataAndUse()

// const WORD_LENGTH = 5
// const FLIP_ANIMATION_DURATION = 500
// const DANCE_ANIMATION_DURATION = 500
// const keyboard = document.querySelector('[data-keyboard]')
// const alertContainer = document.querySelector('[data-alert-container]')
// const guessGrid = document.querySelector('[data-guess-grid]')
// const offsetFromDate = new Date(2022, 0, 1)
// const msOffset = Date.now() - offsetFromDate
// const dayOffset = msOffset / 1000 / 60 / 60 / 24
// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('word');
// const targetWord = myParam ? decryptWord(myParam) : 'meião' //targetWords[Math.floor(dayOffset)]
// const cleanTargetWord = removeSpecialCharacters(targetWord)

// startInteraction()

// function startInteraction() {
// 	document.addEventListener('click', handleMouseClick)
// 	document.addEventListener('keydown', handleKeyPress)
// }

// function stopInteraction() {
// 	document.removeEventListener('click', handleMouseClick)
// 	document.removeEventListener('keydown', handleKeyPress)
// }

// function handleMouseClick(e) {
// 	if (e.target.matches('[data-key]')) {
// 		pressKey(e.target.dataset.key)
// 		return
// 	}

// 	if (e.target.matches('[data-enter]')) {
// 		submitGuess()
// 		return
// 	}

// 	if (e.target.matches('[data-delete]')) {
// 		deleteKey()
// 		return
// 	}
// }

// function handleKeyPress(e) {
// 	if(document.querySelector("dialog").open) return
  
//   if (e.key === 'Enter') {
// 		submitGuess()
// 		return
// 	}

// 	if (e.key === 'Backspace' || e.key === 'Delete') {
// 		deleteKey()
// 		return
// 	}

// 	if (e.key.match(/^[a-z]$/)) {
// 		pressKey(e.key)
// 		return
// 	}
// }

// function pressKey(key) {
// 	const activeTiles = getActiveTiles()
// 	if (activeTiles.length >= WORD_LENGTH) return
// 	const nextTile = guessGrid.querySelector(':not([data-letter])')
// 	nextTile.dataset.letter = key.toLowerCase()
// 	nextTile.textContent = key
// 	nextTile.dataset.state = 'active'
// }

// function deleteKey() {
// 	const activeTiles = getActiveTiles()
// 	const lastTile = activeTiles[activeTiles.length - 1]
// 	if (lastTile == null) return
// 	lastTile.textContent = ''
// 	delete lastTile.dataset.state
// 	delete lastTile.dataset.letter
// }

// //novo
// function deleteWord(activeTiles) {
// 	activeTiles.forEach(tile => {
// 		tile.textContent = ''
// 		delete tile.dataset.state
// 		delete tile.dataset.letter
// 	})
// }

// function submitGuess() {
// 	const activeTiles = [...getActiveTiles()]
// 	if (activeTiles.length !== WORD_LENGTH) {
// 		showAlert('Só palavras com 5 letras') //modificado
// 		shakeTiles(activeTiles)
// 		deleteWord(activeTiles) //novo
// 		return
// 	}

// 	//novo
// 	// const guess = activeTiles.reduce((word, tile) => {
// 	//   return word + removeSpecialCharacters(tile.dataset.letter);
// 	// }, "");

// 	const guess = activeTiles.reduce((word, tile) => {
// 		return word + tile.dataset.letter
// 	}, '')

// 	if (!cleanDictionary.includes(guess)) {
// 		showAlert('Palavra não aceita') //modificado
// 		shakeTiles(activeTiles)
// 		deleteWord(activeTiles) //novo
// 		return
// 	} 

// 	stopInteraction()
// 	activeTiles.forEach((...params) => flipTile(...params, guess))
// }

// function countLetterOccurrences(word) {
// 	//novo
// 	const letterCount = {}

// 	for (const letter of word) {
// 		if (letterCount[letter]) {
// 			letterCount[letter]++
// 		} else {
// 			letterCount[letter] = 1
// 		}
// 	}
// 	return letterCount
// }

// let letterOccurrences = countLetterOccurrences(cleanTargetWord) //novo

// function flipTile(tile, index, array, guess) {
// 	const letter = tile.dataset.letter
// 	const key = keyboard.querySelector(`[data-key="${letter}"i]`)

// 	setTimeout(() => {
// 		tile.classList.add('flip')
// 	}, (index * FLIP_ANIMATION_DURATION) / 2)

// 	tile.addEventListener(
// 		'transitionend',
// 		() => {
// 			tile.classList.remove('flip')

// 			console.log('---------------------------')
// 			console.log(letter)

// 			const hasOccurence = letter => {
// 				//novo
// 				if (Object.keys(letterOccurrences).includes(letter)) {
// 					return letterOccurrences[letter] > 0
// 				}
// 				return false
// 			}

//       //novo
//       if(index == 0){
//         for (const item in cleanTargetWord) {
//           console.log(cleanTargetWord[item], guess[item])
//           if (cleanTargetWord[item] === guess[item]) {
//             console.log('dentro')
//             letterOccurrences[cleanTargetWord[item]]-- //novo
//             console.log(letterOccurrences)
//           }
//         }
//       }
			

// 			if (cleanTargetWord[index] === letter) {
// 				tile.innerText = targetWord[index]
//         tile.dataset.state = 'correct'
// 				key.classList.add('correct')
// 				console.log('cleanTargetWord[index] === letter')
// 			} else {
// 				if (hasOccurence(letter)) {
// 					tile.dataset.state = 'wrong-location'
// 					key.classList.add('wrong-location')
// 					letterOccurrences[letter]-- //novo
// 				} else {
// 					tile.dataset.state = 'wrong'
// 					key.classList.add('wrong')
// 				}
// 			}

// 			if (index === array.length - 1) {
// 				tile.addEventListener(
// 					'transitionend',
// 					() => {
// 						startInteraction()
// 						checkWinLose(guess, array)
// 						letterOccurrences = countLetterOccurrences(cleanTargetWord) //novo
// 					},
// 					{ once: true }
// 				)
// 			}
// 		},
// 		{ once: true }
// 	)
// }

// function getActiveTiles() {
// 	return guessGrid.querySelectorAll('[data-state="active"]')
// }

// function showAlert(message, duration = 1000) {
// 	const alert = document.createElement('div')
// 	alert.textContent = message
// 	alert.classList.add('alert')
// 	alertContainer.prepend(alert)
// 	if (duration == null) return

// 	setTimeout(() => {
// 		alert.classList.add('hide')
// 		alert.addEventListener('transitionend', () => {
// 			alert.remove()
// 		})
// 	}, duration)
// }

// function shakeTiles(tiles) {
// 	tiles.forEach(tile => {
// 		tile.classList.add('shake')
// 		tile.addEventListener(
// 			'animationend',
// 			() => {
// 				tile.classList.remove('shake')
// 			},
// 			{ once: true }
// 		)
// 	})
// }

// function checkWinLose(guess, tiles) {
// 	const remainingTiles = guessGrid.querySelectorAll(':not([data-letter])')
// 	if (guess === cleanTargetWord) {
// 		//novo
// 		if (remainingTiles.length === 25) showAlert('Baita chute!', 5000)
// 		if (remainingTiles.length === 20) showAlert('Parabéns!', 5000)
// 		if (remainingTiles.length === 15) showAlert('Boa!', 5000)
// 		if (remainingTiles.length === 10) showAlert('Demorou hein!', 5000)
// 		if (remainingTiles.length === 5) showAlert('Até que enfim!', 5000)
// 		if (remainingTiles.length === 0) showAlert('Ufa!', 5000)

// 		danceTiles(tiles)
// 		stopInteraction()
// 		return
// 	}

// 	if (remainingTiles.length === 0) {
// 		showAlert('Palavra certa: ' + targetWord.toUpperCase(), null) //modificado
// 		stopInteraction()
// 	}
// }

// function danceTiles(tiles) {
// 	tiles.forEach((tile, index) => {
// 		setTimeout(() => {
// 			tile.classList.add('dance')
// 			tile.addEventListener(
// 				'animationend',
// 				() => {
// 					tile.classList.remove('dance')
// 				},
// 				{ once: true }
// 			)
// 		}, (index * DANCE_ANIMATION_DURATION) / 5)
// 	})
// }

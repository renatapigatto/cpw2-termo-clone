//novo
let dictionary
let cleanDictionary
let targetWords

//novo
function fetchData() {
	return new Promise((resolve, reject) => {
		var xhrTargetWords = new XMLHttpRequest()
		xhrTargetWords.open('GET', 'targetWords.json', true)
		xhrTargetWords.onreadystatechange = function () {
			if (xhrTargetWords.readyState == 4) {
				if (xhrTargetWords.status == 200) {
					targetWords = JSON.parse(xhrTargetWords.responseText)

					var xhrDictionary = new XMLHttpRequest()
					xhrDictionary.open('GET', 'dictionary.json', true)
					xhrDictionary.onreadystatechange = function () {
						if (xhrDictionary.readyState == 4) {
							if (xhrDictionary.status == 200) {
								dictionary = JSON.parse(xhrDictionary.responseText)
								resolve({ targetWords, dictionary })
							} else {
								reject(new Error('Failed to fetch dictionary'))
							}
						}
					}
					xhrDictionary.send()
				} else {
					reject(new Error('Failed to fetch target words'))
				}
			}
		}
		xhrTargetWords.send()
	})
}

//novo
function removeSpecialCharacters(word) {
	return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

//novo
async function fetchDataAndUse() {
	try {
		const { targetWords, dictionary } = await fetchData()
		cleanDictionary = dictionary.map(word => removeSpecialCharacters(word))
	} catch (error) {
		console.error(error)
	}
}
//novo
fetchDataAndUse()

const WORD_LENGTH = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector('[data-keyboard]')
const alertContainer = document.querySelector('[data-alert-container]')
const guessGrid = document.querySelector('[data-guess-grid]')
const offsetFromDate = new Date(2022, 0, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('word');
const targetWord = myParam ? decryptWord(myParam).toString(CryptoJS.enc.Utf8) : 'meião' //targetWords[Math.floor(dayOffset)]
const cleanTargetWord = removeSpecialCharacters(targetWord)

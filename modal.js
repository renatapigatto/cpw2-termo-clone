const dialog = document.querySelector('dialog')
const showButton = document.querySelector('.open-dialog')
const closeButton = document.querySelector('.close-dialog')

showButton.addEventListener('click', () => {
	dialog.showModal()
})

closeButton.addEventListener('click', () => {
	dialog.close()
    clearInputBox ()
    document.querySelector(".output-div").innerHTML = ''
})

function checkInputWord() {
	const input = document.querySelector('input').value

	if (input.length < 5) {
        console.log('entrou')
		triggerError('Palavra deve ter 5 letras!')
        clearInputBox ()
		return
	}

	if (!dictionary.includes(input)) {
		triggerError('Palavra inválida!')
        clearInputBox ()
		return
	}

    createAndShowLink(input)
}


function triggerError(message) {
    const outputDiv = document.querySelector(".output-div")
    const errorParagraph = document.createElement("p")
    outputDiv.innerHTML = ''
    errorParagraph.innerHTML = message
    outputDiv.appendChild(errorParagraph)

    setTimeout(() => {
        errorParagraph.remove();
    }, 3000);
}

function clearInputBox (){
    document.querySelector('input').value = ''
}

function createAndShowLink(word){
    var encryptedWord = encryptWord(word)

    var link = window.location + '?word=' + encryptedWord

    const outputDiv = document.querySelector(".output-div")
    const linkParagraph = document.createElement("p")
    outputDiv.innerHTML = ''
    linkParagraph.innerHTML = link
    outputDiv.appendChild(linkParagraph)
}
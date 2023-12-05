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

    var link = window.location.host + '?word=' + encryptedWord

    const outputDiv = document.querySelector(".output-div")
    const linkParagraph = document.createElement("p")
    outputDiv.innerHTML = ''
    linkParagraph.innerHTML = link
    outputDiv.appendChild(linkParagraph)
}





// function hideError() {
//     const input = document.querySelector('');
//     input.style.display = 'none';
// }

// async function createLink(word) {
// 	const key = await generateKey()
// 	const originalString = word

// 	const encryptedData = await encryptString(key, originalString)
// 	console.log('Encrypted:', encryptedData)

// 	const decryptedString = await decryptString(key, encryptedData)
// 	console.log('Decrypted:', decryptedString)

// 	console.log(window.location.host + '?word=' + encryptedData)
//     //se existir wrod dentro dos query parameters, usa a palavra decriptada ao invés da target word
// }

// // Function to generate a random 256-bit key
// async function generateKey() {
// 	return await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
// }

// // Function to encrypt a string
// async function encryptString(key, word) {
// 	const encoder = new TextEncoder()
// 	const encodedData = encoder.encode(word)

// 	// const iv = crypto.getRandomValues(new Uint8Array(12));
// 	const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedData)

// 	// Convert the array buffer to a hex string
// 	const encryptedHexString = Array.from(new Uint8Array(encryptedData))
// 		.map(byte => byte.toString(16).padStart(2, '0'))
// 		.join('')

// 	return encryptedHexString
// }

// // Function to decrypt an encrypted string
// async function decryptString(key, encryptedHexString) {
// 	// Convert the hex string to an array buffer
// 	const encryptedData = new Uint8Array(encryptedHexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer

// 	// const iv = crypto.getRandomValues(new Uint8Array(12));

// 	const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData)

// 	const decoder = new TextDecoder()
// 	const decryptedString = decoder.decode(decryptedData)

// 	return decryptedString
// }

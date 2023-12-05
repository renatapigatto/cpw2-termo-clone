function encryptWord(word){
    var encryptedWord = CryptoJS.AES.encrypt(word, "myEncryptionKey");

    return encryptedWord
}

function decryptWord(encryptedWord){
    var decryptedWord = CryptoJS.AES.decrypt(encryptedWord, "myEncryptionKey");

    return decryptedWord
}
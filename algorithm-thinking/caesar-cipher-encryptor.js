// 凯撒密码加密机

// O(n) time | O(n) space
function caesarCipherEncryptorOne(str, key) { 
    let secret = []
    key = key % 26;
    for (let letter of str) {
        secret.push(getNewLetteOne(letter, key));
    }
    return secret
}

function getNewLetteOne(letter, key) {
    let newLetterCode = letter.charCodeAt() + key
    if(newLetterCode <= 96){
        newLetterCode = newLetterCode + 26
    }
    if (newLetterCode <= 122) {
        return String.fromCharCode(newLetterCode)
    } else {
        return String.fromCharCode(96 + newLetterCode % 122)
    }
}

// O(n) time | O(n) space   // 改良后key可以为任意值，除了正负无穷外。
function caesarCipherEncryptorTwo(str, key) {  
    let secret = [];
    let strAll = "abcdefghijklmnopqrstuvwxyz";
    key = key % 26;
    for (let letter of str) {
        secret.push(getNewLetterTwo(strAll, letter, key));
    }
    return secret
}

function getNewLetterTwo(strAll, letter, key) {
    let newLetterCode = str.indexOf(letter) + key
    if (newLetterCode <= 96) {
        newLetterCode = 26 + newLetterCode
    }

    if (newLetterCode <= 25) {
        return strAll[newLetterCode]
    } else {
        return strAll[-1 + newLetterCode % 25]
    }
}


let str = "abc";
console.log("one", caesarCipherEncryptorOne(str, 54));
console.log("two", caesarCipherEncryptorTwo(str, -2));



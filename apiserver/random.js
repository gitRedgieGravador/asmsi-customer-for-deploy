module.exports.randomCode = function() {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    var ranArr = []
    while (ranArr.length < 6) {
        if (!result.includes(Math.floor(Math.random() * 10))) {
            ranArr.push(Math.floor(Math.random() * 10))
        }
        if (!result.includes(characters.charAt(Math.floor(Math.random() * charactersLength)))) {
            ranArr.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
        }
    }
    shuffle(ranArr)
    shuffle(ranArr)
    ranArr.forEach(element => {
        result += element
    });
    return result;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
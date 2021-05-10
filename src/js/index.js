const input = document.querySelector('.entry')
const btn = document.querySelector('.btn')
const jumbotron = document.querySelector('.jumbotron')
const resultDiv = document.createElement('div')

let dataInput = null
let result = null

input.addEventListener('change', getDataInput)
btn.addEventListener('click', getResult)

function getResult(e) {
    e.preventDefault()
    
    resultDiv.innerText = `Output: ${parallelSum(convertToNum(dataInput))}`
    jumbotron.append(resultDiv)
}

function getDataInput(e) {
    dataInput = e.target.value
}

function convertToNum(str) {
    return str
            .split(' ')
            .map(elem => +elem)
}

function* combinations(array, length) {
    for (let i = 0; i < array.length; i++) {
        if (length === 1) {
            yield [array[i]]
        } else {
            const remaining = combinations(array.slice(i + 1, array.length), length - 1)
            for (let next of remaining) {
                yield [array[i], ...next]
            }
        }
    }
}

function parallelSum(arr) {
    let result = []
    const range = arr.length / 2
    const averageNum = arr.reduce((a,b) => a + b) / 2

    if(!Number.isInteger(averageNum)) return -1

    for (const combo of combinations(arr, range)) {
        const sum = combo.reduce((a,b) => a + b)
        if (sum === averageNum) {
            combo
                .sort((a,b) => a - b)
                .forEach(elem => result.push(elem))
        }
    }
    return result.length ? result : -1
}


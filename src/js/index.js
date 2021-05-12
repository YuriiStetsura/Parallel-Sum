const input = document.querySelector('.entry')
const btn = document.querySelector('.btn')
const jumbotron = document.querySelector('.jumbotron')
const resultDiv = document.createElement('div')
const errorDiv = document.createElement('div')

let dataInput = null
let result = null

input.addEventListener('change', getDataInput)
btn.addEventListener('click', getResult)

function getResult(e) {
    e.preventDefault()
    
    resultDiv.remove()
    errorDiv.remove()

    if(validate(convertToNumAndSort(dataInput))) {
        return showResult()
    }
    return showError()
}

function validate(arr) {
    if(arr.length === 0) return false
    return arr.every(elem => !isNaN(elem))
}

function getDataInput(e) {
    dataInput = e.target.value
}

function showError() {
    errorDiv.classList.add('alert', 'alert-danger')
    errorDiv.textContent = 'enter valid values!'

    jumbotron.append(errorDiv)
}

function showResult() {
    resultDiv.innerText = `Output: ${parallelSum(convertToNumAndSort(dataInput))}`

    jumbotron.append(resultDiv)
}

function convertToNumAndSort(str) {
    return str
            .split(' ')
            .map(elem => +elem)
            .sort((a,b) => a - b)
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




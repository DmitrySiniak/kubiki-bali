const turnNum = document.querySelector("#turnNum")
const newGame = document.querySelector("#newGame")
const rollDice = document.querySelector("#rollDice")
const diceResult = document.querySelector("#diceResult")
const choiceBtns = document.querySelector("#choiceBtns")
const playersContainer = document.querySelector("#playersContainer")
const playersSelect = document.querySelector("#playersSelect")
const winner = document.querySelector("#winner")

let playersNums = []
let playesAmount
let currentPlayer = 0
let dice1, dice2

rollDice.disabled = true

newGame.addEventListener("click", startNewGame)
rollDice.addEventListener("click", rollDices)

function startNewGame(){
    playersNums = []
    playesAmount = Number(playersSelect.value)

    for(let i = 0; i < playesAmount; i++){
        playersNums.push([1,2,3,4,5,6,7,8,9,10,11,12])
    }

    currentPlayer = 0
    turnNum.textContent = `Очередь игрока ${currentPlayer + 1}`
    winner.textContent = ""
    diceResult.textContent = ""
    choiceBtns.innerHTML = ""

    rollDice.disabled = false

    showNums()
}

function showNums(){
    playersContainer.innerHTML = ""

    playersNums.forEach((nums, index) => {
        const playerDiv = document.createElement("div")
        playerDiv.classList.add("player")

        if(index === currentPlayer){
            playerDiv.classList.add("active")
        }

        const title = document.createElement("h3")
        title.textContent = `Игрок ${index + 1}`

        const numsDiv = document.createElement("div")
        numsDiv.classList.add("numbers")

        nums.forEach(num => {
            const div = document.createElement("div")
            div.textContent = num
            numsDiv.appendChild(div)
        })

        playerDiv.appendChild(title)
        playerDiv.appendChild(numsDiv)
        playersContainer.appendChild(playerDiv)
    })
}

function rollDices(){
    choiceBtns.innerHTML = ""

    dice1 = Math.floor(Math.random() * 6) + 1
    dice2 = Math.floor(Math.random() * 6) + 1

    diceResult.textContent = `Выпало ${dice1} и ${dice2}`

    let currentArray = playersNums[currentPlayer]
    let sum = dice1 + dice2

    const sumBtn = document.createElement("button")
    sumBtn.textContent = "Сумма"

    const separateBtn = document.createElement("button")
    separateBtn.textContent = "Отдельно"

    const skipBtn = document.createElement("button")
    skipBtn.textContent = "Пропуск"

    if(!currentArray.includes(sum)){
        sumBtn.disabled = true
    }

    if(!currentArray.includes(dice1) && !currentArray.includes(dice2)){
        separateBtn.disabled = true
    }

    sumBtn.addEventListener("click", delSum)
    separateBtn.addEventListener("click", delSeparate)
    skipBtn.addEventListener("click", skipTurn)

    choiceBtns.append(sumBtn, separateBtn, skipBtn)

    rollDice.disabled = true
}

function delSum(){
    let currentArray = playersNums[currentPlayer]
    let sum = dice1 + dice2

    

    deleteNum(currentArray, sum)
    checking(currentArray)
}

function delSeparate(){
    let currentArray = playersNums[currentPlayer]

    if(currentArray.includes(dice1)){
        deleteNum(currentArray, dice1)
    }

    if(currentArray.includes(dice2)){
        deleteNum(currentArray, dice2)
    }

    checking(currentArray)
}

function skipTurn(){
    let currentArray = playersNums[currentPlayer]
    checking(currentArray)
}

function deleteNum(array, number){
    let index = array.indexOf(number)
    if(index !== -1){
        array.splice(index, 1)
    }
}

function checking(currentArray){
    showNums()

    if(currentArray.length === 0){
        winner.textContent = `Игрок ${currentPlayer + 1} победил`
        rollDice.disabled = true
        choiceBtns.innerHTML = ""
        return
    }

    currentPlayer = (currentPlayer + 1) % playesAmount
    turnNum.textContent = `Очередь игрока ${currentPlayer + 1}`

    rollDice.disabled = false
    diceResult.textContent = ""
    choiceBtns.innerHTML = ""
}
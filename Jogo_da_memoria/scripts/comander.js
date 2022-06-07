const CARD = "card"
const FRONT =  "front"
const BACK = "back"
const ICON = "icon"
const FLIP = "flip"


function startGame() {

    initializeCards(game.createCardFromTechs())
}

function reset() {
    game.clearCards()
    startGame()
    let gameOver = document.querySelector(".game-over")
    gameOver.style.display = "none"
}

function initializeCards(cards) {
    let grade = document.querySelector("#grade")
    grade.innerHTML = ""
    game.cards.forEach(card => {

        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon
        
        createCardContent(card, cardElement)

        cardElement.addEventListener("click", flipCard)
        grade.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    
    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)

    if (face === FRONT) {

        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = `./imgs/${card.icon}.png`
        cardElementFace.appendChild(iconElement)

    } else {


        cardElementFace.innerHTML = "&lt/&gt"
    }

    element.appendChild(cardElementFace)
}

function flipCard(element) {

    if (game.setCard(this.id)) {
        this.classList.add(FLIP)
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()){
                    let gameOver = document.querySelector(".game-over")
                    gameOver.style.display = "flex"
                }
            } else {

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove(FLIP)
                    secondCardView.classList.remove(FLIP)
                    game.unflipCard()
                }, 1000)
            }
        }
    }
}
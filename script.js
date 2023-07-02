// Třída Calculator poskytuje metody pro vytváření a provádění kalkulačních operací.
class Calculator {
    // Konstruktor třídy Calculator. Vytvoří nový objekt Calculator s danými HTML elementy.
    constructor(prevButton, currButton) {
        this.prevButton = prevButton
        this.currButton = currButton
        this.clear()  // inicializace kalkulačky
    }

    // Metoda pro vymazání stavu kalkulačky.
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    // Metoda pro smazání posledního čísla v aktuálním operandu.
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    // Metoda pro přidání čísla k aktuálnímu operandu.
    appendNumber(number) {
        if (number === "." && this.currOperand.includes(".")) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    // Metoda pro nastavení operace kalkulačky.
    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this,this.prevOperand !== '') {
            this.compute()  // pokud je již nastavena operace, provedeme ji
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    // Metoda pro provedení operace a uložení výsledku do aktuálního operandu.
    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    // Metoda pro převedení čísla na formát vhodný pro zobrazení na obrazovce.
    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    // Metoda pro aktualizaci zobrazení kalkulačky.
    updateDisplay() {
        this.currButton.innerText = this.getDisplayNumber(this.currOperand)
        if (this.operation != null) {
            this.prevButton.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`           
        } else {
            this.prevButton.innerText = ''
        }
    }
}

// Získávání HTML elementů na stránce.
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const prevButton = document.querySelector('[data-prev]')
const currButton = document.querySelector('[data-curr]')

// Vytvoření instance kalkulačky.
const calculator = new Calculator(prevButton, currButton)

// Přidání posluchačů událostí na tlačítka.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})



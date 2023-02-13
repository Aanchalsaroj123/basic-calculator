class Calculator {
    constructor(previousoutput, currentouput) {
        this.previousoutput = previousoutput
        this.currentouput = currentouput
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
   this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendno(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseoperation(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }
    // compute() {
    //     let computation
    //     const prev = parseFloat(this.previousOperand)
    //     const current = parseFloat(this.previousOperand)
    //     if (isNaN(prev) || isNaN(current)) return
    //     switch (this.operation) {
    //         case '+':
    //             computation = prev + current
    //             break
    //         case '-':
    //             computation = prev - current
    //             break
    //         case '*':
    //             computation = prev * current
    //             break
    //         case '÷':
    //             computation = prev / current
    //             break
    //      default:
    //         return

    //     }
    // this.currentOperand=computation
    // this.operation=undefined
    // this.previousOperand=''
    // }
    getdisplayno(number){
        const floatno=parseFloat(number)
        if(isNaN(floatno))return ''
        return floatno.toLocaleString('en')
    }
    updatedisplay() {
        this.currentouput.innerText = this.getdisplayno(this.currentOperand)
        if(this.operation != null){
            this.previousoutput.innerText=`${this.getdisplayno(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousoutput.innerText=''
        }

    }

}


const numberBtn = document.querySelectorAll('[data-number]')
const operationbtn = document.querySelectorAll('[data-operation]')
const deletebtn = document.querySelector('[data-delete]')
const equalebtn = document.querySelector('[data-equale]')
const allclearbtn = document.querySelector('[data-allclear]')
const previousoutput = document.querySelector('[previous-operand]')
const currentouput = document.querySelector('[current-operand]')


const calculator = new Calculator(previousoutput, currentouput)
numberBtn.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendno(button.innerText)
        calculator.updatedisplay()
    })
})
operationbtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay()
    })
})

equalebtn.addEventListener("click", button => {
    calculator.compute()
    calculator.updatedisplay()
})
allclearbtn.addEventListener("click", button => {
    calculator.clear()
    calculator.updatedisplay()
})
deletebtn.addEventListener("click", button => {
    calculator.delete()
    calculator.updatedisplay()
})
import { doSomething } from './js/app'
// import { doSomething } from './js/app'


import './styles/style.scss'

export {
    doSomething,
}


// Add event listener
document.querySelector("#generate").addEventListener('click', doSomething);

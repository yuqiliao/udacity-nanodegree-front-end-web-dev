import { getResults } from './js/app'
import { getData } from './js/app'

import './styles/style.scss'

export {
    getData
}


// Add event listener
document.querySelector("#generate").addEventListener('click', getData);

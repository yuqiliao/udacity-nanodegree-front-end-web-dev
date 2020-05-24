import { getResults } from './js/app'

import './styles/style.scss'

export {
    getResults,
}


// Add event listener
document.querySelector("#generate").addEventListener('click', getResults);

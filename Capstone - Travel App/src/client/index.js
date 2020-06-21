import { displayResults } from './js/app'
import { removeResults } from './js/app'


import './styles/style.scss'


// // try to import images from the client folder to dist folder but failed :(
// function importAll(r) {
//     return r.keys().map(r);
//   }

// const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

// var icon = document.getElementById("tempIcon")
// icon.src = images;


export {
    displayResults,
    removeResults
}


// Add event listener
document.querySelector("#saveButton").addEventListener('click', displayResults);
document.querySelector("#removeButton").addEventListener('click', removeResults);


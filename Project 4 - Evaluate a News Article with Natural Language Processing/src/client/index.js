import { checkUserInput } from './js/checkUserInput'
import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import headerLogo from './assets/ML.png'

var logoImg = document.getElementById("logo")
logoImg.src = headerLogo;

export {
    checkUserInput,
    handleSubmit,
}

import {body} from 'express-validator'

export const registerValidator= [
    body('email',"Textul intordus nu este un Email").isEmail(),
    body('password','parola trebuie sa aiba mai mult de 5 caractere').isLength({min: 5}),
    body('fullName','numele trebuie sa aiba mai mult de 3 caractere').isLength({min: 3}),
    body('avatarUrl',"URL nu a fost introdus corect").optional().isURL(),

]

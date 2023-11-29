import { Router } from "express"
import { urlencoded } from "express";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LocalStorage } from "node-localstorage";
const router = Router();
if (typeof localStorage === "undefined" || localStorage === null) {
    var localStorage = new LocalStorage('./scratch');
}

//Rutas
router.get('/', async (req, res) => {
    console.log(localStorage.getItem('usuario'));
    res.render('index', { title: 'Home Page', usuario: localStorage.getItem('usuario') })
});

router.get('/about', (req, res) => res.render('about', { title: 'About me', usuario: localStorage.getItem('usuario') }))

router.get('/contact', (req, res) => res.render('contact', { title: 'Contact me', usuario: localStorage.getItem('usuario') }))
// Vista del formulario de registro
router.get('/crear-cuenta', (req, res) => res.render('crear-cuenta', { title: 'Crear usuario', usuario: localStorage.getItem('usuario') }))
// Ruta Post para crear cuenta
router.post('/registro', urlencoded({ extended: true }), async (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body;
    try {
        const user = await createUserWithEmailAndPassword(auth, correo, contrasena);
        user.displayName = nombre + ' ' + apellido;
        setTimeout(() => {
            res.redirect('/iniciar-sesion')
        }, 2000);
    } catch (error) {
        localStorage.setItem('error', error.code);
        console.log(localStorage.getItem('error'));
        res.redirect('/errorLogging')
    }
})

// Vista para inciar sesion
router.get('/iniciar-sesion', async (req, res) => {
    res.render('iniciar-sesion', { title: 'Iniciar Sesion', usuario: localStorage.getItem('usuario') })
})

//Ruta Post para el Login
router.post('/iniciar-sesion', urlencoded({ extended: true }), async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const credenciales = await signInWithEmailAndPassword(auth, correo, contrasena)
        let email = credenciales.user.email;
        console.log("correo: "+email);
        localStorage.setItem('usuario', email);
        setTimeout(() => {
            res.redirect('/')
        }, 2000);
    } catch (error) {
        res.redirect('/404')
        console.log(error);
    }
})

// Ruta de salir
router.get('/salir', async (req, res) => {
    await signOut(auth);
     localStorage.removeItem('usuario');
    res.redirect('/')
})


// Ruta Post Save Function
router.post('/guardar', async (req, res)=>{
    console.log(req.body);
    res.send(req.body)
})

// Ruta 404 Page
router.get('/404', (req, res) => {
    res.render('404')
})

router.get('/errorlogging', (req, res) => {
    res.render('errorlogging', {error: localStorage.getItem('error'),usuario: localStorage.getItem('usuario')})
})

export default router;
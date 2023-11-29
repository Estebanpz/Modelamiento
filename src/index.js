import express from "express";
import {dirname, join} from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import morgan from "morgan";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))

// Configuraciones
app.set('view engine', 'ejs');
app.set('views', join(__dirname,'views'))
app.use(indexRoutes)
app.use(express.static(join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

// Iniciar servidor
app.listen(3000, () =>{
    console.log('Servidor corriendo por el puerto' + 3000);
})
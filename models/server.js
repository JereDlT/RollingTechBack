const express = require('express')
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath ='/api/usuarios';

        //conecatar con BD
        this.conectarDB()
        //middlewares
        this.middleares();

        //funcion para las rutas
        this.routes();

    }

    async conectarDB(){
        await dbConnection()
    }

    middleares(){
        //cors
        this.app.use(cors());
        //leer lo q el usuario envia por el cuerpo de la peticion
        this.app.use(express.json());
        //definir la carpeta publica
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'))

    }
    
    listen(){

    
        this.app.listen(this.port,() =>{
            console.log('Server online por puerto', this.port)

        })
    }
}

module.exports = Server;

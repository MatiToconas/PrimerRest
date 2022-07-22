// user - pass: dbUNPAZ : dbUNPAZ
//mongodb+srv://dbUNPAZ:dbUNPAZ@cluster0.vhqdf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express  = require('express');
const mongoose = require('mongoose');
const Meeting = require('./models/meetings');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://dbUNPAZ:dbUNPAZ@cluster0.vhqdf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectados a MongoDB');
}) 
.catch((error) => {
    console.log('Falla al conectarse a MongoDB');
    console.log(error);
});

app.use((req, res, next) => {
    console.log('Solicitud recibida!');
    next();
})

// app.use((req, res, next) => {
//     res.status(404);
//     next();
// })

/*app.get('/api/v1/meetings', (req, res) => {
    const reuniones = [
        {
            title: 'Reunion 01',
            description: 'Presentacion'
        },
        {
            title: 'Reunion 02',
            description: 'Tema 02'
        }
    ]
    res.status(201).json(reuniones);
})

app.get('/api/v1/meetings/:id', (req, res) => {
    const id = req.params.id;
    res.end('Reunion '+id);
})

app.delete('/api/v1/meetings/:id', (req, res) => {
    const id = req.params.id;
    res.end('Reunion '+id+' ELIMINADA');
})

app.post('/api/v1/meetings/', (req, res) => {
    const datosReunion = req.body; // los datos de la reunion
    console.log(datosReunion);
    res.status(201).json({
        message: 'Reunion Creada!',
        datosReunion
    });

});

middleware para cargar nuestras primeras reuniones en la base de datos
*/
app.post('/api/v1/meetings/', (req, res) => {
    const meeting = new Meeting({
        title: req.body.title,
        decription: req.body.decription,
        time: req.body.time,
        userId: req.body.userId
    });
    meeting.save().then(
        () => {
            res.status(201).json({
                message: 'Reunion creada!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

/*
middleware para pedir los datos de una determinada reunión
*/
app.get('/api/v1/meetings/:id', (req, res) => {
    Meeting.findOne({
        _id: req.params.id

    }).then(
        (meeting) => {
            res.status(200).json(meeting);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

/*
middleware para pedir el listado de todas las reuniones
*/
app.get('/api/v1/meetings/', (req, res) => {
    Meeting.find().then(
        (meetings) => {
            res.status(200).json(meetings);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

/*
middleware para modificar los datos de una determinada reunión
*/
app.put('/api/v1/meetings/:id', (req, res) => {
    const meeting = new Meeting({
        _id: req.params.id,
        title: req.body.title,
        decription: req.body.decription,
        time: req.body.time,
        userId: req.body.userId
    });
    Meeting.updateOne({_id: req.params.id}, meeting).then(
        () => {
            res.status(200).json({
                message: 'Reunion actualizada!'

            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

/*
middleware para borrar los datos de una determinada reunión
*/
app.delete('/api/v1/meetings/:id', (req, res) => {
    Meeting.deleteOne({
        _id: req.params.id

    }).then(
        () => {
            res.status(200).json({
                message: 'Reunion ELIMINADA!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = app; // exportamos nuestra app para poder tomerla en el server

const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'timestamp', title: 'Timestamp' },
    ]
});

const apiUrl = 'http://localhost:3000/users'; // Cambia la URL según tu configuración

const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl);
        const users = response.data;

        const records = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            timestamp: new Date().toISOString()
        }));

        csvWriter.writeRecords(records)
            .then(() => console.log('Datos guardados en data.csv'))
            .catch(err => console.error('Error al guardar datos:', err));
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

// Intervalo de tiempo en milisegundos (ejemplo: cada 5 minutos)
const interval = 5 * 60 * 1000;

// Ejecutar fetchData al inicio y luego cada intervalo de tiempo
fetchData();
setInterval(fetchData, interval);

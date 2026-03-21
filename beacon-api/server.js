const express = require('express');
const app = express();
const port = 3000;

// Раздача статики
app.use(express.static('public'));

// Приём beacon-запросов
app.post('/api/analytics', express.text({ type: '*/*' }), (req, res) => {
    console.log('[BEACON] Получены данные:', req.body);
    console.log('[BEACON] Время:', new Date().toISOString());
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});
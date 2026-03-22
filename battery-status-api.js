// Проверяем поддержку API
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        // Получаем уровень заряда (0.0 - 1.0)
        const level = Math.round(battery.level * 100);
        console.log(`Заряд: ${level}%`);
        
        // На зарядке?
        console.log(`На зарядке: ${battery.charging ? 'Да' : 'Нет'}`);
        
        // Время до полной разрядки (в секундах)
        const dischargingTime = Math.round(battery.dischargingTime / 60);
        console.log(`Осталось: ~${dischargingTime} минут`);
        
        // Слушаем изменения
        battery.addEventListener('levelchange', () => {
            const newLevel = Math.round(battery.level * 100);
            console.log(`Заряд изменился: ${newLevel}%`);
            
            if (newLevel < 20) {
                alert('⚠️ Низкий заряд батареи!');
            }
        });
        
        battery.addEventListener('chargingchange', () => {
            console.log(`Режим зарядки: ${battery.charging ? 'Включена' : 'Отключена'}`);
        });
    }).catch(err => {
        console.error('Ошибка доступа к батарее:', err);
    });
} else {
    console.log('Battery Status API не поддерживается');
}
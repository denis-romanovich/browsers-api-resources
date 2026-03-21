// Регистрируем Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('✅ SW зарегистрирован:', reg))
        .catch(err => console.error('❌ Ошибка SW:', err));
}

// Проверка и отображение поддержки Badging API
const statusDiv = document.getElementById('support-status');

function checkSupport() {
    if ('setAppBadge' in navigator) {
        statusDiv.innerHTML = '✅ Badging API поддерживается! Установите приложение для проверки.';
        statusDiv.className = 'status supported';
        return true;
    } else {
        statusDiv.innerHTML = '❌ Badging API не поддерживается. Используйте Chrome/Edge на Windows/macOS.';
        statusDiv.className = 'status unsupported';
        return false;
    }
}

// Установка числового бейджа
async function setBadge(count) {
    if (!checkSupport()) return;
    
    try {
        if (count === 0) {
            await navigator.clearAppBadge();
            console.log('✅ Бейдж очищен');
        } else {
            await navigator.setAppBadge(count);
            console.log(`✅ Бейдж "${count}" установлен`);
        }
    } catch (err) {
        console.error('❌ Ошибка:', err);
        alert('Ошибка: ' + err.message);
    }
}

// Установка пустого бейджа (просто точка)
async function setDotBadge() {
    if (!checkSupport()) return;
    
    try {
        // Вызов без аргументов = просто индикатор
        await navigator.setAppBadge();
        console.log('✅ Установлен бейдж-точка');
    } catch (err) {
        console.error('❌ Ошибка:', err);
        alert('Ошибка: ' + err.message);
    }
}

// Очистка бейджа
async function clearBadge() {
    if (!checkSupport()) return;
    
    try {
        await navigator.clearAppBadge();
        console.log('✅ Бейдж очищен');
    } catch (err) {
        console.error('❌ Ошибка:', err);
        alert('Ошибка: ' + err.message);
    }
}

// Навешиваем обработчики
document.getElementById('set-badge').addEventListener('click', () => {
    const count = parseInt(document.getElementById('badge-count').value);
    setBadge(count);
});

document.getElementById('clear-badge').addEventListener('click', clearBadge);
document.getElementById('set-dot').addEventListener('click', setDotBadge);

// Проверяем поддержку при загрузке
checkSupport();
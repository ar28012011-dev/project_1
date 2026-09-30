/* =========================================================
   ПЕРЕКЛЮЧАТЕЛЬ ТЕМ (light | dark | neon)

   Как это работает:
   1. Скрипт вешает на <html> атрибут data-theme
   2. В CSS по этому атрибуту меняются переменные цвета
   3. Все элементы страницы используют var(...) — поэтому
      цвета меняются сразу у всего сайта
   ========================================================= */

// --- куда сохраняем выбор (чтобы после перезагрузки всё осталось) ---
const STORAGE_THEME = 'theme';         // ключ для темы
const STORAGE_NEON  = 'neonColor';     // ключ для неонового цвета
const DEFAULT_NEON  = '#39ff14';       // зелёный неон по умолчанию

const root       = document.documentElement;           // элемент <html>
const themeBtns  = document.querySelectorAll('[data-theme-btn]'); // кнопки тем
const neonMenu   = document.getElementById('neonMenu');            // меню цветов
const swatches   = document.querySelectorAll('.neon-menu__swatch'); // кружки
const customPick = document.getElementById('neonCustom');          // свой цвет

/**
 * Включает тему.
 * @param {string} theme - 'light' | 'dark' | 'neon'
 */
function setTheme(theme) {
    root.setAttribute('data-theme', theme);   // 1. атрибут на <html>
    localStorage.setItem(STORAGE_THEME, theme); // 2. запоминаем выбор

    // 3. подсвечиваем кнопку активной темы
    themeBtns.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.themeBtn === theme);
    });

    // 4. показываем меню неоновых цветов ТОЛЬКО в неоновой теме
    neonMenu.classList.toggle('is-visible', theme === 'neon');
}

/**
 * Ставит неоновый цвет сайта.
 * @param {string} color - hex вида '#39ff14'
 */
function setNeonColor(color) {
    // CSS-переменная --neon используется в неоновой теме
    root.style.setProperty('--neon', color);
    localStorage.setItem(STORAGE_NEON, color);

    // отмечаем выбранный кружок
    swatches.forEach(s => s.classList.toggle('is-active', s.dataset.color === color));
    customPick.value = color;
}

// --- обработчики кликов ---

// Кнопки тем: Светлая / Тёмная / Неон
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn));
});

// Кружки неоновых цветов
swatches.forEach(swatch => {
    swatch.addEventListener('click', () => setNeonColor(swatch.dataset.color));
});

// Поле выбора своего цвета
customPick.addEventListener('input', (e) => setNeonColor(e.target.value));

// --- запуск: достаём сохранённое или ставим значения по умолчанию ---
setNeonColor(localStorage.getItem(STORAGE_NEON) || DEFAULT_NEON);
setTheme(localStorage.getItem(STORAGE_THEME) || 'light');

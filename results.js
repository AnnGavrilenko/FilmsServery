
document.addEventListener('DOMContentLoaded', function () {
    loadNames();
});

function loadNames() {
    const results = JSON.parse(localStorage.getItem('movieSurveyResults')) || [];
    const namesList = document.getElementById('names');

    // Удаляем дубликаты имен
    //results.map(data => data.name) создает массив с именами из объекта results.
    //new Set(...) создает набор (Set) из этих имен, который автоматически удаляет все дубликаты.
    //Array.from(...) преобразует набор обратно в массив.
    const uniqueNames = Array.from(new Set(results.map(data => data.name)));

    //добавляет каждое уникальное имя в список в виде элемента <option>
    uniqueNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        namesList.appendChild(option);
    });
}


// Обработчик кнопки "Показать результаты (по выбранному имени)"
document.getElementById('showResults').addEventListener('click', function () {
    const nameInput = document.getElementById('nameInput').value;
    loadResults(nameInput);
});

function loadResults(name) {
    const results = JSON.parse(localStorage.getItem('movieSurveyResults')) || [];
    const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    resultsTable.innerHTML = ''; // Очистка таблицы перед отображением

    const filteredResults = results.filter(data => data.name === name); // Фильтрация по имени

    if (filteredResults.length > 0) {
        filteredResults.forEach((data) => {
            const row = document.createElement("tr");
            const row2 = document.createElement("tr");
            row.innerHTML = `
    <th>Имя</th>
    <th>Недели</th>
    <th>Жанр</th>
    <th>Где смотреть</th>
    <th>Комментарий</th>
    <th>Почта</th>
`; 
            row2.innerHTML = `
                <td>${data.name}</td>
                <td>${data.week}</td>
                <td>${data.genre}</td>
                <td>${data.watchingPreference}</td>
                <td>${data.comments}</td>
                <td>${data.email}</td>
            `;
            resultsTable.appendChild(row);
            resultsTable.appendChild(row2);
        });
        resultsTable.style.display = 'table'; // Отображение таблицы, если есть результаты
    } else {
        resultsTable.style.display = 'none'; // Скрытие таблицы, если нет результатов
        alert('Нет данных для выбранного имени.');
    }
}

// Обработчик кнопки "Показать все имена и результаты"
document.getElementById('showAllResults').addEventListener('click', function () {
    loadAllResults();
});
// Функция для загрузки всех результатов
function loadAllResults() {
    const results = JSON.parse(localStorage.getItem('movieSurveyResults')) || [];
    const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    resultsTable.innerHTML = ''; // Очистка таблицы перед отображением

    if (results.length > 0) {
        const row = document.createElement("tr");
            row.innerHTML = `
    <th>Имя</th>
    <th>Недели</th>
    <th>Жанр</th>
    <th>Где смотреть</th>
    <th>Комментарий</th>
    <th>Почта</th>
`; 
resultsTable.appendChild(row);

        results.forEach((data) => {
            const row2 = document.createElement("tr");
            row2.innerHTML = `
                <td>${data.name}</td>
                <td>${data.week}</td>
                <td>${data.genre}</td>
                <td>${data.watchingPreference}</td>
                <td>${data.comments}</td>
                <td>${data.email}</td>
            `;
            resultsTable.appendChild(row2);
        });
        resultsTable.style.display = 'table'; // Отображение таблицы, если есть результаты
    } else {
        resultsTable.style.display = 'none'; // Скрытие таблицы, если нет результатов
        alert('Нет сохранённых данных.');
    }
}




// Обработчик кнопки "Очистить все содержимое таблицы"
document.getElementById('clearAll').addEventListener('click', function () {
    clearAllData();
});
// Функция для очистки всех данных
function clearAllData() {
    if (confirm('Вы уверены, что хотите очистить все данные?')) {
        localStorage.removeItem('movieSurveyResults'); // Очистка localStorage
        const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
        resultsTable.innerHTML = ''; // Очистка таблицы
        resultsTable.style.display = 'none'; // Скрытие таблицы
        alert('Все данные успешно очищены.');
        loadNames(); // Обновление datalist
    }
}
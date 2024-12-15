//onsubmit - событие при отправке формы
document.getElementById("movieSurvey").onsubmit = function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    //Создает новый объект FormData из формы, на которой произошло событие 
    const formData = new FormData(event.target);
    //Преобразует данные формы в объект. fromEntries берет массив пар 
    //[ключ, значение] из formData.entries() и преобразует его в объект.
    const data = Object.fromEntries(formData.entries());

    // Валидация данных
    if (!data.name || !data.week || !data.genre || !data.watchingPreference || !data.email) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    // Получение существующих данных
    //код загружает результаты опроса из локального хранилища, если они существуют, 
    //или создает пустой массив, если его нет
    //(localStorage) — это встроенное хранилище в веб-браузерах, которое позволяет 
    //веб-приложениям сохранять данные локально на компьютере пользователя.

    //получает строковое значение из хранилища localStorage по ключу 'movieSurveyResults'.

    //JSON.parse(...) — преобразует это строковое значение в объект JavaScript (см ниже).
    let results = JSON.parse(localStorage.getItem('movieSurveyResults')) || [];
    

    // Добавление новых данных
    results.push(data);

    // Сохранение данных в localStorage
    localStorage.setItem('movieSurveyResults', JSON.stringify(results));

    // Очистка формы
    event.target.reset();
};

/*document.getElementById("viewResults").onclick = function() {
    // Переход на страницу результатов
    window.location.href = "second.html";
};*/
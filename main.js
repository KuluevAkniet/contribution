fetch('https://dpg.gg/test/calendar.json') // выполнение  GET-запроса по URL для получение данных
.then(data => data.json()) // Обрабатка данные в виде JSON
.then(data => {
   
    const currentDate = new Date(); // Получаем текущую дату
    const startDate = new Date(currentDate - 7 * 24 * 60 * 60 * 1000 * 50); // Вычисление даты, начиная с которой будет построен календарь

     
    const calendar = document.querySelector('.calendar'); // получение HTML элемента 'calendar'

    // выполнение  цикла который создает ячейки для каждого дня, начиная с startDate и до currentDate
    for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const dateString = date.toISOString().split('T')[0]; // Преобразование текущую дату в строку  "год-месяц-день"

      const contributionCount = data[dateString] || 0;// Получение количество контрибуций для текущей даты из data
      //  Добавление класса к  элементу в зависимости от количества контрибуций
      cell.classList.add(
        contributionCount === 0 ? 'no-contributions' :
        contributionCount < 10 ? 'low-contributions' :
        contributionCount < 20 ? 'medium-contributions' :
        contributionCount < 30 ? 'high-contributions' :
        'very-high-contributions'
      );

      calendar.appendChild(cell); // Добавляем созданную ячейку в календарь
    }
})
// Создание таблицы в HTML-документе из данных, хранящихся в памяти браузера в формате JSON
function tableFromJson() {
    // Проверка наличия ключа массива с данными из таблицы в localStorage. Если его там нет, то отрисовываем только заголовок таблицы.
    if (localStorage.getItem('saveObj') == null) {
        let tbl = document.getElementById("catalog"); // в переменной table - элемент DOM с идентификатором id="catalog"
        let tbcptn = document.createElement('caption'); // создаю элемент caption - заголовок таблицы - в переменной tbcptn
        tbcptn.innerHTML = "Дневник чтения"; // с помощью свойства innerHTML записываю внутрь тега caption текст "Дневник чтения"
        let tbdy = document.createElement('tbody'); // создаю элемент tbody - тело таблицы - в переменной tbdy
        // добавляю строку с заголовками столбцов:
        tbdy.innerHTML = "<tr><th>№</th><th>Автор</th><th>Название</th><th>Главные герои</th><th>Страниц</th><th>Дата</th></tr>";
        tbl.append(tbdy); // элемент tbody добавляю после последнего дочернего элемента в table; т.к. там до этого момента было пусто,
        // то получается, что сразу после тега <table> появится элемент <tbody> со всем его содержимым
        tbdy.before(tbcptn); // добавляю заголовок - тег <caption> - перед элементом tbody
    }
    else {
        let dataTable = JSON.parse(localStorage.saveObj); // извлекаю JSON-массив из памяти браузера в переменную dataTable
        let headers = Object.keys(dataTable[0]);  //получаю заголовки столбцов из массива dataTable, они являются ключами объекта - элемента этого массива
        // сохраняю массив заголовков в переменной headers

        let headerRowHTML = '<tr>';  // формирую строку заголовков таблицы
        for (let i = 0; i < headers.length; i++) { // в цикле к тегу <tr> добавляю тег заголовочной ячейки <th> с i-ым элементом массива headers внутри
            headerRowHTML += '<th>' + headers[i] + '</th>';
        }
        headerRowHTML += '</tr>';  // добавляю закрывающий тег строки
        let allRecordsHTML = '';  // в этой переменной буду собирать строку для формирования остальных элементов таблицы
        for (let i = 0; i < dataTable.length; i++) { // цикл по массиву dataTable
            allRecordsHTML += '<tr>'; // добавляю в строку allRecordsHTML тег начала строки
            for (let j = 0; j < headers.length; j++) { // цикл по массиву заголовков
                let header = headers[j]; // в переменной header - ключ j-го столбца
                allRecordsHTML += '<td>' + dataTable[i][header] + '</td>'; // добавляю в строку allRecordsHTML тег ячейки td с i-ым элементом
                // массива dataTable, имеющим ключ header
            }
            allRecordsHTML += '</tr>'; // добавляю закрывающий тег строки
        }
        // Вывод таблицы на html-страницу
        let table = document.getElementById("catalog"); // в переменной table - элемент DOM с идентификатором id="catalog"
        table.innerHTML = headerRowHTML + allRecordsHTML;// склеиваю "шапку" таблицы с остальным содержимым и вывожу в html-документ элемент table
        let caption = table.createCaption(); // создаю элемент caption (заголовок) в таблице
        caption.textContent = "Дневник чтения"; // задаю текстовое содержимое заголовка
    }
}
// Создание нового объекта из полей формы и добавление его через JSON в память браузера
function addBook(){
    // Определение номера строки, в которой будут сохранены данные из формы
    if (localStorage.getItem('saveObj') == null) { // если в памяти браузера не было сохранённого объекта saveObj
        var totalRowCount = 1;  // устанавливаю счётчик строк в 1
    }
    else {
        const myTable = document.getElementById('catalog'); // в переменной myTable - элемент html-документа с id="catalog", т.е. таблица
        totalRowCount = myTable.rows.length; // в переменной totalRowCount - количество строк в таблице. Т.к. 1-ая строка содержит заголовки столбцов, то
        // в этой переменной сейчас номер строки, которую буду добавлять
    }
    const form = document.getElementById('myForm');
    // поиск полей формы по селекторам и сохранение их значений в переменных:
    const author = form.querySelector('[id="author"]'),
        title = form.querySelector('[id="title"]'),
        characters = form.querySelector('[id="characters"]'),
        pages = form.querySelector('[id="pages"]'),
        date = new Date().toLocaleDateString(); // добавляю значение текущей даты
    // собираю в переменной values объект из значений полей формы с соответствующими ключами
    var values = {
        "№": totalRowCount,
        "Автор": author.value,
        "Название": title.value,
        "Главные герои": characters.value,
        "Страниц": pages.value,
        "Дата": date
    }
    tableToJson(values); //  передаю в функцию собранный объект для формирования JSON из существующей на странице таблицы с добавлением нового элемента
    location = location; // обновление страницы браузера
}

// Извлечение данных из таблицы HTML-документа и сохранение их в памяти браузера в формате JSON
function tableToJson(newRow) {
let json = "";  // сначала в переменной json пустая строка
const table = document.getElementById("catalog"); // в константу table помещаю элемент с id=catalog, это таблица со страницыы html-документа
const rowsArr = table.rows; // создаю массив строк таблицы с помощью свойства rows
const headers = []; // массив заголовков, изначально пуст
const jsonData = []; // массив данных из ячеек строки для json, также изначально пуст
    if (localStorage.getItem('saveObj') == null) {    // если в LocalStorage нет JSON с данными из таблицы
        jsonData.push(newRow);  // то добавляю в массив jsonData объект newRow, полученный из формы
    }
    else { // иначе новый объект будет добавлен к уже существующим объектам, сформированным из строк таблицы
        // Извлечение заголовков столбцов:
        for (let i = 0; i < rowsArr[0].cells.length; i++) { // цикл по ячейкам нулевого элемента массива rowsArr (собираю заголовки)
            headers.push(rowsArr[0].cells[i].innerText); // с помошью innerText получаю содержимое i-той ячейки нулевого элемента rowsArr
            // и добавляю eё с помощью push в headers
        }
        // Извлечение данных из ячеек строки:
        for (let i = 1; i < rowsArr.length; i++) {  // цикл по строкам - элементам массива rowsArr
            const rowObject = {}; // создаю объект для хранения данных из строки
            const cells = rowsArr[i].cells; // создаю массив из ячеек i-ой строки rowsArr
            for (let j = 0; j < cells.length; j++) {  // цикл по ячейкам строки
                rowObject[headers[j]] = cells[j].innerText; // создаю объект Строка в виде массива ключей и их значений
                // [заголовок столбца: значение в данной строке, ...]. Значение в j-той ячейке получаю с помошью innerText
            }
            jsonData.push(rowObject); // добавляю объект Строка из переменной rowObject в массив объектов jsonData
        }
        jsonData.push(newRow); // добавляю в массив объект, переданный в качестве аргумента в функцию - данные о новой книге
    }
json = JSON.stringify(jsonData); // преобразую массив объектов jsonData в JSON-строку и сохраняю её в пересенной json
// при использовании JSON.stringify() массивы сериализуются как массивы, в строку JSON включаются также индексы массива от 0 до длины — 1 (включительно)

    localStorage.saveObj = json; // сохраняю в памяти браузера содержимое переменной json
}

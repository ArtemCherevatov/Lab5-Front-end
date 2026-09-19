// ==========================================
// JS ДЛЯ ЗАВДАННЯ 1: Регулярні вирази
// ==========================================
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let data = {};

    // Правила валідації 
    const fields = [
        { id: 'pib', regex: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]+\s[А-ЯІЇЄҐа-яіїєґA-Za-z]\.[А-ЯІЇЄҐа-яіїєґA-Za-z]\.$/, name: 'ПІБ' },
        { id: 'phone', regex: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, name: 'Телефон' },
        { id: 'idcard', regex: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]{2}\s№\d{6}$/, name: 'ID-card' },
        { id: 'faculty', regex: /^[А-ЯІЇЄҐа-яіїєґA-Za-z]{3,}$/, name: 'Факультет' },
        { id: 'bdate', regex: /^\d{2}\.\d{2}\.\d{4}$/, name: 'Дата народж.' }
    ];

    // Перевірка кожного поля
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!field.regex.test(input.value.trim())) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
            data[field.name] = input.value.trim();
        }
    });

    const outputContainer = document.getElementById('dataOutput');
    const outputContent = document.getElementById('outputContent');

    // Виведення результату збоку від форми
    if (isValid) {
        let htmlContent = "";
        for (let key in data) {
            htmlContent += `<div class="output-item"><strong>${key}:</strong> ${data[key]}</div>`;
        }
        outputContent.innerHTML = htmlContent;
        outputContainer.style.display = 'block'; // Показуємо блок з даними
    } else {
        outputContainer.style.display = 'none'; // Ховаємо блок, якщо є помилки
    }
}

// ==========================================
// JS ДЛЯ ЗАВДАННЯ 2: Робота з таблицею та подіями
// ==========================================
const table = document.getElementById('numTable');
let counter = 1;
const variantNumber = 3;

for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
        const cell = document.createElement('td');
        cell.textContent = counter;

        // Додаємо події для клітинки, що відповідає варіанту
        if (counter === variantNumber) {
            // 1. При наведенні (mouseover) - випадковий колір
            cell.addEventListener('mouseover', function() {
                const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                this.style.backgroundColor = randomColor;
            });

            // 2. При кліку (click) - обраний колір з палітри
            cell.addEventListener('click', function() {
                const selectedColor = document.getElementById('colorPicker').value;
                this.style.backgroundColor = selectedColor;
            });

            // 3. При подвійному кліку (dblclick) - зафарбування головної діагоналі (для 3 варіанту)
            cell.addEventListener('dblclick', function() {
                const selectedColor = document.getElementById('colorPicker').value;
                const rows = table.getElementsByTagName('tr');
                for (let r = 0; r < 6; r++) {
                    const diagonalCell = rows[r].getElementsByTagName('td')[r];
                    diagonalCell.style.backgroundColor = selectedColor;
                }
            });
        }
        
        row.appendChild(cell);
        counter++;
    }
    table.appendChild(row);
}
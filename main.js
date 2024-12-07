//Витягую елементи з HTML файлу.
let userForm = document.getElementById('userForm');
let pairInput = document.getElementById('pairInput');
let valueField = document.getElementById('valueField');
let buttonAdd = document.getElementById('buttonAdd');
let buttonDelete = document.getElementById('buttonDelete');
let buttonSortByName = document.getElementById('buttonSortByName');
let buttonSortByValue = document.getElementById('buttonSortByValue');
let warningMessage = document.getElementById('warningMessage')

userForm.onsubmit = function (event) {
    event.preventDefault();
};// Вимкнення перезавантаженя сторінки.

buttonAdd.onclick = function () {
    let userPair = pairInput.value.replace(/\s/g, '');//Видалення пробілів
    if (userPair.match(/^[a-zA-Z0-9]+=[a-zA-Z0-9]+$/)) {//Перевірка на правильність
        let pairLine = document.createElement('p');
        pairLine.innerText = userPair;
        valueField.appendChild(pairLine);//Додавання пари в документ
        warningMessage.style.display = 'none';//Видалення попереджувального повідомлення
        let name = userPair.split('=')[0];
        let value = userPair.split('=')[1];//Витянування імені та значення пари
        localStorage.setItem(JSON.stringify(name), JSON.stringify(value));//Додавання пари в сховище
    } else {
        warningMessage.innerText = 'Unavailable pair. Pair must look like "Name=Value".';
        warningMessage.style.display = 'block';//Додавання попереджувального повідомлення
    }
};//Функція на кнопку "Add"

buttonDelete.onclick = function () {
    let userPair = pairInput.value.replace(/\s/g, '');//Видалення пробілів
    let pairsLines = valueField.children;//Витягування пар з HTML
    for (let i = 0; i < pairsLines.length; i++) {//Перебір пар
        if (pairsLines[i].textContent === userPair) {//Перевірка на правильну пару
            valueField.removeChild(pairsLines[i]);//Видалення пари
            warningMessage.style.display = 'none';//Видалення попереджувального повідомлення
            let name = userPair.split('=')[0];//Витягування імені пари
            localStorage.removeItem(JSON.stringify(name));//Видалення зі сховища
        } else {
            warningMessage.innerText = 'Pair is not found.';
            warningMessage.style.display = 'block';//Додавання попереджувального повідомлення
        }
    }
};//Функція на кнопку "Delete"

buttonSortByName.onclick = function () {
    let pairsLines = Array.from(valueField.children);//Створення масиву з пар
    let sortedPairsByName = pairsLines.sort((a, b) => {//Сортування пар за ім'ям
        let nameOfFirstLine = a.textContent.split('=')[0];
        let nameOfSecondLine = b.textContent.split('=')[0];//Витягую ім'я з пари першого та другого рядка
        return nameOfFirstLine.localeCompare(nameOfSecondLine);//Повертання сортованих імен
    });
    valueField.innerText = '';//Очищення несортованих значень
    for (let i = 0; i < sortedPairsByName.length; i++) {//Перебір відсортованих пар
        let pairLine = document.createElement('p');
        pairLine.innerText = sortedPairsByName[i].textContent;
        valueField.appendChild(pairLine);//Додавання відсортованих за ім'ям пар
    }
};//Функція на кнопку "Sort by name"

buttonSortByValue.onclick = function () {
    let pairsLines = Array.from(valueField.children);//Створення масиву з пар
    let sortedPairsByValue = pairsLines.sort((a, b) => {//Сортування пар за значенням
        let valueOfFirstLine = a.textContent.split('=')[1];
        let valueOfSecondLine = b.textContent.split('=')[1];//Витягування значень з пар першого та другого рядка
        return valueOfFirstLine.localeCompare(valueOfSecondLine);//Повертання сортованих значень
    });
    valueField.innerText = '';//Очищення несортованих значень
    for (let i = 0; i < sortedPairsByValue.length; i++) {//Перебір відсортованих пар
        let pairLine = document.createElement('p');
        pairLine.innerText = sortedPairsByValue[i].textContent;
        valueField.appendChild(pairLine);//Додавання відсортованих за значенням пар
    }
};//Функція на кнопку "Sort by value"



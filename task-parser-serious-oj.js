// ==UserScript==
// @name         task-parser-serious-oj
// @namespace    http://tampermonkey.net/
// @version      2024-05-09
// @description  try to take over the world!
// @author       Araf Al Jami
// @match        https://judge.eluminatis-of-lu.com/p/*
// @match        https://judge.eluminatis-of-lu.com/contest/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eluminatis-of-lu.com
// @grant        none
// ==/UserScript==

window.parse_task = () => {
     const titleElement = document.getElementsByClassName("location-current")[0];
     const taskName = titleElement.innerText;
     const timeLimitElement = document.getElementById("time_limit");
     const memoryLimitElement = document.getElementById("memory_limit");
     const timeLimitStr = timeLimitElement.innerText;
     const memoryLimitStr = memoryLimitElement.innerText;
     const inputElements = document.getElementsByClassName("test-case-input");
     const outputElements = document.getElementsByClassName("test-case-output");
     const inputs = [...inputElements].map(el => el.innerText.slice(0, -7));
     const outputs = [...outputElements].map(el => el.innerText.slice(0, -7));
     console.log('taskName:', taskName);
     console.log('timeLimitStr:', timeLimitStr);
     console.log('memoryLimitStr:', memoryLimitStr);
     console.table(inputs);
     console.table(outputs);
     const task = {
         'name': taskName,
         'tests': []
     }
     for (let i = 0; i < inputs.length; i++) {
         task['tests'].push({
             'input': inputs[i],
             'output': outputs[i],
         })
     }
     console.log(task);
     fetch('http://localhost:4244/', { method: 'POST', body: JSON.stringify(task) })
}

function add_parse_task_button(el) {
    el.innerHTML += `<li class="menu__seperator"></li>`;
    el.innerHTML += `<li class="menu__item"><button onclick="parse_task()" class="menu__link"><span class="icon icon-flag"></span>Parse Task</button></li>`;
}

(function() {
    'use strict';
     const titleElement = document.querySelectorAll(".section--problem-sidebar .menu")[0];
     add_parse_task_button(titleElement);
})();

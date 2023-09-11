window.addEventListener('DOMContentLoaded', function () {

    'use strict'
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i); 
                    break;
                };
            }

        }
    });

    hideTabContent(1);

    // Timer

    let deadline = '2023-09-12';

    function getTimeRemaining(endtime) {
        let t = Date.parse(deadline) - Date.parse(new Date), // Отнимает от дедлайна настощене время и получаем миллисекунды
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60));


            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }
    };


    function setClock(id, endtime) {
        let timer = document.getElementById('timer'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime)
            
            if (t.hours < '10') {
                hours.textContent = `0${t.hours}`
            } else {
                hours.textContent = t.hours;
            }

            if (t.minutes < '10') {
                minutes.textContent = `0${t.minutes}`
            } else {
                minutes.textContent = t.minutes;
            }

            if (t.seconds < '10') {
                seconds.textContent = `0${t.seconds}`
            } else {
                seconds.textContent = t.seconds;
            }
            
          
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                
            }
        }
    }


    setClock('timer', deadline);

   //Model
   let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');


    more.addEventListener('click', function () {
        overlay.style.display = 'block'; // Делаю дбъект блоком
        this.classList.add('more-splash'); // Добавляю класс more-splash
        document.body.style.overflow = 'hidden'; // Свойство которое не повзваоляет крутить страницу
    })

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash')
        document.body.style.overflow = ''; 
        
    })
    let descriptionBlock = document.querySelector('.info');

    descriptionBlock.addEventListener('click', function (event) {
        if (event.target.matches('.description-btn')) {
            overlay.style.display = 'block'; // Делаю дбъект блоком
            this.classList.add('more-splash'); // Добавляю класс more-splash
        }

        
    });
    // FORM


    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form');

    // Send Form
    function SendForm(elem) {
        let statusMsg = document.createElement('div'); // Создаю блок со статусом отправки
        elem.appendChild(statusMsg);
      
        function postData(data) { // Создаю дочернюю функцию postData для отправки самого запроса
          return new Promise(function(resolve, reject) { // Создаю новый промис 
            let request = new XMLHttpRequest(); // Создаю новый запрос
            request.open('POST', 'server.php'); // Устанавливаю метод запроса и путь к самоу серверу
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Создаю голову запроса
            request.send(data); // Отправка
      
            request.addEventListener('readystatechange', function() { // Событие после подтверждения
              if (request.readyState < 4) { // Проверяю на удачу
                resolve(); // Успех
              } else if (request.status == 200 && request.readyState === 4) {
                resolve(); // Успех
              } else {
                reject(); // Ошибка
              }
            });
          });
        }
      
        elem.addEventListener('submit', function(event) { // Обработчик события submit
          event.preventDefault(); // Метод для защиты от перезагрузки страницы
       
          let formContactData = new FormData(elem); // Создаю новый конструктор FormData (упаковщик для отправки на сервер)
      
          postData(formContactData)
            .then(() => (statusMsg.textContent = 'Loading...')) //  Вывод пользователю о загрузке отправки
            .then(() => (statusMsg.textContent = 'Success!')) //  Вывод пользователю о успешной отправки
            .catch(() => (statusMsg.textContent = 'Failure.')) //  Вывод пользователю о неудачной отправке
            .then(() => {
              elem.reset(); // Отчистка инпутов после завершения всех методов
            });
        });
      }
      
      
      SendForm(contactForm);
      SendForm(form);
  
})
        
        
    


        
    





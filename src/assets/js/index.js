import {request} from './module/request';

const images = document.querySelectorAll('.section-about-inner_second__img');
const imagesWrap = document.querySelectorAll('.section-about-inner_second');
const imagesUrl = ['https://i.stack.imgur.com/KP1tW.png', 'https://cache.jsfeeds.com/tza0uipxtxxV0sybxkgM0zumueHoimUs_wq0nheHtdt09s_-81s_20wgcdzcg.dwmattg0rl-zan0mvljnzlfedns_.:bxazm_img.jpg', 'https://i.stack.imgur.com/uQKza.png', 'https://appdividend.com/wp-content/uploads/2019/03/Javascript-Array-Every-Example.png'];
const img = document.querySelector('.section-about__main-img');

let x = 0;


// Вставка изображения в main-img
const showImg = () => {
  img.style.backgroundImage = `url('${imagesUrl[x]}')`;

  imagesWrap.forEach(element => {
    if (Boolean(element.style.borderColor) || element.style.borderColor === 'transparent') {
      element.style.borderColor = 'transparent';
    }
  })

  imagesWrap[x].style.borderColor = 'rgb(255, 115, 0)';
}

// 
images.forEach((element, index) => {
  element.addEventListener('click', () => {
    x = index;
    showImg();
  })
})


const arrows = [...img.children];
arrows.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    if (index === 0 ) {

      if (x === 0) {
        x = (images.length -1);
      } else {
        x -= 1;
      }

    } else if (index === 1) {

      if (x === (images.length -1)) {
        x = 0;
      } else {
        x += 1;
      }

    }

    showImg();
  })
})




//AJAX запрос







const requestURL = 'http://localhost:5000/comments';
// Делаем запрос
request(requestURL)
  .then(data => {

    // Получаем ответ и обрабатываем данные

    // Создаем объекс с комменариями
    const comments = new Comments(JSON.parse(data));
    // Создаем HTML элементы для каждого комменария
    comments.createHtmlComments();
    // Рендерим HTML элемент в нужное место
    comments.append();
    // Обрабатываем события
    comments.hundlres();

  })
  .catch(error => {
    console.log(error);
  })



class Comments {
  constructor(data) {
    this.data = data;
    this.commentsHTML = [];
  }


  // Функция создающая массив HTML элементов из объектов
  createHtmlComments () {
    // Итерируем полученные объекты
    this.data.forEach(element => {
      // Создаем объект с комментарием
      let comment = new CommentHandler(element);
      // Вызываем функцию которая созадет из объекта HTML элемент
      comment.createHtmlComment(element)
      // Направляем в пустой массив все HTML элементы
      this.commentsHTML.push(comment)
    })
  }
  // Функция которая в зависомости от входного объекта рендерит HTML элемент в нужное место страницы
  append () {
    // Итерируем HTML элементы
    this.commentsHTML.forEach(element => {
      // Определяем уровень в котором находятся комментарии
      if(element.level) {// Если это первый уровень тогда...
        // Заново итерируем HTML элементы
        this.commentsHTML.forEach(newElement => {
          if (newElement.id === element.toWhom) {// Находим там комментарий который направлен к другому комментарию
            
            // Тепер определяем уровень данного комментария, если он равен нулю, тогда мы в его дочерний элемент(.comment__answers) рендерим нужный комменатрий, если уровень этого комментария уже максимален, тогда мы рендерим его в родительский(.comment__answers)
            if (!newElement.level) {
              newElement.commentHTML.querySelector('.comment__answers').append(element.commentHTML);
            } else {
              newElement.commentHTML.closest('.comment__answers').append(element.commentHTML);
            }

          }
        })
      } else {// Если это нулевой уровень, тогда мы в .section-comment__blocks рендерим все подходящие HTML элементы
        document.querySelector('.section-comment__blocks').append(element.commentHTML);
      }
    })
  }

  hundlres() {// Обработчики
    // Итерируем HTML элементы
    // this.commentsHTML.forEach(item => {
    //   console.log(window.getComputedStyle(item.commentHTML).height)
    // })


    this.commentsHTML.forEach((element,i, arr) => {
      this.answer(element, element.commentHTML);
    })

    this.commentsHTML.forEach((element,i, arr) => {
      this.likesAndDislikes(element, element.commentHTML);
    })

    this.commentsHTML.forEach((element,i, arr) => {
      this.showAnswers(element, element.commentHTML);
    })
  }


  answer(element, HTML) {// При клике на .comment__answer-button создает форму
    HTML.querySelector('.comment__answer-button').addEventListener('click', () => {
      this.data.forEach(dataElement => {
        // Итерируем данные полученные с базы данных
        if(element.id === dataElement.id) { // Находим в базе данных элементы совпадающие по id с нажатым элементом и получаем оттуда необходимые данные
          HTML.querySelector('.comment__answer').innerHTML = `
          <div class='answer'>
            <div class='answer__form'>
              <textarea class='answer__textarea' rows="5">@${dataElement.name}</textarea>
              <button class='answer__cancel'>Отменить</button>
              <button class='answer__send-message'>Отправить</button>
            </div>
          </div>
          `;
        
          HTML.querySelector('.answer__cancel').addEventListener('click', (e) => {
            e.target.closest('.answer').remove();
          })
        }
      })
    })
  }

  likesAndDislikes(element, HTML) { // При клике на лайк или дизлайк меняет цвет и увеличивает или уменьшает значение
    let like = HTML.querySelector('.comment__like');
    let dislike = HTML.querySelector('.comment__dislike');

    // Булевые значения неободимые для условных конструкций
    let firstFlag = true; // Если firstFlag === true , тогда цвет firstColor становится secondColor иначе если firstFlag === false цвет like становится firstColor
    let secondFlag = true;// Если secondFlag === true , тогда цвет firstColor становится secondColor иначе если firstFlag === false цвет like становится firstColor

    let firstColor = 'black';
    let secondColor = 'blue';

    like.addEventListener('click', () => {// нажатие на like
      this.data.forEach(dataElement => {// Итерируем данные полученные с базы данных
        if(element.id === dataElement.id) { // Находим в базе данных элементы совпадающие по id с нажатым элементом и получаем оттуда необходимые данные
          if (firstFlag) {// Если firstFlag === true тогда делаем цвет secondColor и прибавляем значение лайка
            like.style.color = secondColor;
            like.nextElementSibling.innerHTML = dataElement.likes + 1;

            firstFlag = false;// После флаг меняем на false чтобы при повторном нажатии выполнялось другое условие
            

            if (!secondFlag) { // Также смотрим если secondFlag === false тогда значение dislike мы должны изменить
              dislike.style.color = firstColor; // Меняем цвет на firstColor
              dislike.nextElementSibling.innerHTML = dataElement.dislikes; // Также меняем значение dislike

              secondFlag = true; // При измене цвета должон поменяться значение флага
            }

          } else { // Если firstFlag === false тогда делаем цвет firstColor и делаем значение лайка по умолчанию
            like.style.color = firstColor;
            like.nextElementSibling.innerHTML = dataElement.likes;

            firstFlag = true; // Также меняем флажок чтобы при следующем нажатии выполнялась первая инструкция
          }


        }
      })
    })

    // При нажатии на dislike выполняются аналогичные инструкции как и при нажатии на like
    dislike.addEventListener('click', () => {
      this.data.forEach(dataElement => {
        if(element.id === dataElement.id) {


          if (secondFlag) {
            dislike.style.color = secondColor;
            dislike.nextElementSibling.innerHTML = dataElement.dislikes + 1;
      
            secondFlag = false;
      
            if (!firstFlag) {
              like.style.color = firstColor;
              like.nextElementSibling.innerHTML = dataElement.likes;
      
              firstFlag = true;
            }
          } else {
            dislike.style.color = firstColor;
            dislike.nextElementSibling.innerHTML = dataElement.dislikes;
      
            secondFlag = true;
          }


        }
      })
    })

  }

  showAnswers(element, HTML) { // При клике на comment__answers-show скрывает илт показывает ответы к комментарию
    let commentAnswersShow = HTML.querySelector('.comment__answers-show');

    let bool = true; // Булевое значение необходимое для выполнения разных инструкций при разных значениях; значение менятся по нажатию на элемент
    

    if (commentAnswersShow) {
      commentAnswersShow.addEventListener('click', (e) => {
        let commentAnswers = HTML.querySelector('.comment__answers');
        // let HTMLChildrenComments = [...commentAnswers.children];
        // let allHeight = 0;

        // HTMLChildrenComments.forEach((item, i) => {
        //   // if (i < 3) {
        //   allHeight += parseInt(window.getComputedStyle(item).height);
        //   // }
        // })

        if (bool) {
          bool = false
          e.target.innerText = 'Скрыть все ответы';
          commentAnswers.style.display = `block`;
        } else {
          bool = true;
          e.target.innerText = 'Показать все ответы';
          commentAnswers.style.display = `none`;
        }
      })
    }
  }
}


class CommentHandler {
  constructor(element) {
    this.toWhom = element.toWhom;
    this.toWhomLevel = element.toWhomLevel;
    this.id = element.id;
    this.level = element.level;

    this.commentHTML;
  }

  createHtmlComment (element) {
    this.commentHTML = document.createElement('div');
    this.commentHTML.className = 'comment';
    this.commentHTML.innerHTML = `
      <div class="comment-inner">
        <div class="comment-user-img-wrap">
          <div style="background-image: url('${element.photoUrl}');" class="comment-user-img"></div>
        </div>
        <div class="comment__content">
          <div class="comment__content-inner">
            <span class="comment-user-name">${element.name}</span>
            <span class="comment-user-time">${`${(Math.round(element.time/3600))} час. назад`}</span>
          </div>
          <p class="comment__text">${element.text}</p>
          <div class="comment__evaluation-wrap">
            <div class="comment__evaluation" onselectstart="return false">
              <div class="comment__likes">
                <i class="comment__like fa fa-thumbs-up" style="color: black;" aria-hidden="true"></i>
                <span class="comment__all-likes">${element.likes || 0}</span>
              </div>
              <div class="comment__dislikes">
                <i class="comment__dislike fa fa-thumbs-down" aria-hidden="true" style="color: black;"></i>
                <span class="comment__all-dislikes">${element.dislikes || 0}</span>
              </div>
            </div>
            <span class="comment__answer-button">Ответить</span>
          </div>
          <div class="comment__answer">
            
          </div>

          ${this.addHTML(!element.level, '<div class="comment__answers-show">Показать все ответы</div>')}
          
        </div>
        ${this.addHTML(!element.level, `<div class="comment__answers"></div>`)}
      </div>`;
  }

  addHTML(flag, html) {
    if (flag) {
      return html;
    } else {
       return '';
    }
  }
}


const commentBlocksInner = document.querySelector('.section-comment__blocks-inner');
const header = document.querySelector('.header');
// console.log(document.location.origin)
if (document.cookie) {
  let cookies = {};
  document.cookie.split('; ').forEach(item => {
    cookies[item.split('=')[0]] = item.split('=')[1];
  })

  let photoUrl = `${location.origin}/${cookies.photoUrl.replace(/\\/g, '/')}`;



  commentBlocksInner.innerHTML = createHTMLComment(photoUrl, cookies.name);

  header.innerHTML += `
  <div class="header__user">
    <div class="header__user-img-wrap">
      <div class="header__user-img" style="background-image: url('${photoUrl}');"></div>
    </div>
  </div>`

} else {
  commentBlocksInner.innerHTML = createHTMLComment('https://images.wallpaperscraft.ru/image/dym_pelena_fon_svet_krasochnyy_20086_1280x800.jpg', 'Гость');

  header.innerHTML += `
  <div class="header__to-come-in-wrap">
    <div class="header__to-come-in"><a class="header__to-come-in__link" href="/checkIn.html">Войти</a></div>
  </div>`;
}

function createHTMLComment (photoUrl, name) {
  return `
  <div class="section-comment__user-img-wrap">
    <div style="background-image: url('${photoUrl}');" class="section-comment__user-img"></div>
    </div>
    <div class="section-comment__content">
    <div class="section-comment__content-inner">
      <span class="section-comment-user-name">${name}</span>
    </div>
    <form class="section-comment__form" enctype="multipart/form-data">
      <textarea name="textarea" id="" cols="10" rows="5" class="section-comment__textarea" placeholder="Оставьте комментарий"></textarea>
      <span class="section-comment__message">Отправить</span>
      <span class="section-comment__cancel">Отменить</span>
    </form>
  </div>`;
}









const formButton = document.querySelector('.form-message__button');
const formMessage = document.querySelector('.form-message');

formButton.addEventListener('click', (e) => {
  let formData = new FormData(document.querySelector('.form-message'));
  let bool = true;

  for (let key of formData.keys()) {
    if (!Boolean(formData.get(key))) {
      bool = false;
    }
  }

  if (bool) {
    let requestURL = `${document.location.origin}/message`;

    request(requestURL, 'POST', formData)
      .then(data => {
        if(JSON.parse(data)) {
          [...formMessage.querySelectorAll('.form__element')].forEach(item => {
            item.value = '';
          })
          alert("Сообщение отправлено");
        }
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    alert("Заполните все поля!")
  }
})



const commentMessage = document.querySelector('.section-comment__message');

commentMessage.addEventListener('click', () => {
  let formData = new FormData(document.querySelector('.section-comment__form'));
  let bool = true;

  for (let key of formData.keys()) {
    if (!Boolean(formData.get(key))) {
      bool = false;
    }
  }

  formData.append("document.cookies", "123123");

  if (bool) {
    let requestURL = `${document.location.origin}/maincomment`;

    request(requestURL, 'POST', formData)
      .then(data => {
        if(JSON.parse(data)) {
          console.log(JSON.parse(data))
          alert("Сообщение отправлено");
        }
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    alert("Заполните все поля!")
  }
})
import {request} from './module/request';

const button = document.querySelector('.main-check-in__button');
const question = document.querySelector('.main-check-in__question');
const formInner = document.querySelector('.form__inner');


const appendForm = (HTML) => {
  formInner.innerHTML = HTML;
}

const appendFirstForm = () => {
  appendForm(`
    <input type="text" name="name" class="form__input form__input-text" placeholder="Введите ваше имя">
    <input type="password" name="password" class="form__input form__input-password" placeholder="Введите пароль">
    <input type="checkbox" name="checkbox" class="form__checkbox" value="" checked="checked">
  `);
}

const appendSecondForm = () => {
  appendForm(`
    <input type="text" name="name" class="form__input form__input-text" placeholder="Введите ваше имя">
    <input type="password" name="password" class="form__input form__input-password" placeholder="Введите пароль">
    <input type="email" name="email" class="form__input form__input-email" placeholder="Введите Электронную почту">
    <input type="file" name="image" class="form__input form__input-file" id="input-file">
    <label class="form__label" for="input-file">Выберите изображение для вашего профиля</label>
    <input type="checkbox" name="checkbox" class="form__checkbox" value="1" checked="checked">
  `)
}


let bool = true;
button.addEventListener('click', () => {
  if (bool) {
    bool = false;

    button.innerText = 'войти';
    question.innerText = 'Вы можете войти';

    appendSecondForm();
  } else {
    bool = true;

    button.innerText = 'зарегестрироваться';
    question.innerText = 'Вы еще не зарегестрированы ?';

    appendFirstForm();
  }
})




const formButton = document.querySelector('.form__button')
formButton.addEventListener('click', () => {
  let bool = true;
  let formData = new FormData(document.querySelector('.form'));

  for (let key of formData.keys()) {
    if(key !== 'checkbox') {

      if (key === 'image') {
        if (!formData.get(key).name) {
          bool = false;
        }
      } else {
        if (!Boolean(formData.get(key))) {
          bool = false;
        }
      }
    }
  }


  if (bool) {
    let requestURL = `${document.location.origin}/login`;

    request(requestURL, 'POST', formData)
      .then(data => {
        if(!JSON.parse(data).error.flag) {
          let userCookie = JSON.parse(JSON.parse(data).responce);

          for(let key in userCookie) {
            document.cookie = `${key}=${userCookie[key]}`;
          }
          
          document.location.href = document.location.origin;
        } else {
          alert(JSON.parse(data).error.message);
        }
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    alert('Заполните все поля!');
  }
})

// document.cookie = "name=Стас";
// document.cookie = "photoUrl=https://pbs.twimg.com/media/D_M-pFAXYAA3e_9.jpg:large";
// document.cookie = "password=vdfvjdfknv";
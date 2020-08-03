//ИМПОРТЫ
import "./index.css";
import { agoDate } from './js/utils/date';
import { BACK_URL, API_KEY } from './js/constants/constants';
import { Api } from './js/api/MainApi';
import { NewsApi } from './js/api/NewsApi';
import { Header } from './js/components/Header';
import { Popup } from './js/components/Popup';
import { Form } from './js/components/Form';
import { NewsCardList } from './js/components/NewsCardList';


//ПЕРЕМЕННЫЕ
const mainApi = new Api(BACK_URL);

const headerMain = document.querySelector('#header-main');
const headerBlock = document.querySelector('.header');
const header = new Header(headerBlock, headerMain);

const cardbox = document.querySelector('.cardbox');

const signinTemplate = document.querySelector('#popup-signin');
const signupTemplate = document.querySelector('#popup-signup');
const enterTemplate = document.querySelector('#popup-enter');
const popupContainer = document.querySelector('.popup');
const popup = new Popup(popupContainer);

const props = {};


//ЗАПУСК ПРИ ЗАГРУЗКЕ
window.onload = function () {
  getProps()
    .finally(() => {
      header.render(props);
    })
};


//ПРОПСЫ
function getProps() {
  return mainApi.getUserData()
    .then((data) => {
      props.isLoggedIn = true;
      props.userName = data.name;
      props.userEmail = data.email;

      return props;
    })
    .catch(() => {
      props.isLoggedIn = false;
      props.userName = undefined;
      props.userEmail = undefined;
      return props;
    })
}


//КНОПКА АВТОРИЗАЦИИ//ЛОГАУТ//МОБИЛЬНОЕ МЕНЮ
headerBlock.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__auth')) {
    popup.setContent(signinTemplate);
    popup.open();
    const loginFormBlock = document.querySelector('.popup__form_login');
    const loginForm = new Form(loginFormBlock);
    loginForm.setupValidation();
  } else if (event.target.classList.contains('header__logout')) {
    mainApi.logout(props.userEmail)
      .then(() => {
        document.location.href = "/";
      })
  } else if ((window.matchMedia("(max-width: 767px)").matches) & (event.target.classList.contains('header__newsexplorer')) & (!event.target.classList.contains('header__newsexplorer_menu'))) {
    document.querySelector('.header').classList.add('header_menu');
    document.querySelector('.header__newsexplorer').classList.add('header__newsexplorer_menu');
    document.querySelector('.header__nav').classList.add('header__nav_menu');
  } else if ((window.matchMedia("(max-width: 767px)").matches) & (event.target.classList.contains('header__newsexplorer')) & (event.target.classList.contains('header__newsexplorer_menu'))) {
    document.querySelector('.header').classList.remove('header_menu');
    document.querySelector('.header__newsexplorer').classList.remove('header__newsexplorer_menu');
    document.querySelector('.header__nav').classList.remove('header__nav_menu');
  }
})


//ПОПАПЫ, РЕГИСТРАЦИЯ, ВХОД
popupContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__link_login')) {
    popup.close();
    popup.setContent(signinTemplate);
    popup.open();
    const loginFormBlock = document.querySelector('.popup__form_login');
    const loginForm = new Form(loginFormBlock);
    loginForm.setupValidation();
  } else if (event.target.classList.contains('popup__link_register')) {
    popup.close();
    popup.setContent(signupTemplate);
    popup.open();
    const registerFormBlock = document.querySelector('.popup__form_register');
    const registerForm = new Form(registerFormBlock);
    registerForm.setupValidation();
  } else if (event.target.classList.contains('popup__close')) {
    popup.close();
  } else if (event.target.classList.contains('form__button_register')) {
    event.preventDefault();
    const registerFormBlock = document.querySelector('.popup__form_register');
    const registerForm = new Form(registerFormBlock);
    mainApi.signup(
      registerForm.inputEmail.value,
      registerForm.inputPassword.value,
      registerForm.inputName.value
    )
      .then(() => {
        popup.close();
        popup.setContent(enterTemplate);
        popup.open();
      })
      .catch((err) => {
        registerForm.setServerError(err);
      })
  } else if (event.target.classList.contains('form__button_login')) {
    event.preventDefault();
    const loginFormBlock = document.querySelector('.popup__form_login');
    const loginForm = new Form(loginFormBlock);
    mainApi.signin(
      loginForm.inputEmail.value,
      loginForm.inputPassword.value
    )
      .then(() => {
        popup.close();
        getProps()
          .finally(() => {
            header.render(props);
          })
        document.querySelector('.results').classList.add('hidden');
      })
      .catch((err) => {
        loginForm.setServerError(err);
      })
  }
})


//ФОРМА ПОИСКА
const searchForm = document.forms.search;
searchForm.addEventListener('submit', (event) => {
  document.querySelector('.loading').classList.toggle('hidden');
  event.preventDefault();
  const toDate = new Date().toISOString().substr(0, 10);
  const fromDate = agoDate(7);
  const pageSize = 100;

  const newsApi = new NewsApi({
    q: searchForm.elements.keyword.value,
    from: fromDate,
    to: toDate,
    pageSize: pageSize,
    apiKey: API_KEY,
  })

  newsApi.getNews()
    .then((res) => {
      if (searchForm.elements.keyword.value.length == 0) {
        return Promise.reject(res.status);
      }
      const newsCardList = new NewsCardList(mainApi, props, res.articles, cardbox, 3);
      document.querySelector('.results').classList.remove('hidden');
      newsCardList.renderResults();
      document.querySelector('.loading').classList.toggle('hidden');

    })
    .catch((err) => {
      const noNews = [];
      const noCardsList = new NewsCardList(mainApi, props, noNews, cardbox, 3);
      noCardsList.renderError(err);
      document.querySelector('.loading').classList.toggle('hidden');
    })
});


//ИМПОРТЫ
import "./../index.css";
import { BACK_URL } from './../js/constants/constants';
import { Api } from './../js/api/MainApi';
import { Header } from './../js/components/Header';
import { NewsCardList } from './../js/components/NewsCardList';


//ПЕРЕМЕННЫЕ
const mainApi = new Api (BACK_URL);

const headerSaved = document.querySelector('#header-white');
const headerBlock = document.querySelector('.header');
const header = new Header(headerBlock, headerSaved);

const cardbox = document.querySelector('.cardbox');

const articlesAmount = document.querySelector('.articles__amount');
const keywordOne = document.querySelector('.articles__keyword-one');
const keywordTwo = document.querySelector('.articles__keyword-two');
const keywordThree = document.querySelector('.articles__keyword-three');

const props = {};

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

//ЗАПУСК ПРИ ЗАГРУЗКЕ
window.onload = function () {
  getProps()
    .finally(() => {
      if (!props.isLoggedIn) {
        window.location = '/';
      } else {
        header.render(props);
        articlesRender();
        articlesInfoRender(props);
      }
    })
  };

//РЕНДЕР ВИЗИТКИ ПОЛЬЗОВАТЕЛЯ
function articlesInfoRender(props) {
  mainApi.getArticles()
  .then((res) => {
    if (res.data.length == 0) {
      articlesAmount.textContent = `${props.userName}, у вас пока нет сохранённых статей`;
    } else {
      articlesAmount.textContent = `${props.userName}, количество сохранённых статей у вас: ${res.data.length}`;
    }

    const allKeywords = [];
    for (let n = 0; n < res.data.length; n++) {
      allKeywords.push(res.data[n].keyword);
    }

    const keywordCount = {};
  for (let i = 0; i < allKeywords.length; i++) {
    if (keywordCount[allKeywords[i]] == undefined) {
      keywordCount[allKeywords[i]] = 1;
    } else {
      keywordCount[allKeywords[i]] += 1;
    }
  }
  const viewKeys = Object.keys(keywordCount);
  const viewKeysSorted = viewKeys.sort(function(a, b) {
    return keywordCount[b] - keywordCount[a];
  });
    if (viewKeysSorted.length == 1) {
      keywordOne.textContent = viewKeysSorted[0];
    } else if (viewKeysSorted.length == 2) {
      keywordOne.textContent = viewKeysSorted[0];
      keywordTwo.textContent = ` и ${viewKeysSorted[1]}`;
    } else if (viewKeysSorted.length == 3) {
      keywordOne.textContent = viewKeysSorted[0];
      keywordTwo.textContent = `, ${viewKeysSorted[1]}`;
      keywordThree.textContent = ` и ${viewKeysSorted[2]}`;
    } else if (viewKeysSorted.length == 0) {
      keywordOne.textContent = '-';
    } else {
      keywordOne.textContent = viewKeysSorted[0];
      keywordTwo.textContent = `, ${viewKeysSorted[1]}`;
      keywordThree.textContent = ` и ${viewKeysSorted.length - 2} другим`;
    }
  })

}


//РЕНДЕР СОХРАНЕННЫХ СТАТЕЙ
function articlesRender() {
  mainApi.getArticles()
    .then((res) => {
      const ArticlesList = new NewsCardList(mainApi, props, res.data, cardbox, res.data.length);
      ArticlesList.renderArticles();
    })
}


//ЛОГАУТ, МОБИЛЬНОЕ МЕНЮ
headerBlock.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__logout')) {
    mainApi.logout(props.userEmail)
      .then(() => {
        document.location.href = './index.html'
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
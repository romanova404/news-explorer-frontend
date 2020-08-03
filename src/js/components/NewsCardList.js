import { NewsCard } from './../components/NewsCard';

export class NewsCardList {
  constructor(api, props, cardArray, container, arraylength) {
    this._api = api;
    this.props = props;
    this.container = container;
    this.cardArray = cardArray;
    this.arraylength = arraylength;
  }

  renderResults() {
    this.container.innerHTML = "";
    document.querySelector('.not-found').classList.add('hidden');
    if (this.cardArray.length == 0) {
      this.renderError(404);
    } else {
      for (var n = 0; n < this.arraylength; n++) {
        const newsCard = new NewsCard(
          this._api,
          document.forms.search.keyword.value,
          this.cardArray[n].title,
          this.cardArray[n].description,
          this.cardArray[n].publishedAt.substr(0, 10),
          this.cardArray[n].source.name,
          this.cardArray[n].url,
          this.cardArray[n].urlToImage,
        )
        const dom = newsCard.create();
        newsCard.renderIcon(this.props);
        dom.querySelector('.card').addEventListener('click', (event) => {
          if (!event.target.classList.contains('card__bookmark')) {
            window.open(newsCard.cardLink, '_blank');
          }
        })
        this.container.appendChild(dom);
      }
      document.querySelector('.results__more').classList.remove('hidden');
      document.querySelector('.results__more').addEventListener('click', () => {
        this.showMore();
      })
    }
  }


  renderArticles() {
    if (this.cardArray.length == 0) {
      this.container.innerHTML = "<p class='cardbox__text'>Здесь будут ваши сохраненные статьи</p>";
    } else {
      for (var n = 0; n < this.arraylength; n++) {
        const newsCard = new NewsCard(
          this._api,
          this.cardArray[n].keyword,
          this.cardArray[n].title,
          this.cardArray[n].text,
          this.cardArray[n].date.substr(0, 10),
          this.cardArray[n].source,
          this.cardArray[n].link,
          this.cardArray[n].image,
          this.cardArray[n]._id,
        )
        const dom = newsCard.createSaved();

        dom.querySelector('.card').addEventListener('click', (event) => {
          if (!event.target.classList.contains('card__trash')) {
            window.open(newsCard.cardLink, '_blank');
          }
        })
        dom.querySelector('.card__trash').addEventListener('click', (event) => {
          this._api.removeArticle(newsCard.cardId)
            .then(() => {
              const card = event.target.parentNode.parentNode;
              const container = card.parentNode;

              container.removeChild(card);
            })

        });
        this.container.appendChild(dom);
      }
    }
  }


  renderLoader() {
    document.querySelector('.loading').classList.toggle('hidden');
  }

  renderError(err) {
    document.querySelector('.not-found').classList.remove('hidden');
    document.querySelector('.results').classList.add('hidden');
    if (err == 404) {
      document.querySelector('.not-found__title').textContent = "Ничего не найдено";
      document.querySelector('.not-found__text').textContent = "К сожалению, по вашему запросу ничего не найдено";
    } else if (err == 400) {
      document.querySelector('.not-found__title').textContent = "Нечего искать";
      document.querySelector('.not-found__text').textContent = "Пожалуйста, сначала введите тему новости в окно поиска";
    } else {
      document.querySelector('.not-found__title').textContent = "Во время запроса произошла ошибка";
      document.querySelector('.not-found__text').textContent = "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
    }
  }

  showMore() {
    this.renderLoader();
    this.arraylength += 3;
    this.renderResults();
    if (this.cardArray.length < this.arraylength || this.arraylength >= 100) {
      document.querySelector('.results__more').classList.add('hidden');
      this.renderLoader();
    }
    this.renderLoader();
  }
}

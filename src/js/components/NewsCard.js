import { dateForCard } from './../utils/date';

export class NewsCard {
  constructor (api, cardKeyword, cardTitle, cardText, cardDate, cardSource, cardLink, cardPic, cardId = null) {
    this._api = api;
    this.cardPic = cardPic;
    this.cardDate = cardDate;
    this.cardTitle = cardTitle;
    this.cardText = cardText;
    this.cardSource = cardSource;
    this.cardLink = cardLink;
    this.cardKeyword = cardKeyword;
    this.cardId = cardId;
  }


  renderIcon(props) {
    if (!props.isLoggedIn) {
      const cardSuggest = document.createElement('div');
      cardSuggest.classList.add('card__suggest');
      cardSuggest.textContent = "Войдите, чтобы сохранять статьи";
      this.innerDOM.querySelector('.card__bookmark').appendChild(cardSuggest);

    } else {
      if (this.innerDOM.querySelector('.card__suggest')) {
        this.innerDOM.removeChild(this.innerDOM.querySelector('.card__suggest'));
      }

      this.innerDOM.querySelector('.card__bookmark').addEventListener('click', (event) => {
        if(!this.innerDOM.querySelector('.card__bookmark_marked')) {
          event.target.classList.add('card__bookmark_marked');
          this._api.createArticle( this.cardKeyword, this.cardTitle, this.cardText, this.cardDate, this.cardSource, this.cardLink, this.cardPic );
        }
      })
    }
  }


  create() {
    this.innerDOM = document.createRange().createContextualFragment(
    `
    <div class="card">
      <img class="card__pic" alt="Иллюстрация статьи" src="${this.cardPic}"/>
      <div class="card__actions">
        <div class="card__bookmark">
        </div>
      </div>
      <div class="card__textblock">
        <p class="card__date">${dateForCard(this.cardDate)}</p>
        <h3 class="card__title">${this.cardTitle}</h3>
        <p class="card__text">${this.cardText}</p>
      </div>
      <p class="card__source">${this.cardSource}</p>
    </div>`);
    return this.innerDOM;
  }


  createSaved() {
    this.innerDOM = document.createRange().createContextualFragment(
    `
    <div class="card">
      <img class="card__pic" alt="Иллюстрация статьи" src="${this.cardPic}">
      <div class="card__actions">
        <div class="card__keyword">${this.cardKeyword}</div>
        <div class="card__trash">
          <p class="card__suggest">Убрать из сохраненных</p>
        </div>
      </div>
      <div class="card__textblock">
        <p class="card__date">${dateForCard(this.cardDate)}</p>
        <h3 class="card__title">${this.cardTitle}</h3>
        <p class="card__text">${this.cardText}</p>
      </div>
      <p class="card__source">${this.cardSource}</p>
    </div>`);
    return this.innerDOM;
  }


}
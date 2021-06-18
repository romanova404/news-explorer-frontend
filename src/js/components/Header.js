export class Header {
  constructor(headerBlock, themeTemplate) {
    this.headerBlock = headerBlock;
    this.themeTemplate = themeTemplate;
    this.headerBlock.appendChild(this.themeTemplate.content.cloneNode(true));
    }

    render(props) {
      if (props.isLoggedIn) {
        document.querySelector('.header__auth').style.display = 'none';
        document.querySelector('.header__link_saved').style.display = null;
        document.querySelector('.header__logout').style.display = null;
        document.querySelector('.header__logout').textContent = props.userName;

      } else {
        document.querySelector('.header__link_saved').style.display = 'none';
        document.querySelector('.header__logout').style.display = 'none';
        document.querySelector('.header__auth').style.display = null;
      }
    }
}
export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  signup(userEmail, userPassword, userName) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      })
    })
      .then(res => this.getResponseJson(res));
  }

  signin(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      })
    })
      .then(res => this.getResponseJson(res));
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this._getJWTCookie(),
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include',
    })
      .then(res => this.getResponseJson(res));
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this._getJWTCookie(),
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include',
    })
      .then(res => this.getResponseJson(res));
  }

  createArticle( articleKeyword, articleTitle, articleText, articleDate, articleSource, articleLink, articleImage ) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this._getJWTCookie(),
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include',
      body: JSON.stringify({
        keyword: articleKeyword,
        title: articleTitle,
        text: articleText,
        date: articleDate,
        source: articleSource,
        link: articleLink,
        image: articleImage,
      })
    })
      .then(res => this.getResponseJson(res));
  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this._getJWTCookie(),
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'include',
    })
      .then(res => this.getResponseJson(res));
  }

  logout(userEmail) {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + this._getJWTCookie(),
      },
      body: JSON.stringify({
        email: userEmail,
      })
    })
      .then(res => this.getResponseJson(res))
  }


  getResponseJson(res) {
    if (res.ok) {
      return res.json();

    }
    return Promise.reject(res.status);
  }

  _getJWTCookie() {
      var match = document.cookie.match(new RegExp('(^| )' + 'jwt' + '=([^;]+)'));
      if (match) return match[2];
      else return null;
  }
}


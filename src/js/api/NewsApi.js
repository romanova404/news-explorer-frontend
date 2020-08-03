export class NewsApi {
  constructor(options) {
    this.q = options.q;
    this.from = options.from;
    this.to = options.to;
    this.pageSize = options.pageSize;
    this.apiKey = options.apiKey;
  }

  getNews() {
    return fetch(`https://praktikum.tk/news/v2/everything?q=${this.q}&from=${this.from}&to=${this.to}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then(res => this.getResponseJson(res))
  }

  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}
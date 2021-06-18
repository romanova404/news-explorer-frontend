export class Popup {
  constructor(container) {
    this.container = container;
  }

  setContent(template) {
    this.clearContent();
    this.container.appendChild(template.content.cloneNode(true));
  }

  clearContent() {
    while (this.container.hasChildNodes()) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  open() {
    this.container.classList.remove('hidden');
  }

  close() {
    this.container.classList.add('hidden');
    this.clearContent();
  }

}
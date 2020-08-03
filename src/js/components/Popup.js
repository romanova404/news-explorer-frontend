export class Popup {
  constructor(container) {
    this.container = container;
  }

  setContent(template) {
    this.clearContent();
    console.log("шаблон в попап");
    this.container.appendChild(template.content.cloneNode(true));
  }

  clearContent() {
    while (this.container.hasChildNodes()) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  open() {
    console.log('открыть попап (нимношк)');
    this.container.classList.remove('hidden');
  }

  close() {
    console.log('закройс');
    this.container.classList.add('hidden');
    this.clearContent();
  }

}
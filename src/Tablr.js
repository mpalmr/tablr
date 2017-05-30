import parseArgs from './parseArgs';
import components from './components';

export default class Tablr {

  constructor(elements, options = {}) {
    const opts = parseArgs.options(options);
    this.elements = parseArgs.elements(elements);
    this.data = opts.data;
    this.columns = parseArgs.columns(opts.columns);
    this.paginate = opts.paginate;
    if (opts.initialRender) this.render();
  }

  render(element) {
    // Container
    this.table = document.createElement('div');
    this.table.classList.add('tablr');

    // Table
    const tableColumns = this.columns.map(column => ({
      label: column.label || column.id,
    }));
    const table = components.table.table(this.pages()[this.paginate.selectedPage], tableColumns);
    this.table.appendChild(table);

    // Pagination
    if (this.paginate) {
      const controls = components.pagination(this.paginate, this.rows().length);
      if (this.paginate.position === 'bottom') this.table.appendChild(controls);
      else this.table.insertBefore(controls, table);
    }

    // Add to DOM
    const mount = (mountElement) => {
      Array.from(mountElement.childNodes).forEach(a => a.remove());
      mountElement.appendChild(this.table.cloneNode(true));
      this.addEventHandlers(mountElement);
    };

    if (element) mount(element);
    else this.elements.forEach(mountElement => mount(mountElement));

    return this;
  }

  addEventHandlers(element) {
    element.querySelector('.tablr-pagination-button_next').addEventListener('click', () => {
      if (this.paginate.selectedPage < this.pages().length - 1) this.paginate.selectedPage += 1;
      this.render(element);
    });

    element.querySelector('.tablr-pagination-button_previous').addEventListener('click', () => {
      if (this.paginate.selectedPage > 0) this.paginate.selectedPage -= 1;
      this.render(element);
    });

    element.querySelector('.tablr-page-jump-buttons').addEventListener('click', (event) => {
      event.stopPropagation();
      this.paginate.selectedPage = parseInt(event.target.innerText, 10) - 1;
      this.render(element);
    });

    return this;
  }

  rows() {
    return this.data
      .map(row => (Array.isArray(row) ? row : this.columns
        .map(column => column.displayValue(row[column.id]))));
  }

  pages() {
    if (!this.paginate) return this.rows();
    return this.rows().reduce((pages, row, i) => {
      const pageIndex = Math.floor(i / this.paginate.selectedSize);
      if (!pages[pageIndex]) pages[pageIndex] = [row];
      else pages[pageIndex].push(row);
      return pages;
    }, []);
  }
}

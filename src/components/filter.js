function queryInput(options) {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = options.inputValue;
  inputElement.placeholder = options.placeholder;
  return inputElement;
}

export default function filtering(options) {
  const containerElement = document.createElement('div');
  containerElement.classList.add('tablr-filter');
  containerElement.appendChild(queryInput(options));
  return containerElement;
}

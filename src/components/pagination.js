function adjacentButton(classModifier, label) {
  const buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode(label));
  buttonElement.classList
    .add('tablr-pagination-button', `tablr-pagination-button_${classModifier}`);
  return buttonElement;
}

function pageSizeSelect(size, textBefore, textAfter) {
  const selectElement = size.reduce((element, a) => {
    const optionElement = document.createElement('option');
    optionElement.value = a;
    optionElement.appendChild(document.createTextNode(a));
    element.appendChild(optionElement);
    return element;
  }, document.createElement('select'));

  const labelElement = document.createElement('label');
  if (textBefore) labelElement.appendChild(document.createTextNode(textBefore));
  labelElement.appendChild(selectElement);
  if (textAfter) labelElement.appendChild(document.createTextNode(textAfter));
  return labelElement;
}

export default function pagination(options) {
  const containerElement = document.createElement('div');
  containerElement.appendChild(adjacentButton('previous', 'Previous'));
  containerElement.appendChild(adjacentButton('next', 'Next'));
  containerElement.appendChild(pageSizeSelect(
    options.size, options.textBefore, options.textAfter));
  return containerElement;
}

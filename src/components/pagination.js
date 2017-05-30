function adjacentButton(classModifier, label) {
  const buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode(label));
  buttonElement.classList
    .add('tablr-pagination-button', `tablr-pagination-button_${classModifier}`);
  return buttonElement;
}

function pageSizeButtons(selectedSize, pageAmount) {
  const orderedListElement = Array.from(Array(pageAmount)).reduce((listElement, a, i) => {
    const listItemElement = document.createElement('li');
    const buttonElement = document.createElement('button');
    buttonElement.appendChild(document.createTextNode(i + 1));
    listItemElement.appendChild(buttonElement);
    listElement.appendChild(listItemElement);
    return listElement;
  }, document.createElement('ol'));
  orderedListElement.classList.add('tablr-page-jump-buttons');
  return orderedListElement;
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

export default function pagination(options, rowAmount) {
  const containerElement = document.createElement('div');
  containerElement.appendChild(adjacentButton('previous', 'Previous'));
  containerElement.appendChild(pageSizeButtons(
    options.selectedSize, Math.ceil(rowAmount / options.selectedSize)));
  containerElement.appendChild(adjacentButton('next', 'Next'));
  containerElement.appendChild(pageSizeSelect(
    options.size, options.textBefore, options.textAfter));
  return containerElement;
}

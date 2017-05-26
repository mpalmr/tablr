function renderAdjacentButton(classModifier, label) {
  const buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode(label));
  buttonElement.classList
    .add('tablr-pagination-button', `tablr-pagination-button_${classModifier}`);
  return buttonElement;
}

export default function renderPagination() {
  const containerElement = document.createElement('div');
  containerElement.appendChild(renderAdjacentButton('previous', 'Previous'));
  containerElement.appendChild(renderAdjacentButton('next', 'Next'));
  return containerElement;
}

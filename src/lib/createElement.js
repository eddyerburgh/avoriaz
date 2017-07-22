export default function createElement() {
  const element = document.createElement('div');
  document.body.appendChild(element);
  return element;
}

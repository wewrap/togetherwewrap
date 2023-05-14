export const removeModal = () => {
  const modalRoot = document.getElementById('modal') as HTMLElement;
  modalRoot.style.display = 'none'
  const html = document.querySelector('html');
  (html as HTMLHtmlElement).style.overflow = 'auto';
}

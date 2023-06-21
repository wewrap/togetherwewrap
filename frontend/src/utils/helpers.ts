export const removeModal = () => {
  const modalRoot = document.getElementById('modal') as HTMLElement;
  modalRoot.style.display = 'none'
  if (modalRoot.style.display !== 'none') {
    console.log('modal not removed')
  }
  const html = document.querySelector('html');
  (html as HTMLHtmlElement).style.overflow = 'auto';
}

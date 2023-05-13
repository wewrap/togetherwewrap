import { createPortal } from 'react-dom';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Modal = ({ children }: { children: JSX.Element }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;
  modalRoot.style.display = 'block'
  modalRoot.style.overflow = 'hidden'
  modalRoot.style.background = 'rgba(0, 0, 0, 0.5)'
  const html = document.querySelector('html');
  (html as HTMLHtmlElement).style.overflow = 'hidden';
  return createPortal(children, modalRoot)
}

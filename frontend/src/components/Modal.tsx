import { createPortal } from 'react-dom';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Modal = ({ children }: { children: JSX.Element }) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  return createPortal(children, modalRoot)
}

export default Modal

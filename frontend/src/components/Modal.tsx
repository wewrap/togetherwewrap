/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }: any): any => {
  const elRef = useRef<null | any>(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect((): any => {
    const modalRoot: any = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal

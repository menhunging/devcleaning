import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const nodeRef = useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="modal" onClick={onClose}>
        <div className="modal__inner" ref={nodeRef}>
          <div className="modal__overlay"></div>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={onClose}></button>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;

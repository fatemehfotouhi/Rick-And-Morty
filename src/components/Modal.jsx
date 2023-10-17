import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ onCloseModal, children, title }) {
    return (
        <>
            <div className="backdrop" onClick={onCloseModal}></div>
            <div className="modal">
                <div className="modal__header">
                    <h2>{title}</h2>
                    <XCircleIcon
                        onClick={onCloseModal}
                        style={{ width: "1.75rem", height: "1.75rem", cursor: "pointer", color: "var(--rose-500)" }} />
                </div>
                {children}
            </div>
        </>
    )
}

export default Modal;
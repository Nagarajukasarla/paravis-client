import React from "react";
import CButton from "../core/CButton";

interface ModalProps {
    children: React.ReactNode;
    disabled?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onConfirm, onClose, disabled }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                {/* Render children directly, allowing full control to wrapped component */}
                {children}
                {onConfirm && (
                    <div style={styles.footer}>
                        {/* <button disabled={disabled} style={styles.confirmButton} onClick={onConfirm}>
                            Confirm
                        </button> */}
                        <CButton disabled={disabled} onClick={onConfirm}>Confirm</CButton>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        position: "relative",
        background: "#fff",
        borderRadius: 8,
        maxWidth: "90vw",
        minWidth: 300,
        width: "100%",
        maxHeight: "90vh",
        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
    },
    closeButton: {
        position: "absolute",
        top: 12,
        right: 18,
        background: "transparent",
        border: "none",
        fontSize: 28,
        cursor: "pointer",
        lineHeight: 1,
    },
    content: {
        marginBottom: 16,
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
    },
};

export default Modal;

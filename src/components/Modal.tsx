import { useMemo, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
    isVisible: boolean,
    children: ReactNode
}

function Modal({ isVisible, children }: ModalProps) {
    const container = useMemo(
        () => document.getElementById('modal'),
        []
    )
    return container && isVisible && createPortal(children, container)
}

export default Modal
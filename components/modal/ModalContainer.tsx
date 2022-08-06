import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

export interface ModalContainerProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const ModalContainer = (props: ModalContainerProps) => {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector('#__next')
        setMounted(true)
    }, [])

    return mounted ? ReactDOM.createPortal(
        <div className={`absolute inset-0 flex items-center justify-center w-full h-full overflow-auto transform opacity-transition ${props.isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} bg-black bg-opacity-50`} onClick={props.onClose}>
            {props.children}
        </div>,
        ref.current
    ) : null
}

export default ModalContainer

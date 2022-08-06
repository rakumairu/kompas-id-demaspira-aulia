import React, { useMemo } from 'react'

interface ButtonProps {
    color?: 'primary' | 'secondary'
}

const Button = (props: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> & ButtonProps) => {
    const buttonColor = useMemo(() => {
        switch (props.color) {
        case 'secondary':
            return 'bg-secondary hover:bg-secondary-dark text-white'
        default:
            return 'bg-primary hover:bg-primary-dark text-white'
        }
    }, [props.color])

    return (
        <button
            {...props}
            className={`px-3 py-2 ${buttonColor} color-transition text-sm tracking-wide ${props.className}`}
        >
            {props.children}
        </button>
    )
}

export default Button

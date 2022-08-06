import React from 'react'

interface InputProps {
    label: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
    name?: string
    InputProps?: React.InputHTMLAttributes<HTMLInputElement>
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>
    error?: string
}

const Input = (props: InputProps) => {
    return (
        <div
            {...props.ContainerProps}
            className={`w-full ${props.ContainerProps?.className || ''}`}
        >
            <p className='text-sm font-medium mb-0.5'>
                {props.label}
            </p>
            <div className={`w-full color-transition rounded-sm border ${!!props.error ? 'border-red-500' : 'border-gray-200 focus-within:border-blue-700'}`}>
                <input
                    {...props.InputProps}
                    className="px-2 py-0.5 w-full"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    type={props.type}
                    name={props.name}
                />
            </div>
            {
                !!props.error &&
                <p className='text-[11px] text-red-500 font-medium'>
                    {props.error}
                </p>
            }
        </div>
    )
}

export default Input

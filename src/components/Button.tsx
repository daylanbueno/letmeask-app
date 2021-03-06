import {  ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outlined?: boolean
}

export function Button(props: ButtonProps) {
    const { outlined = false } = props
    return (
        <button
         className={`button ${outlined && 'outlined'}`} {...props}
         />
    )
}

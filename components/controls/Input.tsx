import React, { ChangeEvent } from 'react'

interface IInput {
  _ref?: any, // couldn't get types to match
  type: string,
  defaultValue?: string,
  placeholder?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  className?: string,
  min?: number,
  max?: number,
  step?: number,
  children?: any
}

export default function Input(
  {_ref, type, defaultValue, placeholder, onChange, disabled, className, min, max, step, children}
  : IInput) {
	return <input ref={_ref}
		type={type}
		defaultValue={defaultValue}
		placeholder={placeholder}
		onChange={onChange} 
		disabled={disabled}
		min={min}
		max={max}
		step={step}
		className={`
    px-4 py-2
		text-2xl disabled:text-gray-400 disabled:dark:text-gray-600
    bg-gray-200 dark:bg-gray-300 focus:dark:bg-white
    rounded-lg
		transition duration-200
		${className}`}>
		{children}
	</input>
}
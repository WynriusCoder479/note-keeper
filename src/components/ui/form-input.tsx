'use client'

import { cn } from '@/lib/utils'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './form'
import { Input } from './input'
import { InputHTMLAttributes, forwardRef } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	form: any
	name: string
	label?: string
	type?: string
	disabled?: boolean
	disabledErrorMessage?: boolean
	className: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			className,
			form,
			label,
			name,
			type = 'text',
			placeholder,
			disabled,
			disabledErrorMessage = false,
			...props
		},
		ref
	) => {
		return (
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}

						<FormControl>
							<Input
								{...field}
								{...props}
								ref={ref}
								type={type}
								disabled={disabled}
								placeholder={placeholder}
								className={cn(className)}
							/>
						</FormControl>
						{!disabledErrorMessage && <FormMessage />}
					</FormItem>
				)}
			/>
		)
	}
)

FormInput.displayName = 'FormInput'

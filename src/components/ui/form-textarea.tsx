'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './form'
import { Textarea } from './textarea'

interface FormTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
	form: any
	name: string
	label?: string
	type?: string
	disabled?: boolean
	disabledErrorMessage?: boolean
	className?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
							<Textarea
								{...field}
								{...props}
								ref={ref}
								disabled={disabled}
								placeholder={placeholder}
								className={cn('resize-none', className)}
							/>
						</FormControl>
						{!disabledErrorMessage && <FormMessage />}
					</FormItem>
				)}
			/>
		)
	}
)

FormTextarea.displayName = 'FormInput'

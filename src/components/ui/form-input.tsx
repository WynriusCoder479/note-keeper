'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './form'
import { Input } from './input'

type FormInputProps = {
	form: any
	name: string
	label: string
	type?: string
	placeholder: string
	disabled?: boolean
}

export const FormInput = ({
	form,
	label,
	name,
	type = 'text',
	placeholder,
	disabled
}: FormInputProps) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							type={type}
							disabled={disabled}
							placeholder={placeholder}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

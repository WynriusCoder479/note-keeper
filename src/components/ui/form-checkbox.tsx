'use client'

import { useId } from 'react'
import { Checkbox } from './checkbox'
import { FormControl, FormField, FormItem, FormLabel } from './form'

type FormCheckboxProps = {
	form: any
	name: string
	label: string
	disabled?: boolean
}

export const FormCheckbox = ({
	form,
	name,
	label,
	disabled
}: FormCheckboxProps) => {
	const id = useId()

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className='space-x-2'>
					<FormControl>
						<Checkbox
							id={id}
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={disabled}
						/>
					</FormControl>
					<FormLabel htmlFor={id}>{label}</FormLabel>
				</FormItem>
			)}
		/>
	)
}

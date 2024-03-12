import { Accordion } from '@/components/ui/accordion'
import { noteFeatures, todoListFeature } from '@/constant/features'
import { FeatureItem } from './feature-item'

export const Features = () => {
	return (
		<Accordion
			type='single'
			collapsible
			className='mt-4 w-[70%] space-y-6'
		>
			<FeatureItem
				name='note'
				label='Note Taking Feature'
				features={noteFeatures}
			/>
			<FeatureItem
				name='list'
				label='Todo List Feature'
				features={todoListFeature}
			/>
		</Accordion>
	)
}

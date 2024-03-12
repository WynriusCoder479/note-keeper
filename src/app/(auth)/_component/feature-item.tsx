import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { type Feature } from '@/constant/features'

type FeatureProps = {
	name: string
	label: string
	features: Feature[]
}

export const FeatureItem = ({ label, features, name }: FeatureProps) => {
	return (
		<AccordionItem
			value={name}
			className='border-none'
		>
			<AccordionTrigger className='flex items-center gap-x-2 rounded-br-full  rounded-tl-full border-none bg-gradient-to-t from-primary to-transparent px-8 py-2 text-start text-lg font-semibold  text-foreground/70 no-underline transition hover:bg-neutral-500/10 hover:no-underline '>
				{label}
			</AccordionTrigger>
			<AccordionContent className='bg-radial mt-2 from-primary to-transparent px-4 py-2'>
				<div className='flex flex-col space-y-4'>
					{features.map(feature => {
						const { id, description, icon: Icon } = feature

						return (
							<div
								key={id}
								className='flex items-center space-x-2 text-foreground/70'
							>
								<div className='h-fit w-fit rounded-br-lg rounded-tl-lg border-2 border-foreground/70 p-1'>
									<Icon className='h-6 w-6 ' />
								</div>

								<p className='text-[1rem]'>{description}</p>
							</div>
						)
					})}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

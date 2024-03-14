export default function Home() {
	return (
		<div className='flex flex-col gap-2'>
			{Array(70)
				.fill('_')
				.map((_item, i) => (
					<p key={i}>Dummy {i}</p>
				))}
		</div>
	)
}

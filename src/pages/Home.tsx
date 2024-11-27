import React, { useState } from 'react'
import { functionToHeader } from '../utils/logic';

const Home: React.FC = () => {
	const [header, setHeader] = useState<string[]>([]);

	const handleConversion: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		const functions: string = data.get('functions') as string ?? "";

		try {
			setHeader(functionToHeader(functions));
		}
		catch (error) {
			setHeader(['' + error])
		}
	}

	return (
		<main className='w-full min-h-screen h-full bg-primary font-code text-xl'>
			<form className='flex flex-col min-h-screen h-full md:flex-row gap-10 p-10' onSubmit={handleConversion}>
				<textarea
					required
					name="functions"
					id=""
					className='w-full flex-grow bg-gray-200 border-none outline-none decoration-white resize-none p-4 rounded-xl'
					placeholder='Your functions here...'
				></textarea>
				<div id='code' className='flex-grow bg-gray-200 rounded-xl w-full p-4'>
					{header.map((head) => {
						return <p>{head}</p>
					})}
				</div>
				<button type='submit' className='bg-white'>Submit</button>
			</form>

		</main>
	)
}

export default Home
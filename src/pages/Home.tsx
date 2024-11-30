import React, { useRef, useState } from 'react'
import { functionToHeader } from '../utils/logic';

const Home: React.FC = () => {
	const [header, setHeader] = useState<string[]>([]);
	const textRef = useRef<HTMLTextAreaElement>(null);
	const copyRef = useRef<HTMLDivElement>(null);

	const handleCopy: React.MouseEventHandler<HTMLButtonElement> = () => {
		if(copyRef.current) { 
			navigator.clipboard.writeText(copyRef.current.textContent ?? "");
			
			alert("Copied to clipboard!");
		}
	}

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

		if(textRef.current) {
			textRef.current.value = "";
		}
	}

	return (
		<main className='w-full min-h-screen h-full bg-primary font-code text-xl py-8'>
			<div className='w-full flex flex-col justify-center items-center text-white gap-2'>
				<p className='text-4xl md:text-5xl font-bold'>C Proto-Maker</p>
				<p className='px-10 text-sm text-center'>Enter all your C function code, and get your function prototypes generated in seconds!</p>
			</div>
			<form onSubmit={handleConversion}>
				<div className='flex flex-col h-[75vh] md:flex-row gap-6 px-10 py-6'>
					<textarea
						ref={textRef}
						required
						name="functions"
						id=""
						className='w-full flex-grow bg-gray-200 border-none outline-none decoration-white resize-none py-4 px-6 rounded-xl'
						placeholder='Your functions here...'
					></textarea>
					<div ref={copyRef} id='code' className='flex-grow bg-gray-200 rounded-xl w-full py-4 px-6'>
						{header.map((head) => {
							return <p>{head}</p>
						})}
					</div>
				
				</div>
				<div className='w-full flex justify-end px-10 gap-4'>
					<button onClick={handleCopy} type='button' className='w-full md:w-auto bg-primary rounded-xl px-10 py-4 text-gray-200 border broder-gray-200'>Copy Code</button>
					<button type='submit' className='w-full md:w-auto bg-gray-200 rounded-xl px-10 py-4'>Generate</button>
				</div>
			</form>

		</main>
	)
}

export default Home
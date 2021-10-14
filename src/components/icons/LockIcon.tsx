import { FC } from 'react'

const LockIcon: FC = () => {
	return (
		<svg width='51' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M25.5 0C16.712 0 9.562 7.178 9.562 16v9.6H6.376C2.859 25.6 0 28.47 0 32v25.6C0 61.13 2.86 64 6.375 64h38.25C48.141 64 51 61.13 51 57.6V32c0-3.53-2.86-6.4-6.375-6.4h-3.188V16c0-8.822-7.15-16-15.937-16zm19.125 32l.006 25.6H6.375V32h38.25zm-28.688-6.4V16c0-5.293 4.29-9.6 9.563-9.6 5.272 0 9.563 4.307 9.563 9.6v9.6H15.936z'
				fill='#fff'
			/>
		</svg>
	)
}

export default LockIcon

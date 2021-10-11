import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type ReturnType<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>]

export const useLocalStorage = <T,>(
	key: string,
	initialValue?: T
): ReturnType<T> => {
	const [state, setState] = useState<T | undefined>(() => {
		if (!initialValue) return
		try {
			const value = localStorage.getItem(key)
			return value ? JSON.parse(value) : initialValue
		} catch (err) {
			console.log(err)
			return initialValue
		}
	})

	useEffect(() => {
		if (state) {
			try {
				localStorage.setItem(key, JSON.stringify(state))
			} catch (err) {
				console.log(err)
			}
		}
	}, [state, key])

	return [state, setState]
}

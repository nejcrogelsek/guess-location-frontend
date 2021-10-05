export type IUser = {
	id: number
	email: string
	first_name: string
	last_name: string
	profile_image: string
}

export type UpdateUserDto = {
	first_name: string
	last_name: string
	profile_image: string
	password: string
}
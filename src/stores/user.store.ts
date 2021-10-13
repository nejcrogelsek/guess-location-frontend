import { configure, makeAutoObservable } from 'mobx'
import { IUser } from '../interfaces/user.interface'
configure({
	enforceActions: 'never', // or use runInAction: https://stackoverflow.com/questions/64770762/mobx-since-strict-mode-is-enabled-changing-observed-observable-values-withou
})
class UserStore {
	user: IUser | null = null

	constructor() {
		makeAutoObservable(this)
	}

	register(user: IUser) {
		this.user = user
	}

	login(user: IUser) {
		this.user = user
	}

	update(user: IUser) {
		this.user = user
	}

	logout() {
		this.user = null
	}
}
const userStore = new UserStore()
export default userStore

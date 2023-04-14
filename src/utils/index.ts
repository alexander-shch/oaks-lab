export const LocalStorage = {
	save: (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value))
	},

	delete: (key: string) => {
		localStorage.removeItem(key)
	},

	get: <T = unknown>(key: string): T | undefined => {
		const value = localStorage.getItem(key)
		if (!value) {
			return undefined
		}

		return JSON.parse(value) as T
	}
}  
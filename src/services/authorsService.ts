import type { Author } from "../types/Authors"

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const message = `Request failed: ${response.status} ${response.statusText}`
		throw new Error(message)
	}
	return response.json() as Promise<T>
}

export const authorsService = {
	getAllAuthors: async (): Promise<Author[]> => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/authors`)
			return await handleResponse<Author[]>(res)
		} catch (error) {
			console.error("Error fetching authors:", error)
			throw new Error("Failed to fetch authors")
		}
	},

	createAuthor: async (author: Omit<Author, "id">): Promise<Author> => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/authors`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(author),
			})
			return await handleResponse<Author>(res)
		} catch (error) {
			console.error("Error creating author:", error)
			throw new Error("Failed to create author")
		}
	},
}
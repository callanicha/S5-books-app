import type { Book } from "../types/Book"

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const message = `Request failed: ${response.status} ${response.statusText}`
		throw new Error(message)
	}
	return response.json() as Promise<T>
}

export const booksService = {
	getAllBooks: async (): Promise<Book[]> => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/books`)
			return await handleResponse<Book[]>(res)
		} catch (error) {
			console.error("Error fetching books:", error)
			throw new Error("Failed to fetch books")
		}
	},

	createBook: async (book: Omit<Book, "id">): Promise<Book> => {
		try {
			const res = await fetch(`${API_BASE_URL}/api/books`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(book),
			})
			return await handleResponse<Book>(res)
		} catch (error) {
			console.error("Error creating book:", error)
			throw new Error("Failed to create book")
		}
	},
}



// Suggested book type returned from Google for assisting form fill-in
export type SuggestedBook = {
    title: string
    authorName?: string
    isbn: string
    publishedYear: number
    description: string
    coverUrl: string
}
type GoogleBooksVolume = {
	id: string
	volumeInfo: {
		title?: string
		authors?: string[]
		publishedDate?: string
		description?: string
		imageLinks?: { thumbnail?: string }
		industryIdentifiers?: Array<{ type: string; identifier: string }>
	}
}

type GoogleBooksResponse = {
	totalItems: number
	items?: GoogleBooksVolume[]
}

const GOOGLE_BOOKS_API_BASE = "https://www.googleapis.com/books/v1"

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const message = `Request failed: ${response.status} ${response.statusText}`
		throw new Error(message)
	}
	return response.json() as Promise<T>
}

export const googleBooksService = {
	searchBooksByTitle: async (query: string): Promise<GoogleBooksResponse> => {
		try {
			const url = new URL(`${GOOGLE_BOOKS_API_BASE}/volumes`)
			url.searchParams.set("q", `intitle:${query}`)
			url.searchParams.set("country", "US")
			url.searchParams.set("maxResults", "20")
			const res = await fetch(url.toString())
			return await handleResponse<GoogleBooksResponse>(res)
		} catch (error) {
			console.error("Error searching Google Books:", error)
			throw new Error("Failed to search books")
		}
	},
}

function transformGoogleBook(volume: GoogleBooksVolume): SuggestedBook {
	const title = volume.volumeInfo.title ?? "Untitled"
	const identifiers = volume.volumeInfo.industryIdentifiers ?? []
	const isbn13 = identifiers.find((i) => i.type === "ISBN_13")?.identifier
	const isbn10 = identifiers.find((i) => i.type === "ISBN_10")?.identifier
	const published = volume.volumeInfo.publishedDate?.slice(0, 4)
	const publishedYear = Number.parseInt(published ?? "0") || 0
	return {
        title,
        authorName: volume.volumeInfo.authors?.[0],
        isbn: isbn13 || isbn10 || "",
        publishedYear,
        description: volume.volumeInfo.description ?? "",
        coverUrl: volume.volumeInfo.imageLinks?.thumbnail ?? "",
	}
}

export async function searchBooksByTitle(title: string): Promise<SuggestedBook[]> {
	try {
		const params = new URLSearchParams({
			q: `intitle:${title}`,
			country: "US",
			maxResults: "40",
		})
		const res = await fetch(`${GOOGLE_BOOKS_API_BASE}/volumes?${params.toString()}`)
		const data = await handleResponse<GoogleBooksResponse>(res)
		if (!data.items || data.items.length === 0) return []
		return data.items.map(transformGoogleBook)
	} catch (error) {
		console.error("Error fetching books from Google Books API:", error)
		return []
	}
}



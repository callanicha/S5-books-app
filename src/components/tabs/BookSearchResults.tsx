import type { Author } from "../../types/Authors"
import type { SuggestedBook } from "../../services/googleBooksService"

interface BookSearchResultsProps {
    searchResults: SuggestedBook[]
    authors: Author[]
    onSelectBook: (book: SuggestedBook) => void
    onClearResults: () => void
}

const BookSearchResults = ({ searchResults, authors, onSelectBook, onClearResults }: BookSearchResultsProps) => {
    if (searchResults.length === 0) return null

    return (
        <div className="mt-2 border border-gray-200 rounded-md max-h-64 overflow-auto bg-white shadow-sm">
            <ul className="divide-y divide-gray-100">
                {searchResults.map((book, idx) => (
                    <li
                        key={`${book.title}-${book.isbn || idx}`}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                            onSelectBook(book)
                            onClearResults()
                        }}
                    >
                        <div className="flex gap-3">
                            {book.coverUrl && (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="w-12 h-16 object-cover rounded"
                                    onError={(e) => { e.currentTarget.style.display = "none" }}
                                />
                            )}
                            <div className="flex-1">
                                <p className="font-medium text-sm text-gray-800">{book.title}</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {book.authorName ?? "Unknown author"}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1 items-center">
                                    {book.publishedYear ? (
                                        <span className="text-xs text-gray-500">{book.publishedYear}</span>
                                    ) : null}
                                    {book.isbn ? (
                                        <span className="text-xs text-blue-600">ISBN: {book.isbn}</span>
                                    ) : (
                                        <span className="text-xs text-red-500">No ISBN available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookSearchResults



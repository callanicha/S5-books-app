import type { Author } from "../types/Authors"
import type { Book } from "../types/Book"

interface BookCardProps {
    book: Book
    author: Author
}

const BookCard = ({ book, author }: BookCardProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<div className="flex">
				<div className="w-32 flex-shrink-0">
					<img
						src={book.coverUrl}
						alt={book.title}
						className="w-full h-48 object-cover"
					/>
				</div>
				<div className="p-4 flex-1">
					<h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
					<p className="text-sm text-gray-600 mb-2">by {author.name}</p>
					<p className="text-sm text-gray-500 mb-3">{book.description}</p>
					<div className="flex gap-4 text-xs text-gray-500">
						<span>Published: {book.publishedYear}</span>
						<span>ISBN: {book.isbn}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookCard

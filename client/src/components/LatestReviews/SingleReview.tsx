const SingleReview = ({ review }: any) => {
  return (
    <div className="p-5 border rounded shadow-sm bg-white dark:bg-black text-btndark">
      {/* Image section */}
      <div className="mb-4">
        <img
          src={review.imageUrl}
          alt={review.title}
          className="w-full h-auto object-cover rounded"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Content section */}
      <h3 className="text-lg font-bold mb-2">{review.title}</h3>
      <p className="text-sm italic mb-2">Category: {review.category}</p>
      <p className="mb-2">{review.description}</p>
      <p className="text-sm mb-1">Rating: {review.rating}/5</p>
      <p className="text-xs text-gray-900">
        By {review.reviewer} on {review.date}
      </p>
    </div>
  )
}

export default SingleReview

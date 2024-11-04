'use client'

import { userReviewsData } from '@/constants/staticData'
import { motion } from 'framer-motion'

const Reviews = () => {
  return (
    <section id="user-reviews" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <h2 className="text-2xl font-bold mb-5">User Reviews</h2>
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3">
          {userReviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              className="p-4 border rounded shadow-md bg-white dark:bg-black"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }} // Different delay for each card
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <img
                  src={review.imageUrl} // Make sure your data has an imageUrl property
                  alt={review.title}
                  width={50} // Smaller size for reviewer image
                  height={50} // Smaller size for reviewer image
                  className="w-12 h-12 object-cover rounded-full" // Adjusted for a circular shape
                />
              </div>
              <h3 className="text-lg font-semibold">{review.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Reviewed by {review.reviewer} on {review.date}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Rating: {review.rating}
              </p>
              <p>{review.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

'use client'
import SingleReview from '@/components/LatestReviews/SingleReview'
import { topRatedReviewsData } from '@/constants/staticData'
import { motion } from 'framer-motion'

const TopRatedReviews = () => {
  return (
    <section id="top-rated-reviews" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <h2 className="text-2xl font-bold mb-5">Top-Rated Reviews</h2>
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3">
          {topRatedReviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }} // Different delay for each card
              viewport={{ once: true }}
            >
              <SingleReview review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopRatedReviews

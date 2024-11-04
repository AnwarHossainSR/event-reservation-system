'use client'
import { reviewsData } from '@/constants/staticData'
import { motion } from 'framer-motion'
import SingleReview from './SingleReview'

const LatestReviews = () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <h2 className="text-2xl font-bold text-black dark:bg-black dark:text-white mb-8">
            Latest Reviews
          </h2>
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3">
            {reviewsData.map((review, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: index * 0.2 }} // Different delay for each card
                viewport={{ once: true }}
              >
                <SingleReview review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default LatestReviews

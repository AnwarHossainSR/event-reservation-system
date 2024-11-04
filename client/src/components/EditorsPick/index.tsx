'use client'

import SingleReview from '@/components/LatestReviews/SingleReview'
import { editorsPickData } from '@/constants/staticData'
import { motion } from 'framer-motion'

const EditorsPick = () => {
  return (
    <section id="editors-pick" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <h2 className="text-2xl font-bold mb-5">Editor's Pick</h2>
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3">
          {editorsPickData.map((review, index) => (
            <motion.div
              key={review.id}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: index * 0.2 }}
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

export default EditorsPick

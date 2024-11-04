'use client'
import { categoryData } from '@/constants/staticData'
import SingleCategory from './SingleCategory'

const TopCategories = () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8">
            Top Categories
          </h2>
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3">
            {categoryData.map((category, key) => (
              <SingleCategory category={category} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TopCategories

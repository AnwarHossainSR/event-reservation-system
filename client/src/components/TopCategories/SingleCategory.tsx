const SingleCategory = ({ category }: { category: any }) => {
  return (
    <div className="text-center p-5 border rounded shadow-sm bg-white dark:bg-black dark:text-white">
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p>{category.description}</p>
    </div>
  )
}

export default SingleCategory

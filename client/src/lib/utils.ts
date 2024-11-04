export const randomStaticImage = () => {
  const images = [
    '/images/blog/blog-01.png',
    '/images/blog/blog-02.png',
    '/images/blog/blog-03.png',
    '/images/blog/blog-04.png',
  ]
  return images[Math.floor(Math.random() * images.length)]
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const dateformat = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

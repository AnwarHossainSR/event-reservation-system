// Static data for categories
export const categoryData = [
  { id: 1, name: 'Technology', description: 'Latest tech gadgets and apps' },
  { id: 2, name: 'Books', description: 'Top-rated books and novels' },
  { id: 3, name: 'Movies', description: 'Popular and trending movies' },
  { id: 4, name: 'Restaurants', description: 'Best dining experiences' },
  { id: 5, name: 'Travel', description: 'Exotic destinations and trips' },
  { id: 6, name: 'Fitness', description: 'Best fitness gear and routines' },
]

// Static data for reviews
export const reviewsData = [
  {
    id: 1,
    title: 'iPhone 14 Review',
    category: 'Technology',
    rating: 4.5,
    description:
      'The iPhone 14 offers improved performance, but is it worth the upgrade?',
    reviewer: 'John Doe',
    date: 'October 10, 2023',
    imageUrl: '/images/blog/blog-03.png',
  },
  {
    id: 2,
    title: 'The Midnight Library',
    category: 'Books',
    rating: 5,
    description:
      'A thought-provoking novel about life choices and second chances.',
    reviewer: 'Jane Smith',
    date: 'September 20, 2023',
    imageUrl: '/images/blog/blog-04.png',
  },
  {
    id: 3,
    title: 'Oppenheimer Movie Review',
    category: 'Movies',
    rating: 4.7,
    description:
      'A cinematic masterpiece on the life of the father of the atomic bomb.',
    reviewer: 'Alex Johnson',
    date: 'August 15, 2023',
    imageUrl: '/images/blog/blog-01.png',
  },
]

// Static data for Editor's Picks (curated reviews)
export const editorsPickData = [
  {
    id: 1,
    title: 'Best Noise-Canceling Headphones',
    category: 'Technology',
    rating: 5,
    description:
      'An in-depth review of the top noise-canceling headphones in 2023.',
    reviewer: 'John Doe',
    date: 'October 5, 2023',
    imageUrl: '/images/blog/blog-01.png', // Add image URL
  },
  {
    id: 2,
    title: 'Top 5 Must-Read Novels of 2023',
    category: 'Books',
    rating: 4.8,
    description:
      'A curated list of must-read novels handpicked by our editorial team.',
    reviewer: 'Jane Smith',
    date: 'September 10, 2023',
    imageUrl: '/images/blog/blog-02.png', // Add image URL
  },
]

// Static data for Latest Reviews
export const latestReviewsData = [
  {
    id: 1,
    title: 'Samsung Galaxy S23 Review',
    category: 'Technology',
    rating: 4.3,
    description:
      'A comprehensive review of Samsung Galaxy S23 with pros and cons.',
    reviewer: 'Mike Johnson',
    date: 'October 15, 2023',
  },
  {
    id: 2,
    title: 'Avengers: Endgame Rewatch',
    category: 'Movies',
    rating: 4.5,
    description:
      'An emotional rewatch of one of the best Marvel movies of all time.',
    reviewer: 'Alex Lee',
    date: 'October 13, 2023',
  },
]

// Static data for Top-Rated Reviews
export const topRatedReviewsData = [
  {
    id: 1,
    title: 'The Subtle Art of Not Giving a F*ck',
    category: 'Books',
    rating: 5,
    description: 'A refreshing take on how to live a meaningful life.',
    reviewer: 'Emily Davis',
    date: 'August 20, 2023',
    imageUrl: '/images/blog/blog-05.png',
  },
  {
    id: 2,
    title: 'Sony WH-1000XM5 Review',
    category: 'Technology',
    rating: 4.9,
    description:
      'One of the best headphones in the market with incredible noise canceling.',
    reviewer: 'Chris Evans',
    date: 'August 10, 2023',
    imageUrl: '/images/blog/blog-04.png',
  },
]

export const userReviewsData = [
  {
    id: 1,
    title: 'Incredible Storytelling in "The Last of Us"',
    reviewer: 'Mark Robinson',
    rating: 4.5,
    review:
      'The Last of Us is one of the best video game adaptations, providing a perfect balance of emotion and action.',
    date: 'October 1, 2023',
    imageUrl: '/images/user/user-01.png',
  },
  {
    id: 2,
    title: 'Best Graphics Card for Gamers',
    reviewer: 'Alice Monroe',
    rating: 4.7,
    review:
      'This RTX 4090 is a beast when it comes to gaming. It can handle anything thrown at it with ease!',
    date: 'September 28, 2023',
    imageUrl: '/images/user/user-02.png',
  },
]

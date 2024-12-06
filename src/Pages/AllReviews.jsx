import React from 'react'
import { useLoaderData } from 'react-router'

const AllReviews = () => {
  const reviews = useLoaderData()
  console.log(reviews)
  return (
    <div>AllReviews</div>
  )
}

export default AllReviews
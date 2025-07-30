import React, { useState, useEffect } from 'react'
import BookCard from '../books/BookCard'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Recommened = () => {

  const {data, error, isLoading} = useFetchAllBooksQuery();
  console.log('API Response:', data);
  console.log('Error:', error);
  console.log('Loading:', isLoading);
  
  const books = data?.books || [];

  if (isLoading) return <div className='py-16'><p>Loading books...</p></div>;
  if (error) return <div className='py-16'><p>Error loading books: {error.message}</p></div>;

  return (
    <div className='py-16'> 
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }, 
        }}
        modules={[Pagination , Navigation]}
        className="mySwiper"
      >
          {
           books && books.length > 0 && books.slice(8,18 ).map((book, index) => (
            <SwiperSlide key={index}>
                <BookCard  book={book}/>
            </SwiperSlide>
           ))
         }

    
      </Swiper>   
    </div>
  )
}

export default Recommened
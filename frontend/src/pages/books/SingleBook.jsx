import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import getImgUrl from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    console.log('Book ID from URL params:', id);
    
    const {data, isLoading, isError, error} = useFetchBookByIdQuery(id, {
        skip: !id // Skip the query if no ID is provided
    });
    
    console.log('Single book API response:', data);
    console.log('Error:', error);
    console.log('Is Loading:', isLoading);
    console.log('Is Error:', isError);
    
    const book = data?.book || data;
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    // Handle case when no ID is provided
    if (!id) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-red-500 text-lg">No book ID provided</div>
            </div>
        )
    }
    
    if(isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-lg">Loading book details...</div>
            </div>
        )
    }
    
    if(isError) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-red-500 text-lg">Error loading book information</div>
            </div>
        )
    }
    
    if(!book) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-gray-500 text-lg">Book not found</div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="w-full max-w-md h-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600">by {book.author || 'Unknown Author'}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">Category:</span>
                            <span className="text-gray-600 capitalize">{book.category}</span>
                        </div>
                        
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 w-24">Published:</span>
                            <span className="text-gray-600">
                                {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'Unknown'}
                            </span>
                        </div>
                        
                        {book.oldPrice && (
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-24">Price:</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-green-600">${book.newPrice}</span>
                                    <span className="text-lg text-gray-500 line-through">${book.oldPrice}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Description:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {book.description || 'No description available.'}
                        </p>
                    </div>

                    <button 
                        onClick={() => handleAddToCart(book)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                    >
                        <FiShoppingCart className="text-lg" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleBook
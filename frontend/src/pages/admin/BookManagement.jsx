import React, { useState } from 'react'
import { mockBooks } from '../../data/mockBooks'
// import { useFetchAllBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } from '../../redux/features/books/booksApi'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const BookManagement = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingBook, setEditingBook] = useState(null)
    
    const books = { books: mockBooks }
    const refetch = () => {} // Mock refetch function
    
    const { register, handleSubmit, reset, setValue } = useForm()

    const onSubmit = async (data) => {
        try {
            if (editingBook) {
                await updateBook({ id: editingBook._id, ...data }).unwrap()
                Swal.fire('Success!', 'Book updated successfully', 'success')
                setEditingBook(null)
            } else {
                await addBook(data).unwrap()
                Swal.fire('Success!', 'Book added successfully', 'success')
                setShowAddForm(false)
            }
            reset()
            refetch()
        } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error')
        }
    }

    const handleEdit = (book) => {
        setEditingBook(book)
        setShowAddForm(true)
        setValue('title', book.title)
        setValue('description', book.description)
        setValue('category', book.category)
        setValue('trending', book.trending)
        setValue('coverImage', book.coverImage)
        setValue('oldPrice', book.oldPrice)
        setValue('newPrice', book.newPrice)
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            try {
                await deleteBook(id).unwrap()
                Swal.fire('Deleted!', 'Book has been deleted.', 'success')
                refetch()
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete book', 'error')
            }
        }
    }

    const resetForm = () => {
        setShowAddForm(false)
        setEditingBook(null)
        reset()
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                    Add New Book
                </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {editingBook ? 'Edit Book' : 'Add New Book'}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                {...register('category', { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Category</option>
                                <option value="business">Business</option>
                                <option value="fiction">Fiction</option>
                                <option value="horror">Horror</option>
                                <option value="adventure">Adventure</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                {...register('description', { required: true })}
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                            <input
                                {...register('coverImage', { required: true })}
                                type="text"
                                placeholder="e.g., book-1.png"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    {...register('trending')}
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm text-gray-700">Trending</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Old Price</label>
                            <input
                                {...register('oldPrice', { required: true })}
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Price</label>
                            <input
                                {...register('newPrice', { required: true })}
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="md:col-span-2 flex space-x-4">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                            >
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Books Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Book
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {books?.books?.map((book) => (
                            <tr key={book._id || book.title}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded object-cover"
                                                src={`/src/assets/books/${book.coverImage}`}
                                                alt={book.title}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {book.title}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                                        {book.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div>
                                        <span className="font-medium">${book.newPrice}</span>
                                        {book.oldPrice && (
                                            <span className="ml-2 text-gray-500 line-through">${book.oldPrice}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {book.trending && (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Trending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookManagement
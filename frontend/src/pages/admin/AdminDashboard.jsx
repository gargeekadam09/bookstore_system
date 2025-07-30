import React, { useState } from 'react'
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi'
import BookManagement from './BookManagement'
import OrderManagement from './OrderManagement'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const { data: books } = useFetchAllBooksQuery()
    const { data: orders } = useGetAllOrdersQuery()
    
    const totalBooks = books?.books?.length || 0
    const totalOrders = orders?.length || 0

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/login'
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="border-b border-gray-200 mb-8">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'dashboard'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'orders'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'books'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Book Management
                        </button>
                    </nav>
                </div>

                {activeTab === 'dashboard' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                                                <span className="text-white font-bold">B</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Total Books
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900">
                                                    {totalBooks}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                                <span className="text-white font-bold">O</span>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Total Orders
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900">
                                                    {totalOrders}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Recent Activity
                                </h3>
                                <div className="text-gray-500">
                                    No recent activity to display.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && <OrderManagement />}
                {activeTab === 'books' && <BookManagement />}
            </div>
        </div>
    )
}

export default AdminDashboard
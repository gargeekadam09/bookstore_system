import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersApi'

const OrdersPage = () => {
    const { currentUser } = useAuth()
    const { data: orders, isLoading, error } = useGetOrdersByEmailQuery(currentUser?.email, {
        skip: !currentUser?.email
    })

    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading orders...</div>
    if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error loading orders</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
            
            {!orders || orders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No orders found</div>
                    <p className="text-gray-400 mt-2">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Order #{order._id.slice(-8)}</h3>
                                    <p className="text-sm text-gray-500">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">${order.totalPrice}</div>
                                    <div className="text-sm text-gray-500">Total Amount</div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p className="font-medium">{order.name}</p>
                                        <p>{order.address.city}, {order.address.state}</p>
                                        <p>{order.address.country} - {order.address.zipcode}</p>
                                        <p>Phone: {order.phone}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
                                    <div className="space-y-2">
                                        {order.productIds.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                    {typeof item.productId === 'string' ? item.productId : `Product ${index + 1}`}
                                                </span>
                                                <span className="text-gray-800 font-medium">Qty: {item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        Items: {order.productIds.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Cash on Delivery
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage
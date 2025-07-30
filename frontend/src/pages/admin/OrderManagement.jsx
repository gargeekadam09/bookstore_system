import React from 'react'
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../redux/features/orders/ordersApi'
import Swal from 'sweetalert2'

const OrderManagement = () => {
    const { data: orders, refetch } = useGetAllOrdersQuery()
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus({ id: orderId, status: newStatus }).unwrap()
            Swal.fire('Success!', `Order marked as ${newStatus}`, 'success')
            refetch()
        } catch (error) {
            Swal.fire('Error!', 'Failed to update order status', 'error')
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
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
                        {orders?.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #{order._id.slice(-8)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{order.name}</div>
                                    <div className="text-sm text-gray-500">{order.email}</div>
                                    <div className="text-sm text-gray-500">{order.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.productIds.reduce((acc, item) => acc + item.quantity, 0)} items
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    ${order.totalPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        order.status === 'completed' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {order.status === 'pending' ? (
                                        <button
                                            onClick={() => handleStatusUpdate(order._id, 'completed')}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Mark Complete
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleStatusUpdate(order._id, 'pending')}
                                            className="text-yellow-600 hover:text-yellow-900"
                                        >
                                            Mark Pending
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {!orders || orders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg">No orders found</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderManagement
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { clearCart } from '../../redux/features/cart/cartSlice';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartitems);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2);
    const { currentUser } = useAuth()
    const { register, handleSubmit } = useForm()
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false)

    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: 'Confirm Your Order',
            text: `Total Amount: $${totalPrice}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Place Order!'
        });

        if (result.isConfirmed) {
            const newOrder = {
                name: data.name,
                email: currentUser?.email,
                address: {
                    city: data.city,
                    country: data.country,
                    state: data.state,
                    zipcode: data.zipcode
                },
                phone: data.phone,
                productIds: cartItems.map(item => ({ productId: item?._id || item?.title, quantity: item.quantity })),
                totalPrice: totalPrice,
            }

            try {
                await createOrder(newOrder).unwrap();
                
                Swal.fire({
                    title: 'Order Placed Successfully!',
                    text: 'Your order has been confirmed and will be processed soon.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                dispatch(clearCart());
                navigate('/');
            } catch (error) {
                Swal.fire({
                    title: 'Order Failed!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    }

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-2">Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            <div className="mb-4">
                                {cartItems.map((item, index) => (
                                    <div key={item._id || item.title || index} className="flex justify-between text-sm text-gray-600">
                                        <span>{item.title} x{item.quantity}</span>
                                        <span>${(item.newPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" 
                                                id="name" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email" 
                                                id="email" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@domain.com" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="tel" 
                                                id="phone" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                placeholder="+123 456 7890" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text" 
                                                id="address" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text" 
                                                id="city" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country</label>
                                            <input
                                                {...register("country", { required: true })}
                                                type="text"
                                                id="country" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State</label>
                                            <input
                                                {...register("state", { required: true })}
                                                type="text"
                                                id="state" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text" 
                                                id="zipcode" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                    type="checkbox" 
                                                    id="billing_same" 
                                                    className="form-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    disabled={!isChecked || isLoading}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                                                    {isLoading ? 'Processing...' : 'Place an Order'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage
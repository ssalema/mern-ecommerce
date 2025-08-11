import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  const loadOrderData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userOrders',
        {},
        { headers: { token } }
      );

      if (response.data.success && response.data.orders) {
        const ordersGroupedByOrderId = response.data.orders.reduce((acc, order) => {
          const orderItems = order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }));

          // Group items by orderId
          if (!acc[order._id]) {
            acc[order._id] = {
              items: orderItems,
              orderId: order._id,
            };
          } else {
            acc[order._id].items.push(...orderItems);
          }

          return acc;
        }, {});

        // Convert object back to array for rendering
        setGroupedOrders(Object.values(ordersGroupedByOrderId).reverse());
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load orders. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error state
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {groupedOrders.length > 0 ? (
          groupedOrders.map((order, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700'>
              {/* Order Details */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                  <p className='sm:text-base font-medium'>Order ID: {order.orderId}</p>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{order.items.length ? formatDateTime(order.items[0].date) : 'N/A'}</span></p>
                  <p className='mt-1'>Payment Method: <span className='text-gray-400'>{order.items.length ? order.items[0].paymentMethod : 'N/A'}</span></p>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{order.items.length ? order.items[0].status : 'N/A'}</p>
                </div>

                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>

              {/* Products in Responsive Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex-shrink-0 flex items-start gap-4 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                        <p>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p> // Handle empty orders
        )}
      </div>
    </div>
  );
};

export default Orders;
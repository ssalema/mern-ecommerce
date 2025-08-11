import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import {toast} from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartItems } = useContext(ShopContext)

    const verifyPayment = async () => {
        try {

            if (!token) {
                return null
            }

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify
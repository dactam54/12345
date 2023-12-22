import React, { useState, useEffect } from 'react'
import { OrderItem } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { apiClearCart, apiGetCurrent, apiBuy } from '../../apis'
import actionTypes from '../../store/actions/actionTypes'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'

const Order = () => {
    const { cart } = useSelector(state => state.user)
    const { boughtProducts, sku } = useSelector(state => state.product)
    const [cartData, setCartData] = useState(null)
    const [buyer, setBuyer] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const fetchCart = async () => {
        const response = await apiGetCurrent()
        if (response.err === 0) {
            setCartData(response.rs.cart)
            setBuyer(response.rs)
        }
    }
    useEffect(() => {
        fetchCart()
    }, [cart])
    
    const handleBuy = async () => {
            const payload = {
                total: boughtProducts?.reduce((sum, el) => sum + el.price, 0),
                products: boughtProducts,
                
            }
            const response = await apiBuy(payload)
            if (response.err === 0) {
                dispatch({ type: actionTypes.RESET_ORDER })
                // render
                const res = await apiClearCart()
                if (res.err === 0) dispatch({ type: actionTypes.UPDATE_CURRENT })
                dispatch({
                    type: actionTypes.ALERT,
                    alert: 'Xuất hàng thành công',
                    callback: () => navigate(`/${path.SYSTEM}/${path.MANAGE_EXPORT}}`)
                })
            }
    }
    return (
        <div className='flex items-center flex-col gap-4'>
            <h3 className='text-[20px] text-main font-bold'>Xác nhận mua hàng</h3>
            <div className='flex flex-col gap-2 w-full h-[60vh] overflow-y-auto'>

                {cartData?.map(item => (
                    <OrderItem
                        key={item.id}
                        image={item.thumb}
                        name={item.name}
                        price={item?.variants?.some(el => sku.some(sku => sku.value === el.sku))
                            ? item?.variants?.find(el => sku.some(sku => sku.value === el.sku)).price
                            : item?.variants[0]?.price}
                        pid={item.id}
                    />

                ))}
            </div>
            
            
            <span className='w-full flex items-center justify-between'>
                <span className='font-bold'>Tên người xuất:</span>
                <span className='flex gap-1 items-center'>{buyer?.name}</span>
            </span>
            
            <button
                type='button'
                className='py-3 bg-main text-white rounded-md w-full  font-bold'
                onClick={handleBuy}
            >
                Xuất Hàng
            </button>
        </div>
    )
}

export default Order
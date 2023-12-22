import React, { useEffect, useState } from 'react'
import icons from '../../utils/icons'
import path from '../../utils/path'
import { apiGetProductsAdmin, } from '../../apis/product'
import { useDispatch } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'
import moment from 'moment'
import { ExportCart } from '../../components'
import { useNavigate } from 'react-router-dom'


import { CiExport } from 'react-icons/ci'

const { AiFillCaretDown,AiFillCaretUp} = icons
const cols = [
    'PID',
    'Ảnh sản phẩm',
    'Tên sản phẩm',
    'Nhãn hiệu',
    'Loại hàng',
    'Đã bán',
    'Kho',
    'Ngày nhập',
    'Thao tác'
]

const ManageExport = () => {
    const [products, setProducts] = useState(null)
    const [page, setPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const fetchProducts = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiGetProductsAdmin({ page: page })
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) setProducts(response.productDatas)
    }

    console.log(products)

    useEffect(() => {
       fetchProducts()
    }, [page])


    return (
        <div className='relative'>
            <div className='flex items-center justify-between border-b border-gray-200'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý xuất hàng</h3>
                <button
                type='button'
                className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                onClick={() => {
                    dispatch({ type: actionTypes.SHOW_CART, flag: false })
                    navigate(`/${path.SYSTEM}/${path.BUY}`)
                }}
            >
            <CiExport size={18} />
                <span>Xuất hàng</span>
            </button>
            </div>



            <div className='py-4'>
            <input
                type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Tìm kiếm sản phẩm'
                onChange={e => setSearchKeyword(e.target.value)}
            />
                {/* <div>
                    <span className='font-bold'>Sort by:</span>
                </div> */}
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className='border-b border-t'>
                            {cols.map((el, index) => (
                                <td key={index} className='p-2 font-bold border border-solid border-gray-300 text-center'>{el}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products?.rows?.filter((item)=>{return searchKeyword.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchKeyword)})
                        .map((item, index) => (
                            <tr
                                key={item.id}
                                className='border border-solid border-gray-300'
                            >
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>
                                <img src={item.thumb} alt="" className='h-[50px] object-contain' />
                                </td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.name}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.brand}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.catalog}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.boughtProducts?.reduce((sum, el) => sum + el.quantity, 0)}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.quantity}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item.createdAt).format('DD/MM/YY')}</td>
                                <td className='flex gap-2 '>
                                    <ExportCart pid={item.id}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {products && products.count && <div className='flex items-center justify-center'>
            <button
                    type='button'
                    className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                    onClick={() => setPage(prev => prev + 1)}
                >
                    <span>{`Xem thêm ${products?.count - +process.env.REACT_APP_LIMIT_PRODUCTS * page} sản phẩm`}</span>
                    <AiFillCaretDown />
                </button>

                <button
                    type='button'
                    className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                    onClick={() => setPage(prev => prev - 1)}
                >
                    <span>{`Xem thêm ${products?.count - process.env.REACT_APP_LIMIT_PRODUCTS * page} sản phẩm`}</span>
                    <AiFillCaretUp />
                </button>
            </div>}
        </div>
    )
}

export default ManageExport
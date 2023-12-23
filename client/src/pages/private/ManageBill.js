import React, { useEffect, useState } from 'react'
import { apiGetBills, apiChangeStatusBill } from '../../apis'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/fn'
import { toast } from 'react-toastify'

const ManageBill = () => {
    const [billdata, setBilldata] = useState(null)
    const [detailBill, setDetailBill] = useState(false)
    const [isChangeStatus, setIsChangeStatus] = useState(false)
    const [status, setStatus] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')
    
  
    
    const fetchData = async () => {
        const response = await apiGetBills()
        
        if (response.err === 0) setBilldata(response.rs.rows)
        console.log("billdata",response)
    }
    useEffect(() => {
        !isChangeStatus && fetchData()
    }, [isChangeStatus])

    const handleSubmit = async () => {
        const data = { status }
        
        const response = await apiChangeStatusBill(data, isChangeStatus)
        if (response.err === 0) {
            toast.success('Cập nhật trạng thái đơn hàng thành công')
            setIsChangeStatus('')
        } else {
            toast.error('Cập nhật trạng thái đơn hàng thất bại')
        }
    }
    return (
        <div className='w-full h-full relative'>
          <button
                type='button'
                className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'>
                                <span>Xuất file </span>
            </button>

            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý hóa đơn</h3>
                
                <div className='flex items-center gap-4'>
                    {status === 'Failed' && <button
                        type='button'
                        className='bg-orange-500 rounded-md text-white font-semibold px-4 py-2'
                        onClick={() => { setStatus('Pending') }}
                    >
                        Quay lại
                    </button>}
                    {isChangeStatus && <button
                        type='button'
                        className='bg-main rounded-md text-white font-semibold px-4 py-2'
                        onClick={handleSubmit}
                    >
                        Cập nhật
                    </button>}
                </div>

            </div>
           

            <div className='flex flex-col mt-4 relative border border-solid border-gray-300'>
            <input  type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Tìm kiếm hóa đơn'
                onChange={e => setSearchKeyword(e.target.value)} />
                <div className='flex items-center justify-center px-2 py-4 border border-solid border-gray-300 '>
                    <span className='flex-1 font-medium text-center '>STT</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Mã hóa đơn</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Người tạo</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Số mặt hàng</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Số lượng</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Ngày xuất</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Trạng thái</span>
                    
                </div>
                {billdata?.filter((item)=> {
                            return searchKeyword.toLowerCase() === '' ? item : item.id.toLowerCase().includes(searchKeyword)}).map((el,index) => (
                    <div
                        key={el.id} className='flex items-center justify-center px-2 py-4 border-t hover:bg-gray-200 cursor-pointer'
                        onClick={() => setDetailBill(el)}
                    >
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300 text-center'>{index +1}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{'#' + el.id.slice(0, 8)}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el.customer.name}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el?.billDetails?.length}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el?.billDetails?.reduce((total,i)=>total+i.quantity,0)}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{moment(el.createdAt).format('DD/MM/YYYY')}</span>
                        <span className='flex-1 flex justify-center'>
                        {console.log(el)}
                            {isChangeStatus === el.id
                                ? <select className='border p-2' value={status} onClick={e => e.stopPropagation()} onChange={e => setStatus(e.target.value)} >
                                    <option value="Success">Success</option>
                                    <option value="Failed">Failed</option>
                                    {!el?.isChecked && <option value="Pending">Pending</option>}
                                </select>
                                : <div
                                    className={`w-[90px] cursor-pointer ${el.status === 'Success'
                                        ? 'bg-green-500' : el.status === 'Pending'
                                            ? 'bg-orange-500' : 'bg-red-500'} py-1 flex items-center justify-center text-white `}
                                    onClick={(e) => {
                                        if (!el?.isChecked) {
                                            e.stopPropagation()
                                            setIsChangeStatus(el.id)
                                            setStatus(el.status)
                                        }
                                    }}
                                >
                                    {el.status}
                                </div>}
                        </span>
                       
                    </div>
                ))}


                {detailBill && <div className='pb-8 border border-solid border-gray-300'>
                
                    <h3 className='font-bold text-[18px] pt-8'>
                        <span>Chi tiết hóa đơn : </span>
                        <span className='uppercase'>{'  #' + detailBill.id.slice(0, 8)}</span>
                    </h3>

                    <div className='flex flex-col mt-4 border border-solid border-gray-300'>
                        {detailBill?.billDetails?.map(el => (
                            <div key={el.id} className='p-4 border border-solid border-gray-300'>
                                <div className='flex gap-2'>
                                    <img src={el.products?.thumb} alt="" className='w-[100px] h-[100px] border rounded-md object-cover' />
                                    <div className='flex flex-col'>
                                        <Link
                                            className='font-semibold hover:underline cursor-pointer text-main'
                                            to={`/${el.pid}/${formatVietnameseToString(el.products.name)}`}
                                        >
                                            {el.products.name}
                                        </Link>
                                        <span className='flex gap-2'>
                                            <span className='font-medium'>Số lượng:</span>
                                            <span>{el.quantity}</span>
                                        </span>
                                        {/* <span className='flex gap-2'>
                                            <span className='font-medium'>Tổng giá:</span>
                                            <span>{Number(el.price.toFixed(1)).toLocaleString() + ' vnđ'}</span>
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ManageBill
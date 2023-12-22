
import React, { useEffect, useState } from 'react'
import {  apiGetImportBills } from '../../apis'
import moment from 'moment'
 import Xlsx from '../../utils/Xlsx'

const ManageImportBill = () => {
    const [billdata, setBilldata] = useState(null)
    const [detailBill, setDetailBill] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    
    const fetchData = async () => {
        const response = await apiGetImportBills()
        if (response.err === 0) setBilldata(response.rs.rows)
    }

    let handleExport = async () =>{
        let response1 = await apiGetImportBills({
        type :'SUBJECT',
        limit :'',
        offset:'',
        keyword:''
    })
    console.log("response123",response1)
    if(response1 && response1.err === 0){
        await Xlsx.exportExcel(response1.rs.rows,'Nhập hàng','bill_nhap_hang')
    }}

  

    useEffect(() => {
       fetchData()
    }, [])

    
    return (
        <div className='w-full h-full relative'>
           
           <button
                type='button'
                className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                 onClick={() => handleExport()}>
                
                <span>Xuất file </span>
            </button>
            <div className='flex flex-col mt-4 relative border border-solid border-gray-300'>
            <input  type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Tìm kiếm hóa đơn'
                onChange={e => setSearchKeyword(e.target.value)} />

                <div className='flex items-center justify-center px-2 py-4 border border-solid border-gray-300 '>
                    <span className='flex-1 font-medium text-center '>STT</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Mã hóa đơn nhập</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Mã sản phẩm</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Người tạo</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Số lượng</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Tồn cũ</span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Tồn mới </span>
                    <span className='flex-1 font-medium flex justify-center border-l border-r border-solid border-gray-300'>Ngày Nhập</span>
                    
                    
                </div>
                {billdata?.filter((item)=> {
                            return searchKeyword.toLowerCase() === '' ? item : item.id.toLowerCase().includes(searchKeyword)}).map((el,index) => (
                    <div
                        key={el.id} className='flex items-center justify-center px-2 py-4 border-t hover:bg-gray-200 cursor-pointer'
                        onClick={() => setDetailBill(el)}
                    >
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300 text-center'>{index +1}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{'#' + el.id.slice(0, 8)}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el?.billDetail[0]?.pid.slice(0, 8)}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el.customer.name}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{Number(el?.billDetail[0]?.quantity) - Number(el?.billDetail[0]?.preQuantity) }</span>
                       
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el?.billDetail[0]?.preQuantity}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{el?.billDetail[0]?.quantity}</span>
                        <span className='flex-1 flex justify-center border-l border-r border-solid border-gray-300'>{moment(el.createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageImportBill
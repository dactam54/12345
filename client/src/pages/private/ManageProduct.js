import React, { useEffect, useState } from 'react'
import icons from '../../utils/icons'
import { apiGetProductsAdmin, apiDeleteProduct } from '../../apis/product'
import { useDispatch } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'
import moment from 'moment'
import { InsertProduct, EditImagesProduct } from '../../components'
import { toast } from 'react-toastify'
import { CiImport } from 'react-icons/ci'
import Xlsx from '../../utils/Xlsx'



const { AiFillCaretDown,AiFillCaretUp} = icons

const cols = [
    'PID',
    'Ảnh sản phẩm',
    'Tên sản phẩm',
    'Mã sản phẩm',
    'Nhãn hiệu',
    'Loại hàng',
    'Đã bán',
    'Kho',
    'Ngày tạo',
    'Thao tác'
]


const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [isEditImage, setIsEditImage] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [update, setUpdate] = useState(false)
    const [page, setPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    const dispatch = useDispatch()

    const fetchProducts = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiGetProductsAdmin({ page: page })
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) setProducts(response.productDatas)
        console.log("response1",response.productDatas.rows)
    }

    useEffect(() => {
        !isEdit && fetchProducts()
    }, [isEdit, page, update])

    const handleUpdate = (product) => {
        setIsEdit(true)
        setEditingProduct(product)
    
    }

    // let handleExport = async () =>{
    //     let response1 = await apiGetProductsAdmin({
    //     type :'SUBJECT',
    //     limit :'',
    //     offset:'',
    //     keyword:''
    // })
    
    // if(response1 && response1.err === 0){
    //     await Xlsx.exportExcel(response1?.productDatas.rows,'San pham','list_san_pham')
    // }}

    const handleDeleteProduct = async (id) => {
        const response = await apiDeleteProduct(id)
        if (response.err === 0) {
            toast.success(response.mes)
            setUpdate(prev => !prev)
        } else toast.error(response.mes)
    }

   
    return (
        <div className='relative'>
            {isEdit && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <InsertProduct
                    product={editingProduct}
                    setIsEdit={setIsEdit}
                />
            </div>}

            {isCreate && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <InsertProduct
                    product={editingProduct}
                    setIsCreate={setIsCreate}
                />
            </div>}
            
            {isEditImage && <EditImagesProduct isEditImage={isEditImage} setIsEditImage={setIsEditImage} />}
            
            <div className='flex items-center justify-between border-b border-gray-200'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý sản phẩm</h3>
                <button
                    type='button'
                    onClick={() => {        
                        setEditingProduct(null)
                        setIsCreate(true)
                    }}
                    className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                >
                    <CiImport size={18} />
                    <span>Thêm mới</span>
                </button>
            </div>
            
            <div className='py-4'>
            {/* <button
                type='button'
                className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                onClick={() => handleExport()}
                 >
                <span>Xuất file </span>
            </button> */}
             <div>

        <input  type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Tìm kiếm sản phẩm'
                onChange={e => setSearchKeyword(e.target.value)} />
        </div>
                {/* <div>
                    <span className='font-bold'>Sort by:</span>
                </div> */}
                <table className="table-auto w-full mt-4">
                     <thead>
                        <tr className='border-b border-t'>
                            {cols.map((el, index) => (
                                <td key={index} className='p-2 font-bold border border-solid border-gray-300 text-center' >{el}</td>
                            ))}
                        </tr>
                    </thead> 

                
                    <tbody>

                    
                        {products?.rows?.filter((item)=> {
                            return searchKeyword.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchKeyword)})
                        .map((item, index) => (
                            <tr key={item.id} className='border border-solid border-gray-300'>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{index + 1}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>
                                <img src={item.thumb} alt="" className='h-[50px] object-contain' />
                                </td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.name}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.id.slice(0,8    )}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.brand}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.catalog}</td>    
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.boughtProducts?.reduce((sum, el) => sum + el.quantity, 0)}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{item.quantity}</td>
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto `}>{moment(item.createdAt).format('DD/MM/YY')}</td>
                                <td className='flex gap-2 pt-2'>
                                <span
                                        onClick={() => setIsEditImage(item)}
                                        className='p-2 text-main hover:underline cursor-pointer'
                                    >Thay đổi ảnh</span> 
                                    <span
                                        className='p-2 cursor-auto text-main hover:underline '
                                        onClick={() => handleUpdate(item)}
                                    >Sửa</span>

                                    <span
                                        onClick={() => handleDeleteProduct(item.id)}
                                        className='p-2 text-main hover:underline cursor-pointer'
                                    >Xóa</span>
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

export default ManageProduct
import React, { useState, useEffect } from 'react'
import { apiUpdateBrandByAdmin, apiDeleteBrandByAdmin, apiGetBrands } from '../../apis/'
import icons from '../../utils/icons'
import { toast } from 'react-toastify'
import actionTypes from '../../store/actions/actionTypes'
import { useDispatch } from 'react-redux'
import { CreateNewBrand } from '../../components'
const { AiOutlinePlus ,AiFillCaretDown} = icons

const ManageBrand = () => {
    const dispatch = useDispatch()
    const [brand, setBrands] = useState(null)
    const [isEdit, setIsEdit] = useState('')


    const [payload, setPayload] = useState({
        name: '',
        image: '',
    })

    const [isCreate, setIsCreate] = useState(false)
    const [render, setRender] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')

    useEffect(() => {
        const fetchBrands = async () => {
            const rs = await apiGetBrands()
            if (rs.err === 0) setBrands(rs.brandDatas)
        }
        !isEdit && fetchBrands()
    }, [isEdit, render])
    
    const handleEdit = (user) => {
        setPayload({
            name: user?.name || '',
            image: ''
        })
        setIsEdit(user.id)
    }
    
    const handleUpdate = async (id) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('image', payload.image)
        dispatch({ type: actionTypes.LOADING, flag: true })
        const rs = await apiUpdateBrandByAdmin(id, formData)
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (rs.err === 0) {
            setIsEdit('')
            toast.success(rs.mes)
        }
        else toast.error(rs.mes)
    }

    const handleDelete = async (id) => {
        const rs = await apiDeleteBrandByAdmin(id)
        if (rs.err === 0) {
            setRender(prev => !prev)
            toast.success(rs.mes)
        }
        else toast.error(rs.mes)
    }
    
    return (
        <div className='relative'>
            {isCreate && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <CreateNewBrand
                    setIsCreate={setIsCreate}
                    setRender={setRender}
                />
            </div>}

            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý nhãn hiệu</h3>
                <button
                    type='button'
                    onClick={() => setIsCreate(true)}
                    className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                >
                    <AiOutlinePlus size={18} />
                    <span>Thêm mới</span>
                </button>
            </div>
            <div className='py-4'>
            <input
                type="text"
                className='bg-white text-gray-700 rounded-md py-2 px-4 w-full'
                placeholder='Tìm kiếm nhãn hiệu'
                onChange={e => setSearchKeyword(e.target.value)}
            />

            

                <table className="table-auto w-full mt-4 border border-solid border-gray-300">
                    <thead>
                        <tr className='border-b border-t text-center '>
                            <td className='p-2 font-bold border border-solid border-gray-300 '>STT</td>
                            <td className='p-2 font-bold border border-solid border-gray-300'>Tên nhãn hàng</td>
                            <td className='p-2 font-bold border border-solid border-gray-300'>Ảnh nhãn hàng</td>
                            <td className='p-2 font-bold border border-solid border-gray-300'>Thao tác</td>
                        </tr>
                    </thead>
 
                    <tbody>
                        {brand?.filter((item)=>{return searchKeyword.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchKeyword)}).map((item, index) => (
                            <tr key={item.id} className='border border-solid border-gray-300'>

                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                
                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {isEdit !== item.id
                                        ? <span>{item.name}</span>
                                        : <input
                                            type='text'
                                            className='border px-2 py-1 w-full'
                                            value={payload.name}
                                            onChange={e => setPayload(prev => ({ ...prev, name: e.target.value }))}
                                        />}
                                </td>

                                <td className={`p-2 border border-solid border-gray-300 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {isEdit !== item.id
                                        ? <img src={item.image} alt="" className='w-[200px] h-[50px] object-cover' />
                                        : <div>
                                            <label htmlFor="file">{payload?.image?.name || 'Chưa chọn ảnh'}</label>
                                            <input
                                                type='file'
                                                className='border px-2 py-1 w-full '
                                                id='file'
                                                value=''
                                                hidden
                                                onChange={e => setPayload(prev => ({ ...prev, image: e.target.files[0] }))}
                                            />
                                        </div>}</td>

                                        

                                <td className='flex gap-2 '>
                                    {isEdit === item.id
                                        ? <span
                                            className='p-2 cursor-pointer text-main hover:underline '
                                            onClick={() => handleUpdate(item.id)}
                                        >Cập nhật</span>
                                        : <span
                                            className='p-2 cursor-pointer text-main hover:underline'
                                            onClick={() => handleEdit(item)}
                                        >Sửa</span>}
                                    <span
                                        className='p-2 cursor-pointer text-main hover:underline '
                                        onClick={() => handleDelete(item.id)}
                                    >Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* {brand && brand.count && <div className='flex items-center justify-center'>
                <button
                    type='button'
                    className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                    // onClick={() => setPage(prev => prev + 1)}
                >
                    <span>{`Xem thêm ${brand?.count } sản phẩm`}</span>
                    <AiFillCaretDown />
                </button>
            </div>} */}
            
        </div>
    )
}

export default ManageBrand
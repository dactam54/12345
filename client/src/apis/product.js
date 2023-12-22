import axios from '../axios'

export const apiGetProducts = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/products',
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetProductById = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/products/getone',
            params: { pid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailCart = (pids) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/products/cart',
            params: { pids }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiBuy = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/products/buy',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetProductsAdmin = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/products/admin',
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdateProduct = (pid, data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: `/api/v1/products/admin/${pid}`,
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiImportProduct = ( pid, data) => new Promise(async (resolve, reject) => {
  
    try {
        const response = await axios({
            
            method: 'post',
            url: `/api/v1/products/admin/import/${pid}`,
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiCreateProduct = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `/api/v1/products/admin`,
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetDashBoard = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/products/admin/dashboard`,
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetBills = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/products/admin/bills`,
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiGetImportBills = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/v1/products/admin/billimports`,
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiChangeStatusBill = (data, pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: `/api/v1/products/admin/changestatus/` + pid,
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiDeleteProduct = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `/api/v1/products/admin/` + pid,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdateVariants = (pid, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: `/api/v1/products/variants/` + pid,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


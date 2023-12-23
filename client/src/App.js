import path from "./utils/path";
import { Route, Routes } from 'react-router-dom'
import { Public, Login ,Detail  } from './pages/public'
import { Order } from './pages/smember';
import { System, ManageBrand, ManageProduct, ManageUser, Statistics, ManageBill, ManageExport, ManageImport,ManageImportBill, PDF, ProductCardPage } from "./pages/private";
import { Alert, Loading } from "./components";
import { useDispatch, useSelector } from 'react-redux'

import * as actions from './store/actions'
import { useEffect } from "react";
import actionTypes from "./store/actions/actionTypes";
import { ToastContainer } from 'react-toastify'




function App() {

  const dispatch = useDispatch()
  
  const { alert, isShowCart, isLoading } = useSelector(state => state.app)

  useEffect(() => {
    dispatch(actions.getBrands())
  }, [])


  return (
    
    <div className="relative h-screen">

      {alert && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Alert />
      </div>}
      {isLoading && <div className="fixed top-0 left-0 right-0 z-[1000] bottom-0 bg-overlay-70 flex justify-center items-center">
        <Loading />
      </div>}
      {isShowCart && <div
        className="fixed w-screen z-[1000] h-screen bg-overlay-70 flex justify-end"
        onClick={() => dispatch({ type: actionTypes.SHOW_CART, flag: false })}
      >

      </div>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.DETAIL} element={<Detail />} />
        </Route> 
        
        {/* Private routes */}
        <Route path={path.SYSTEM} element={<System />}>
        <Route path={path.STATISTICS} element={<Statistics />} />
        <Route path={path.PRODUCT_CARD_PAGE} element={<ProductCardPage />} />
          <Route path={path.MANAGE_BRAND} element={<ManageBrand />} />
          <Route path={path.MANAGE_EXPORT} element={<ManageExport />} />
          <Route path={path.BUY} element={<Order />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} /> 
          <Route path={path.MANAGE_IMPORT} element={<ManageImport />} /> 
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_Bill} element={<ManageBill />} />
          <Route path={path.MANAGE_Bill_Import} element={<ManageImportBill />} />
          <Route path={path.PRODUCT_CARD_PAGE} element={<ProductCardPage />} />
          <Route path={path.PDF} element={<PDF />} />
          <Route path={'*'} element={<Statistics />} />

        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import {
  apiGetProductsAdmin,
  apiDeleteProduct,
  apiImportManyProducts,
} from "../../apis/product";
import { useDispatch } from "react-redux";
import actionTypes from "../../store/actions/actionTypes";
import moment from "moment";
import { InsertProduct, EditImagesProduct } from "../../components";
import { toast } from "react-toastify";
import { CiImport } from "react-icons/ci";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
} from "@mui/material";

const { AiFillCaretDown, AiFillCaretUp } = icons;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const cols = [
  "PID",
  "Ảnh sản phẩm",
  "Tên sản phẩm",
  "Nhãn hiệu",
  "Loại hàng",
  "Đã bán",
  "Kho",
  "Ngày tạo",
  "Thao tác",
];

const ManageImport = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();
  const [openInsert, setOpenInsert] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProducts = React.useCallback(async () => {
    dispatch({ type: actionTypes.LOADING, flag: true });
    const response = await apiGetProductsAdmin({ page: page });
    dispatch({ type: actionTypes.LOADING, flag: false });
    if (response.err === 0) setProducts(response.productDatas);
  }, [dispatch, page]);

  const handleImport = async () => {
    const response = await apiImportManyProducts({
      hoaDons: selectedProducts?.map((p) => ({
        productId: p.productId,
        quantity: parseInt(p.quantity),
      })),
    });

    if (response?.id) {
      toast.success("Nhập hàng thành công");
      setSelectedProducts([]);
      fetchProducts();
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b border-gray-200">
        <h3 className="font-bold text-[30px] pb-4 ">Quản lý nhập sản phẩm</h3>
      </div>

      <div className="py-4">
        <div>
          <input
            type="text"
            className="bg-white text-gray-700 rounded-md py-2 px-4 w-full"
            placeholder="Tìm kiếm sản phẩm"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        {/* <div>
                    <span className='font-bold'>Sort by:</span>
                </div> */}
        <div className="flex w-full justify-end">
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedProducts?.length}
            onClick={async () => {
              setOpenInsert(true);
            }}
          >
            Nhập sản phẩm
          </Button>
        </div>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="border-b border-t">
              {cols.map((el, index) => (
                <td
                  key={index}
                  className="p-2 font-bold border border-solid border-gray-300 text-center"
                >
                  {el}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {products?.rows
              ?.filter((item) => {
                return searchKeyword.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(searchKeyword);
              })
              .map((item, index) => (
                <tr
                  key={item.id}
                  className="border border-solid border-gray-300"
                >
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    <img
                      src={item.thumb}
                      alt=""
                      className="h-[50px] object-contain"
                    />
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {item.brand}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {item.catalog}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {item.boughtProducts?.reduce(
                      (sum, el) => sum + el.quantity,
                      0
                    )}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {item.quantity}
                  </td>
                  <td
                    className={`p-2 border border-solid border-gray-300 ${
                      index % 2 === 0 ? "" : "bg-gray-100"
                    } m-auto `}
                  >
                    {moment(item.createdAt).format("DD/MM/YY")}
                  </td>
                  <td className="flex gap-2 pt-2">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            selectedProducts.find(
                              (el) => el.productId === item.id
                            ) || false
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts([
                                ...selectedProducts,
                                {
                                  productId: item.id,
                                  name: item.name,
                                  thumb: item.thumb,
                                  quantity: 1,
                                },
                              ]);
                            } else {
                              setSelectedProducts(
                                selectedProducts.filter(
                                  (el) => el.productId !== item.id
                                )
                              );
                            }
                          }}
                        />
                      }
                      label="Chọn sản phẩm"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={openInsert}
        onClose={() => setOpenInsert(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3 className="font-bold text-[30px] pb-4 ">Sản phẩm đã chọn</h3>

            <div>
              <table className="table-auto w-full mt-4">
                <thead>
                  <tr className="border-b border-t">
                    <td className="p-2 font-bold border border-solid border-gray-300 text-center">
                      STT
                    </td>
                    <td className="p-2 font-bold border border-solid border-gray-300 text-center">
                      Ảnh sản phẩm
                    </td>
                    <td className="p-2 font-bold border border-solid border-gray-300 text-center">
                      Tên sản phẩm
                    </td>
                    <td className="p-2 font-bold border border-solid border-gray-300 text-center">
                      Chọn Số lượng
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {selectedProducts?.map((item, index) => (
                    <tr
                      key={item.productId}
                      className="border border-solid border-gray-300"
                    >
                      <td
                        className={`p-2 border border-solid border-gray-300 ${
                          index % 2 === 0 ? "" : "bg-gray-100"
                        } m-auto `}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`p-2 border border-solid border-gray-300 ${
                          index % 2 === 0 ? "" : "bg-gray-100"
                        } m-auto `}
                      >
                        <img
                          src={item.thumb}
                          alt=""
                          className="h-[50px] object-contain"
                        />
                      </td>
                      <td
                        className={`p-2 border border-solid border-gray-300 ${
                          index % 2 === 0 ? "" : "bg-gray-100"
                        } m-auto `}
                      >
                        {item.name}
                      </td>
                      <td
                        className={`p-2 border border-solid border-gray-300 ${
                          index % 2 === 0 ? "" : "bg-gray-100"
                        } m-auto `}
                      >
                        <TextField
                          type="number"
                          required
                          fullWidth
                          defaultValue={item.quantity}
                          inputProps={{ min: 0, max: item.quantity }}
                          onChange={(e) => {
                            const newSelectedProducts = [...selectedProducts];
                            newSelectedProducts[index].quantity =
                              e.target.value;
                            setSelectedProducts(newSelectedProducts);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center py-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={async () => {
                    await handleImport();
                    setOpenInsert(false);
                  }}
                >
                  Nhập hàng
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {products && products.count && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center"
            onClick={() => setPage((prev) => prev + 1)}
          >
            <span>{`Xem thêm ${
              products?.count - +process.env.REACT_APP_LIMIT_PRODUCTS * page
            } sản phẩm`}</span>
            <AiFillCaretDown />
          </button>

          <button
            type="button"
            className="w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center"
            onClick={() => setPage((prev) => prev - 1)}
          >
            <span>{`Xem thêm ${
              products?.count - process.env.REACT_APP_LIMIT_PRODUCTS * page
            } sản phẩm`}</span>
            <AiFillCaretUp />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageImport;

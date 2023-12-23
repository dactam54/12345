import React, { useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import actionTypes from "../../store/actions/actionTypes";
import {
  apiGetProductsAdmin,
  apiTheKhoNhap,
  apiTheKhoXuat,
} from "../../apis/product";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as XLSX from "xlsx";

const columns = [
  { field: "id", name: "ID", width: 90 },
  {
    field: "image",
    name: "Ảnh sản phẩm",
    width: 150,
    editable: true,
  },
  {
    field: "nameProduct",
    name: "Tên sản phẩm",
    width: 150,
    editable: true,
  },
  {
    field: "idProduct",
    name: "Mã sản phẩm",
    width: 150,
    editable: true,
  },
  {
    field: "supplier",
    name: "Nhà cung cấp",
    width: 150,
    editable: true,
  },
  {
    field: "daban",
    name: "Đã xuất",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "tonkho",
    name: "Còn lại",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "thaotac",
    name: "Thao tác",
    width: 110,
  },
];

const columns1 = [
  {
    field: "id",
    name: "ID",
    width: 90,
  },

  {
    field: "nameProduct",
    name: "Tên sản phẩm",
    width: 150,
    editable: true,
  },
  {
    field: "idProduct",
    name: "Mã sản phẩm",
    width: 150,
    editable: true,
  },
  {
    field: "idbill",
    name: "Mã phiếu",
    width: 150,
    editable: true,
  },
  {
    field: "daban",
    name: "Tồn cũ",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "tonkho",
    name: "Tồn mới",
    type: "number",
    width: 110,
    editable: true,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const ProductCardPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const [page1, setPage1] = useState(0);
  const [rowPerPage1, setRowPerPage1] = useState(10);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(id === 1 ? dataModal : dataModal1);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "exportedData.xlsx");
  };

  const handleClose = () => setOpen(false);

  const [dataModal, setDataModal] = useState([]);
  const [dataModal1, setDataModal1] = useState([]);
  const [id, setId] = useState("");

  const fetchProducts = async () => {
    dispatch({ type: actionTypes.LOADING, flag: true });
    const response = await apiGetProductsAdmin({ page: page });
    dispatch({ type: actionTypes.LOADING, flag: false });
    if (response.err === 0) setData(response.productDatas);
    console.log("response123", response);
  };

  const fetchTheKhoNhap = async (id) => {
    const response = await apiTheKhoNhap(id);
    if (response.length > 0) {
      setDataModal(response);
      setId(1);
    } else {
      setDataModal([]);
      setId(1);
    }
  };
  const fetchTheKhoXuat = async (id) => {
    const response = await apiTheKhoXuat(id);
    if (response.length > 0) {
      setDataModal1(response);
      console.log("12345", response);
      setId(2);
    } else {
      setDataModal1([]);
      setId(2);
    }
  };

  const handleRender = (id) => {
    fetchTheKhoNhap(id);
    // fetchTheKhoXuat(id)
    handleOpen();
  };

  const handleRender1 = (id) => {
    fetchTheKhoXuat(id);
    handleOpen();
  };

  const handleChangePage = (event, newpage) => {
    setPage(newpage);
  };

  const handleRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage1 = (event, newpage) => {
    setPage1(newpage);
  };

  const handleRowsPerPage1 = (event) => {
    setRowPerPage1(+event.target.value);
    setPage1(0);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="font-bold text-[30px] pb-2 ">Quản lý sản phẩm</h3>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 850 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={column.field}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.rows
                  ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                  .map((row, index) => {
                    return (
                      <>
                        <TableRow hover key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <img
                              src={row.thumb}
                              alt=""
                              className="h-[80px] object-contain"
                            />
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.id}</TableCell>
                          {/* <TableCell>{row.id.slice(0, 8)}</TableCell> */}
                          <TableCell>{row.brand}</TableCell>
                          <TableCell>
                            {row.boughtProducts?.reduce(
                              (sum, el) => sum + el.quantity,
                              0
                            )}
                          </TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <button
                            onClick={() => handleRender(row.id)}
                            className="py-2 px-4 mt-4 bg-green-600 rounded-md text-white font-semibold"
                          >
                            Xem chi tiết nhập
                          </button>
                          <button
                            onClick={() => handleRender1(row.id)}
                            className="py-2 px-4 mt-4 bg-green-600 rounded-md text-white font-semibold"
                          >
                            Xem chi tiết xuất
                          </button>
                        </TableRow>
                      </>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          rowsPerPage={rowPerPage}
          page={page}
          count={data.count}
          component="div"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>

      {id === 1
        ? dataModal && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Lịch sử nhập kho
                </h1>

                {dataModal.length > 0 ? (
                  <Paper>
                    <TableContainer sx={{ maxHeight: 600 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã phiếu</TableCell>
                            <TableCell>Mã sản phẩm</TableCell>
                            <TableCell>Số lượng nhập thêm</TableCell>
                            <TableCell>Số lượng ban đầu</TableCell>
                            <TableCell>Số lượng sau</TableCell>
                            <TableCell>Thời gian</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataModal?.map((row) => {
                            return row.hoaDons
                              ?.slice(
                                page * rowPerPage,
                                page * rowPerPage + rowPerPage
                              )
                              ?.map((row1) => {
                                return (
                                  <TableRow key={row1?.id}>
                                    <TableCell>{row1?.maHoaDon}</TableCell>
                                    <TableCell>{row1?.productId}</TableCell>
                                    <TableCell>{row1?.quantity}</TableCell>
                                    <TableCell>{row1?.oldQuantity}</TableCell>
                                    <TableCell>{row1?.newQuantity}</TableCell>
                                    <TableCell>{`${row1?.createdAt.slice(
                                      11,
                                      19
                                    )} ${row1?.createdAt.slice(
                                      0,
                                      10
                                    )}`}</TableCell>
                                  </TableRow>
                                );
                              });
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div>
                      <button
                        type="button"
                        className="py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2"
                        onClick={exportToExcel}
                      >
                        <span>Xuất file </span>
                      </button>
                      <TablePagination
                        rowsPerPageOptions={[10, 15, 20]}
                        rowsPerPage={rowPerPage1}
                        page={page1}
                        count={dataModal.length}
                        component="div"
                        onPageChange={handleChangePage1}
                        onRowsPerPageChange={handleRowsPerPage1}
                      ></TablePagination>
                    </div>
                  </Paper>
                ) : (
                  <div>Không có thông tin</div>
                )}
              </Box>
            </Modal>
          )
        : dataModal1 && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Lịch sử xuất kho
                </h1>

                {dataModal1.length > 0 ? (
                  <Paper>
                    <TableContainer sx={{ maxHeight: 600 }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã phiếu</TableCell>
                            <TableCell>Mã sản phẩm</TableCell>
                            <TableCell>Số lượng xuất</TableCell>
                            <TableCell>Số lượng ban đầu</TableCell>
                            <TableCell>Số lượng sau</TableCell>
                            <TableCell>Thời gian</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataModal1?.map((row, index1) => {
                            return row.hoaDons
                              ?.slice(
                                page * rowPerPage,
                                page * rowPerPage + rowPerPage
                              )
                              ?.map((row1, index) => {
                                console.log("row1", row1);
                                return (
                                  <TableRow key={row1?.id}>
                                    <TableCell>{row1?.maHoaDon}</TableCell>
                                    <TableCell>{row1?.productId}</TableCell>
                                    <TableCell>{row1?.quantity || 0}</TableCell>
                                    <TableCell>
                                      {row1?.oldQuantity || 0}
                                    </TableCell>
                                    <TableCell>
                                      {Number(
                                        (row1?.oldQuantity || 0) -
                                          (row1?.quantity || 0)
                                      )}
                                    </TableCell>
                                    <TableCell>{`${row1?.createdAt.slice(
                                      11,
                                      19
                                    )}  ${row1?.createdAt.slice(
                                      0,
                                      10
                                    )}`}</TableCell>
                                  </TableRow>
                                );
                              });
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <div>
                      <button
                        type="button"
                        className="py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2"
                        onClick={exportToExcel}
                      >
                        <span>Xuất file </span>
                      </button>
                      <TablePagination
                        rowsPerPageOptions={[10, 15, 20]}
                        rowsPerPage={rowPerPage1}
                        page={page1}
                        count={dataModal1.length}
                        component="div"
                        onPageChange={handleChangePage1}
                        onRowsPerPageChange={handleRowsPerPage1}
                      ></TablePagination>
                    </div>
                  </Paper>
                ) : (
                  <div>Không có thông tin</div>
                )}
              </Box>
            </Modal>
          )}
    </div>
  );
};

export default ProductCardPage;

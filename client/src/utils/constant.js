import icons from "./icons";
import path from "./path";

const {
    MdOutlineDashboard,
    FaProductHunt,
    MdOutlineBrandingWatermark,
    RiBillLine
} = icons



export const adminSidebar = [
    {
        name: 'Tổng quan',
        icons: <MdOutlineDashboard size={22} />,
        path: path.SYSTEM + '/' + path.STATISTICS
    },
    // {
    //     name: 'Quản lý thành viên',
    //     icons: <FaUserFriends size={22} />,
    //     path: path.SYSTEM + '/' + path.MANAGE_USER
    // },
    {
        name: 'Quản lý sản phẩm',
        icons: <FaProductHunt size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_PRODUCT
    },
    {
        name: 'Quản lý nhập',
        icons: <FaProductHunt size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_IMPORT
    },
    {
        name: 'Quản lý xuất ',
        icons: <FaProductHunt size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_EXPORT
    },

    {
        name: 'Quản lý nhãn hiệu',
        icons: <MdOutlineBrandingWatermark size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_BRAND
    },
    {
        name: 'Hóa đơn nhập',
        icons: <RiBillLine size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_Bill_Import
    },
 
    {
        name: 'Hóa đơn xuất',
        icons: <RiBillLine size={22} />,
        path: path.SYSTEM + '/' + path.MANAGE_Bill
    },
    {
        name: 'Báo cáo',
        icons: <RiBillLine size={22} />,
        path: path.SYSTEM + '/' + path.PDF
    },
    {
        name: "Quản lý thẻ kho",
        icons: <RiBillLine size={22} />,
        path: path.SYSTEM + '/' + path.PRODUCT_CARD_PAGE
    }
]




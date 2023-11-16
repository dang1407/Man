const sidebarInf = [
    {
        title: "Tổng quan",
        bgpostion: "-33px -1630px"
    },
    {
        title: "Tiền mặt",
        bgpostion: "-78px -1631px"
    },
    {
        title: "Tiền gửi",
        bgpostion: "-121px -1633px"
    },
    {
        title: "Mua hàng",
        bgpostion: "-165px -1632px"
    },
    {
        title: "Bán hàng",
        bgpostion: "-206px -1631px"
    },
    {
        title: "Quản lý hóa đơn",
        bgpostion: "-254px -1632px"
    },
    {
        title: "Kho",
        bgpostion: "-294px -1632px"
    },
    {
        title: "Công cụ dụng cụ",
        bgpostion: "-339px -1633px"
    },
    {
        title: "Tài sản cố định",
        bgpostion: "-382px -1632px"
    },
    {
        title: "Thuế",
        bgpostion: "-427px -1634px"
    },
    {
        title: "Giá thành",
        bgpostion: "-470px -1633px"
    },
    {
        title: "Tổng hợp",
        bgpostion: "-514px -1632px"
    },
    {
        title: "Ngân sách",
        bgpostion: "-382px -1664px"
    },
    {
        title: "Báo cáo",
        bgpostion: "-552px -1636px"
    },
    {
        title: "Phân tích tài chính",
        bgpostion: "-207px -1667px"
    },
]

let container = document.getElementsByClassName("sidebar-list")[0];
for(let key in sidebarInf){
    // Khởi tạo các thẻ
    let sidebarItemBox = document.createElement("div");
    let sidebarItem = document.createElement("div");
    let sbIconBox = document.createElement("div");
    let sidebarItemIcon = document.createElement("div");
    let sidebarItemTitle = document.createElement("div");

    // Gán class
    sidebarItemBox.className = "sidebar-item-box";
    sidebarItem.className = "sidebar-item";
    sbIconBox.className = "sb-icon-box";
    sidebarItemIcon.className = "sidebar-item-icon";
    sidebarItemTitle.className = "sidebar-item-title";

    //Gán thông tin
    sidebarItemIcon.style.backgroundPosition = sidebarInf[key].bgpostion;
    sidebarItemTitle.innerText = sidebarInf[key].title;

    // Đưa các thẻ con vào trong thẻ cha
    sbIconBox.appendChild(sidebarItemIcon);
    sidebarItem.appendChild(sbIconBox);
    sidebarItem.appendChild(sidebarItemTitle);
    sidebarItemBox.appendChild(sidebarItem)
    // đưa vào danh sách
    container.appendChild(sidebarItemBox)
}
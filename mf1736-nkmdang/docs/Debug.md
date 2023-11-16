# Debug bài bạn MF1741 Trần Trung Kiên

## Debug API

### Lấy ra tất cả nhân viên

- Ctrl + F5 chạy chương trình
- Ctrl + Alt + P: mở bảng các process
- Chọn tiến trình đang chạy
- Đặt breakpoint tại hàm lấy ra danh sách nhân viên
- Chọn lệnh lấy ra toàn bộ nhân viên ở swagger => bắt đầu debug
- F10 chạy đến câu lệnh bên câu lệnh khai báo biến dbConnection, tạo connection
- F11 chạy vào hàm CreateConnection()
- F10 chạy câu lệnh trong hàm CreateConnection
- Shift + F11 nhảy ra khỏi hàm
- F10 chạy qua lệnh tạo sql (gọi procedure), thực hiện truy vấn, đóng connect
- Ở câu lệnh return result, nhấn Ctrl + Alt + V, L mở cửa sổ Local
- Sử dụng phím mũi tên di chuyển đến biến result
- Bấm phím Space để mở bảng xem danh sách các nhân viên, Esc để tắt bảng
- F10 để hoàn thành gọi hàm
- Shift + F9 để thoát khỏi việc get dữ liệu
  => Hàm kết thúc, chương trình trả về danh sách nhân viên xem tại Swagger

### Lấy ra nhân viên theo Id

- Luồng chính: Nhập đúng Id
  - Đặt breakpoint tại hàm lấy ra nhân viên theo Id
  - Chọn lệnh lấy ra nhân viên theo Id ở swagger => bắt đầu debug
  - F10 chạy đến câu lệnh bên câu lệnh khai báo biến dbConnection, tạo connection
  - F11 chạy vào hàm CreateConnection()
  - F10 chạy câu lệnh trong hàm CreateConnection
  - Shift + F11 nhảy ra khỏi hàm
  - F10 chạy qua lệnh tạo sql (gọi procedure), thực hiện truy vấn, đóng connect
  - Ở câu lệnh return result, nhấn Ctrl + Alt + V, L mở cửa sổ Local
  - Sử dụng phím mũi tên di chuyển đến biến result
  - Bấm phím Space để mở bảng xem thông tin nhân viên thây trả về thông tin của một nhân viên, Esc để tắt bảng
  - F10 để hoàn thành gọi hàm
  - Shift + F9 để thoát khỏi việc get dữ liệu
    => Hàm kết thúc, chương trình trả về thông tin nhân viên theo Id xem trên Swagger
- Luồng ngoại lệ: Nhập sai Id
  - Chọn lệnh lấy ra nhân viên theo Id ở swagger => bắt đầu debug
  - F10 chạy đến câu lệnh bên câu lệnh khai báo biến dbConnection, tạo connection
  - F11 chạy vào hàm CreateConnection()
  - F10 chạy câu lệnh trong hàm CreateConnection
  - Shift + F11 nhảy ra khỏi hàm
  - F10 chạy qua lệnh tạo sql (gọi procedure), thực hiện truy vấn, đóng connect
  - Ở câu lệnh return result, nhấn Ctrl + Alt + V, L mở cửa sổ Local
  - Sử dụng phím mũi tên di chuyển đến biến result
  - Bấm phím Space để mở bảng xem danh sách các nhân viên thấy trả về result = null, Esc để tắt bảng
  - F10 để hoàn thành gọi hàm
    => Hàm kết thúc, chương trình trả về thông tin nhân viên theo Id xem trên Swagger

## Xóa nhân viên theo Id

- Luồng chính: Nhập vào Id đúng
  - Đặt breakpoint tại hàm xóa nhân viên theo Id
  - Lấy 1 id nhân viên lấy được từ API GET
  - Chọn lệnh xóa nhân viên theo Id ở swagger => bắt đầu debug
  - F10 chạy đến câu lệnh bên câu lệnh khai báo biến dbConnection, tạo connection
  - F11 chạy vào hàm CreateConnection()
  - F10 chạy câu lệnh trong hàm CreateConnection
  - F11 chạy vào hàm lấy thông tin nhân viên theo Id
  - F10 chạy qua các câu lệnh trong hàm và thoát hàm
  - F10 chạy qua câu lệnh if kiểm tra mã nhân viên tồn tại
  - Ctrl + Alt + C mở cửa sổ Call Stack ra xem
  - F10 chạy qua câu lệnh tạo sql, param, thực hiện truy vấn, return result
  - Xem kết quả result ở Locals thấy trả về 1
- Luồng phụ: Id nhân viên nhập vào không hợp lệ
  - Ctrl + Shift + F10 kéo con trỏ chuột về đầu hàm
  - Chạy lại các bước như trên => Hàm throw ra Exception
  - Kết quả trả về trên swagger là mã lỗi 500 với thông báo Nhân viên không tồn tại

## Sửa thông tin nhân viên

- Luồng chính: Thông tin Id đầu vào nhập hợp lệ
  - Đặt breakpoint tại đầu hàm sửa thông tin nhân viên
  - Thao tác gọi api sửa thông tin nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1
  - F10 kết thúc gọi hàm
- Luồng phụ: Thông tin Id đầu vào không hợp lệ
  - Thao tác gọi api sửa thông tin nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 0, chương trình trả về 0 trên Swagger
- Luồng phụ: Thông tin Employee đầu vào không hợp lệ (rỗng)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1, chương trình trả về 1 trên Swagger
- Luồng phụ: Thông tin EmployeeCode đầu vào không hợp lệ (null)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - Nhận được lỗi 400, The EmployeeCode field is required
- Luồng phụ: Thông tin FullName đầu vào không hợp lệ (rỗng)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1, chương trình trả về 1 trên Swagger
- Luồng phụ: Thông tin FullName đầu vào không hợp lệ (null)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - Nhận được lỗi 400, The FullName field is required
    => Kết thúc hàm

## Thêm mới nhân viên

- Luồng chính: Thông tin Id đầu vào nhập hợp lệ
  - Đặt breakpoint tại đầu hàm thêm mới nhân viên
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1
  - F10 kết thúc gọi hàm
- Luồng phụ: Thông tin Id đầu vào không hợp lệ (Id không của nhân viên nào)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 0, chương trình trả về 0 trên Swagger
    => Kết thúc hàm
- Luồng phụ: Thông tin Employee đầu vào không hợp lệ (rỗng)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1, chương trình trả về 1 trên Swagger
- Luồng phụ: Thông tin EmployeeCode đầu vào không hợp lệ (null)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - Nhận được lỗi 400, The EmployeeCode field is required
- Luồng phụ: Thông tin FullName đầu vào không hợp lệ (rỗng)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - F10 chạy qua các lệnh tạo kết nối, tạo câu lệnh sql
  - F10 qua câu lệnh truy vấn thấy result = 1, chương trình trả về 1 trên Swagger
- Luồng phụ: Thông tin FullName đầu vào không hợp lệ (null)
  - Thao tác gọi api thêm mới nhân viên từ Swagger
  - Nhận được lỗi 400, The FullName field is required
    => Kết thúc hàm

## Debug phần Unit Test

- Đặt breakpoint và debug phần Unit Test thì Visual Studio báo The key combination (Ctrl + R, Ctrl + T) is bound to command(.TestExplorer.DebugAllTestInContext) which is not currentavailable

=> Không thực hiện được

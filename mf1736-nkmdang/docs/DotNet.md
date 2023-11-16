RESTful API:

- Trả về JSON
- Xây dựng dựa trên http
- API thiết kế tốt:

* Dễ đọc dễ làm việc,
* Hoàn chỉnh ngắn gọn
* Khó sử dụng sai

- Viết API để quản lý:

* HTTP Method: GET, POST, PUT, DELETE, PATCH

POST /users : Có thể tạo mới 1 hoặc nhiều đối tượng nhưng chỉ nên tạo 1 đối tượng
PUT /users?name=Hoa: Thông thường thì chỉ sửa 1

PUT /users/12345
=> tránh: PUT /users?userId=12345

DELETE /users: Xóa tất cả người dùng
Nodejs: DELETE ko có body, ASP.NET Core có thể có body
DELETE /users/123: Xóa 1 người dùng

Ngoài mã lỗi của http thì còn có mã lỗi tự tạo và trang web tra cứu mã lỗi cho người sử dụng

- Phân trang:

* Phân trang FE: lấy tất cả dữ liệu rồi FE tự phân trang
* Phân trang Offset (>3tr bản ghi thì truy vấn rất lâu): các kĩ thuật chia nhỏ database
* Phân trang Cursor paging

- ODM: Object Document Mapping, ORM: Object Relation Mapping
- Kết nối C# với Database

* Dapper: micro ORM.
* EFcore:
* ADO:

WEB API

- Kí hiệu địa cầu: Host chưa entry point nơi chạy ứng dụng
  - appsettings.json: Cấu hình trên các môi trường khác nhau
  - Program.cs: nơi chạy chương trình
- ignore bỏ .vs, bin và obj
- dependecies:

  - analyzer: phân tích code
  - Frameworks: +

- project: Các project gọi đến nhau

"Yêu cầu chuẩn bị cài đặt trước khi tham gia khóa học:
Trước các buổi học Fresher phải xem trước tài liệu nội dung lý thuyết cơ bản, trên lớp chủ yêu GV sẽ Demo và học viên sẽ làm bài tập.

- Visual Studio 2022
- Visual Code
- NodeJS
- GitHub for Windown (https://gitforwindows.org/)
- DbForge Studio (https://mily.vn/dbforge)
- MariaDB 10.5 (https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.5.19&os=windows&cpu=x86_64&pkg=msi&m=nus)
- Tài khoản: Microsoft Team, Github, Slack (Khuyến khích sử dụng tài khoản Gmail để đăng ký) - cập nhật các thông tin của mình vào đây: Link Tài khoản lớp Web"

## Connect ASP.NET Core với MySql sử dụng Dapper

- Cần một công cụ để kết nối đến DB:

- Có kết nối đến database: Connection String (địa chỉ DB mà sẽ kết nối đến)
- Tạo Connection từ Connection String
- Thực hiện truy vấn thêm, sửa, xóa, cập nhật dữ liệu
- Ngắt kết nối đến database
  ASP NET: ADO .NET
  => Thư viện dùng để kết nối đến nhiều loại cơ sở dữ liệu quan hệ

ORM: Dapper (Micro ORM), EFCore

Cần validate query để tránh hỏng DB
Tránh SQL Injection bằng cách chỉ truyền tham số câu lệnh SQL, không truyền câu lệnh SQL

## C# có đa luồng nhưng vẫn cần bất đồng bộ

- Multiple Thread

  +Tạo Thread => Dùng xong thì hủy

  => Dùng xong thì cho vào Stack, ai cần thì gọi ra

  => Sử dụng đồng bộ => Đợi => Thread đứng im

  => Sử dụng bất đồng bộ => Đợi chung (Thread Pool)

  => Thread được giải phóng => Nhét vào hàng đợi => Ai cần lấy ra dùng

**=> Sử dụng bất đồng bộ ở C# để tối ưu hiệu năng**

- JS: Promise, async, await
- C#: Task (hỗ trợ viết code bất đồng bộ theo kiểu đồng bộ), async, await

- Tên hàm thêm chữ async vào cuối

- Một số hàm trong Dapper

\+ QueryFirst

\+ QueryFirstAsync

\+ QueryFirstOrDefault

\- Tính chất của CSDL Quan hệ: **ACID**

- **Atomicity**: Tính nguyên tử

  - Thêm dữ liệu vào 2 bảng:

  - Transaction

- **Consitency**: Tính nhất quán

  - Ràng buộc: Constrains

- **Isolation**: Tính độc lập

  - Liên quan đến tương tranh dữ liệu:

    A: 5000 + 2000 = 7000

    B: 5000 + 1000 = 6000

  - Khóa: khóa bảng, khóa service: Distributed Lock

  - ConcurencyStamp:

    ConcurencyStamp = 1;

    A: 5000 + 2000 = 7000 => ConcurencyStamp = 2;

    B: 5000 + 1000 = 6000 => ConcurencyStamp = 1 != 2

- **Durabality**: Độ bền

  - Backup dữ liệu (Không đơn giản)

- Ctrl F5 hoặc Ctrl Shift B để chạy lại code
  -Dapper có thể tự đóng mở kết nối đến Database

- SQL Injection vào chức năng lấy thông tin nhân viên theo Id
  id1'; DELETE FROM Employee WHERE EmployeeId = 'id2

# Buổi học ngày 12/09/2023

## Testing

- Testing là gì?

  - Bao phủ dòng lệnh

  - Kiểm thử đơn vị

  - Kiểm thử tích hợp

  - Kiểm thử hệ thống

  - Kiểm thử hồi quy

  - Kiểm thử hộp trắng

  - Kiểm thử giá trị biên

  - Kiểm thử phân vùng giá trị

  - Kiểm thử bằng cơm

  - Kiểm thử tự động:

    - Kiểm thử hộp đen:

    - Kiểm thử hộp trắng: Biết được logic, luồng bên trong

- Các loại kiểm thử chính:

  - End-to-end Testing: Kiểm thử cuối

  - Frontend: Component, Unit Test

  - Backend: API Test (Black box: Gọi yêu cầu ở giao diện), Intergration Test, Unit Test.

    - API Test:

    - Intergration Test: Top down, Bottom up ( cả Black lẫn White box )

  - Unit Test: White box, Automation,

## Unit là gì?

\- **Unit Test** là **code** dùng để test một đơn vị code (**unit**) mà ta đã viết

- Viết Unit Test tốn rất nhiều thời gian, nhưng mang lại lợi ích rất lớn (mở rộng, bảo trì, đọc hiểu luồng hệ thống).

- Có thể xác định số Unit qua **logical path**
- Nếu chỉ có if else thì số **logical path** = số if + 1
- Dùng codecaverite để đếm số **logical path**
- Lưu trữ tiền trong C# phải dùng decimal

\- Viết **Unit Test**:

- Có code rồi mới viết Unit Test
- Viết Unit Test trước rồi mới Code

### Unit Test Framework C#

- MS Test
- xUnit: Đi sau, xịn hơn NUnit
- NUnit: Có sẵn trong VS

### Best Practice

Mỗi hàm test chỉ test một đơn vị code duy nhất
Quy tắc đặt tên
|||
|--------------|--------------|
| Tên của project test | [ProjectUnderTest].UnitTests |MISA.CukCuk.BL.UnitTests
|Tên của class trong project test | [Tên class cần test]Tests | EmployeeBLTests
| Tên của các method trong class | [Tên hàm cần test]_[Đầu vào, Kịch bản test]_[Đầu ra mong muốn] | ValidateRequestData_EmptyCode_ReturnsFalse()

BTVN: truyền vào chuỗi string để split ra

### Một ứng dụng có nhiều công ty dùng

- Một cty 1 database?
- Dùng chung 1 database? TenantId, CompanyId...

=> 50-100 công ty 1 database (ko quá giới hạn 3tr bản ghi)

=> Multi-Tenancy, 2 database transaction như nào

## Debug (14/09/2023)

Các kỹ thuật Debug trong Visual Studio

### Các phím tắt khi chưa debug

- Đánh region: Bôi đen => Ctrl K, S: Surround Width
- Ctrl K C: Comment
- Ctrl K U: Uncomment
- Ctrl K D: format code
- Bôi đen => Ctrl M, O để đóng khối code và Ctrl M, P để mở ra
- Ctrl M L toggle code
- Ctr R R: Đổi tên hàng loạt
- Shift Alt .: = Ctrl D của vscode
- Shift Alt ,: bỏ chọn của cái trên
- Shift Alt ;: Chọn tất cả các biến
- Ctrl F: tìm kiếm
- Ctrl Shift F: tìm kiếm nhiều
- Ctrl R T: chạy test phần test đang chọn
- Ctrl R A: Chạy tất cả các test
- Ctrl -: Quay lại hàm vừa đọc Navigate Backward
- F12: Goto defination (đi đến khai báo)
- Ctrl Shift -: Navigate Forward
- Ctrl F12: Go to implementation (class nào kế thừa class này)
- Ctrl Shift Alt:
- F9: Toggle breakpoint
- Ctrl Shift B: Build lại

### Phím tắt debug

- F5: debug
- Ctrl F5: Start without debug
- Họ Ctrl Alt dùng để mở cửa sổ
- Ctrl Alt P: Cửa sổ tiến trình (attach to process)
- Shift Alt P: Reattach luồng
- F11: Step into
- F10: Step Over
- Shift + F11: Step Out

- Khi đang debug rồi:

  - F5: Continue đến breakpoint tiếp theo
  - Ctrl Shift F10 (kéo chuột lên): Set next statement
  - F9 F5 F9: bỏ qua vòng lặp (Combo run to cursor)
  - Ctrl F10: bỏ qua vòng lặp (Combo run to cursor)
  - Cửa số Imidiate (Chạy trong quá trình debug)
  - Call Stack: Các hàm được gọi
  - Ctrl Alt I: Open Imediate
  - Ctrl Alt C: Open Call Stack
  - Ctrl Alt W [1 2 3 4]: mở cửa sổ watch (có 4 cửa sổ)
  - Ctr Alt V, L: Cửa sổ local
  - Ctrl Alt B: Open breakpoint
  - Shift F9: Quick Watch

- Shift F5: Dừng debug

- BTVN: Debug chéo bài của bạn, viết báo cáo vào Slack

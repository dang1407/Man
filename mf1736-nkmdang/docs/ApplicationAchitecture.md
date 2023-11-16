# Kiến trúc code Backend

- MVC: Model, View, Controller
  - Model:
  - View:
  - Controller:
- Clean Achitecture
- N-Tier

- Tách nhỏ code ra: Dễ tái sử dụng
- Phân chia rõ ràng các chức năng
- Dễ bảo trì
- Dễ viết Unit Test

## Kiến trúc đa tầng N-Tier

- Ctroller (trước xử lý hết logic) => Định tuyến, validate Authentication, Authorization
- Business Logic Layer (BL): Validate nghiệp vụ
- Data logic layer (DL): Tương tác với cơ sở dữ liệu

=> Luồng: Host (Program.cs, App.setting) => Controller gọi BL, BL gọi DL, DL gọi Store Procedure => dễ nhầm lẫn

## Clean Achitecture: Kiến trúc sạch

- Nên chia các BL, DL thành các project nhỏ để dễ quản lý
- Bài toán các Class tương tác với nhau
  - Phụ thuộc trực tiếp
- SOLID: 5 nguyên tắc thiết kế hướng đối tượng

  - S: Single Responsibility Principle
  - Dependency Inversion: + Đảo ngược sự phụ thuộc + Tương tác thông qua Interface

- Denpendency Injection:

  - Quản lý tập trung các Instance
  - Vòng đời của các Instance:
    - Singleton: khởi tạo 1 lần, bao giờ gọi đến thì mới khởi tạo
    - Scope: Khởi tạo 1 lần theo request
    - Transient: Gọi đâu khởi tạo đấy, bao giờ gọi đến thì mới khởi tạo
  - Lấy ra:
    - Constructor:
    - Property:
    - Method:

- Clean Achitect:

  - API -> Application -> Domain
  - Infrastructure -> Application -> Domain
  - Domain: Entity, Model, Enum, Exception, Validate Business, Interface Repository
  - try catch trong middle ware
  - Trùng mã nhân viên trả về 409 (conflict exception)
  - Check input đầu vào trong service

- Repository Pattern
  - Có 2 nguồn dữ liệu nạp vào thực thể
  - Từ database -> Dữ liệu uy tín, ko cần validate
  - Từ người dùng -> dữ liệu ko uy tín, cần validate
- Employee có 10 trường muốn trả về 5 trường
  - (JSON.Stringify...)
  - Model
- Application:
  - DTO Data Transfer Object
  - Dữ liệu trả về
  - Dữ liệu thêm vào (EmployeeId, dữ liệu truyền lên khác Entity)
  - Chuyển dữ liệu trả về và thêm vào cho linh hoạt
  - Application Services: Ghép logic

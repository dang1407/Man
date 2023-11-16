# Buổi học ngày 19/09/2023

## Dựng base để tái sử dụng code của các class

- Cái gì kế thừa được thì nhét vào Base

## AutoMapper, AutoMapper.Extensions.Microsoft.DependencyInjection

- Autofac

## Design Pattern

- Repository Pattern:

  - Tôi có 1 mẫu để tương tác với một kho lưu trữ (DB, file, SQL, API, ...)
  - Interface để trừu tượng hóa việc tương tác

- Unit of Work Pattern:

  - dbcontext: cơ chế quản lý các ngữ cảnh của DB
  - Unit of Work: Quản lý transaction, ...

- Unit of Work dùng trong Infrastructure (Service)
  - IDisposable, IAsynDisposable:
- Application sử dụng Unit of Work (Không phải Repository)
- Repository chỉ khai báo Unit of Work
- Configuration.Abstraction

- Thời gian phải có múi giờ
  - SQL ko lưu múi giờ, MongoDB có lưu múi giờ
  -

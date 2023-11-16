<template>
  <div class="sidebar">
    <div class="logo-container flex-center">
      <a href="" class="home-direct flex-center"></a>
      <a href="" class="logo">
        <img
          src="../../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
          alt=""
        />
      </a>
    </div>

    <div class="sidebar-list">
      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -33px -1630px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Tổng quan</a>
          <!-- <router-link to="/employees" class="sidebar-item-title">Nhân viên</router-link> -->
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -78px -1631px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Tiền mặt</a>
          <!-- <router-link to="/customers" class="sidebar-item-title"> Khách hàng</router-link> -->
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -121px -1633px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Tiền gửi</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -165px -1632px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Mua hàng</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -206px -1631px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Bán hàng</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -254px -1632px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Quản lý hóa đơn</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -294px -1632px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Kho</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -339px -1633px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Công cụ dụng cụ</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -382px -1632px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Tài sản cố định</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -427px -1634px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Thuế</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -470px -1633px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Giá thành</a>
        </div>
      </div>

      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -514px -1632px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Tổng hợp</a>
        </div>
      </div>
      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -382px -1664px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Ngân sách</a>
        </div>
      </div>
      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -552px -1636px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Báo cáo</a>
        </div>
      </div>
      <div class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -207px -1667px"
            ></div>
          </div>
          <a href="#" class="sidebar-item-title">Phân tích tài chính</a>
        </div>
      </div>
      <router-link to="/employees?page=1&pageSize=10" class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -592px -1631px"
            ></div>
          </div>
          <div class="sidebar-item-title">Nhân viên</div>
        </div>
      </router-link>

      <router-link to="/setting" class="sidebar-item-box">
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -90px -257px"
            ></div>
          </div>
          <div class="sidebar-item-title">Cài đặt</div>
        </div>
      </router-link>
      <!-- <router-link to="customers" class="sidebar-item-box">
        <div class="sidebar-item-padleft"></div>
        <div class="sidebar-item">
          <div class="sb-icon-box">
            <div
              class="sidebar-item-icon"
              style="background-position: -636px -1631px"
            ></div>
          </div>
          <div class="sidebar-item-title">Khách hàng</div>
        </div>
      </router-link> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
@import url(./thesidebar.css);
.router-link-active {
  border-color: #2ca01c;
}

.router-link-active .sidebar-item {
  background-color: rgba(212, 215, 220, 0.2);
}
</style>

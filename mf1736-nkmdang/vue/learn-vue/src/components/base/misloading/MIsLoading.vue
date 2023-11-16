<template>
  <div class="container__fixed">
    <div class="loader"></div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.container__fixed {
  z-index: 6;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  /* background-color: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 3px solid #2ca012;
  border-radius: 50%;
  border-top: 3px solid #fff;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

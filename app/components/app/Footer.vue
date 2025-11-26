<template>
  <footer class="footer-container d-flex align-center justify-center mt-3">
    <p class="footer-text text-center font-weight-light mb-0">
      <span class="blacktext--text">
        Powered by
        <a
          href="https://daptee.com.ar"
          target="_blank"
          class="footer-link font-weight-medium"
        >
          Daptee
          <v-icon size="12" class="mb-1">$daptee</v-icon>
        </a>
      </span>
      <span class="ml-2">v 1<b>.</b>0<b>.</b>1 {{ envMode }}</span>
    </p>
  </footer>
</template>

<script setup lang="ts">
const envMode = process.env.NODE_ENV
</script>

<style lang="scss" scoped>
.footer-container {
  background-color: white;
  height: 50px;
  .footer-text {
    font-size: 0.625rem;
  }
  .footer-link {
    color: #3bcdbd;
  }
}
</style>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #1772B4;
}

html {
  box-sizing: border-box;
  font-family: "Victor Mono", monospace;
  background: linear-gradient(-93deg, #f8b58b3a, #3F66CA3a);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0 auto;
}

@font-face {
  font-family: '仓耳今楷05-W01';
  src: url('/font/仓耳今楷05-W01.ttf') format('truetype');
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<template>
  <nav class="nav">
    <NuxtLink to="/" class="nav-link">Unicode & Hanzi</NuxtLink>
    <NuxtLink to="/" class="nav-link">Generator</NuxtLink>
    <NuxtLink to="/blocks" class="nav-link">Unicode Blocks</NuxtLink>
    <NuxtLink to="/resources" class="nav-link">Resources</NuxtLink>
  </nav>
</template>

<style scoped>
.nav {
  margin-bottom: 32px;
  padding: 16px;
  background: linear-gradient(89deg, #f8b58b3a, #3F66CA3a);
  width: auto;
}

.nav-link {
  margin-right: 16px;
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--secondary-color);
  text-decoration: underline;
}

.nav-link.router-link-active {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>

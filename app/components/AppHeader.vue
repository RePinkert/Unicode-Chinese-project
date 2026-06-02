<template>
  <nav class="nav">
    <div class="nav-links">
      <NuxtLink to="/" class="nav-link">Unicode & Hanzi</NuxtLink>
      <NuxtLink to="/" class="nav-link">Generator</NuxtLink>
      <NuxtLink to="/blocks" class="nav-link">Unicode Blocks</NuxtLink>
      <NuxtLink to="/sunburst" class="nav-link">Emoji 旭日图</NuxtLink>
      <NuxtLink to="/space3d" class="nav-link">3D Unicode</NuxtLink>
      <NuxtLink to="/rain" class="nav-link">字符雨</NuxtLink>
      <NuxtLink to="/resources" class="nav-link">Resources</NuxtLink>
    </div>
    <ColorModeToggle />
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 16px;
  background: linear-gradient(89deg, #f8b58b3a, #3F66CA3a);
  width: auto;
}

.nav-links {
  display: flex;
  align-items: center;
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

@media (max-width: 800px) {
  .nav {
    flex-direction: column;
    gap: 12px;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    margin-right: 8px;
    font-size: 14px;
  }
}
</style>

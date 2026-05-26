<template>
  <div class="about-page">
    <div class="header">
      <h1>Discover Chinese Through Unicode</h1>
      <p>Learning Chinese as an English speaker can be challenging, but it can be made easier with Unicode, the powerful standard for text encoding.</p>
    </div>

    <div class="description-container">
      <div class="description">
        <h2>Why Unicode Matters?</h2>
        <ul>
          <li>📖 A universal character encoding standard</li>
          <li>🔍 20,000+ characters under CJK Unified Ideographs</li>
          <li>💻 Cross-platform compatibility</li>
          <li>🧠 No need to learn typing techniques</li>
          <li>☝ Even contains Emoji!</li>
        </ul>
      </div>

      <div class="description">
        <h2>Weaknesses of Traditional Learning Approach</h2>
        <ul>
          <li>⌨️ It is difficult to self-learn because you need to learn Pinyin or Wubi input method.</li>
          <li><strong>𠹌</strong> Dictionaries contain many characters that are not in common use</li>
          <li>💡 There is a relative lack of immersive tools or aids for learning</li>
        </ul>
      </div>

      <div class="description">
        <h2>How to Use Unicode for Chinese?</h2>
        <ul>
          <li>🔍 Search for characters by name or codepoint (U+XXXX)</li>
          <li>👁️ Browse through the Unicode blocks to find the character you are interested in</li>
          <li>☟ Try my Chinese generator with pinyin</li>
          <li style="list-style: none;"><NuxtLink to="/" style="font-size: 24px;">Jump to the generator</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 33px;
}

.header {
  margin-bottom: 36px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.header p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.description-container {
  display: flex;
  flex-direction: row;
  gap: 36px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.description {
  flex: 1 1 calc(50% - 18px);
  max-width: calc(50% - 18px);
  height: auto;
  min-width: 300px;
  max-height: 400px;
  padding: 15px;
  box-sizing: border-box;
  background: linear-gradient(-6deg, #e5419e11, #66738E11);
  border-radius: 20px;
}

.description h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.description li {
  font-size: 20px;
  margin-bottom: 8px;
}

@media (max-width: 800px) {
  .description-container {
    flex-direction: column;
    justify-content: flex-start;
  }

  .description {
    flex: none;
    width: 100%;
    min-width: unset;
    max-width: 100%;
  }

  .description h2 {
    font-size: 24px;
  }

  .description li {
    font-size: 14px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header p {
    font-size: 1rem;
  }
}

@media (max-width: 1020px) {
  .description h2 {
    font-size: 28px;
  }

  .description li {
    font-size: 17px;
  }
}
</style>

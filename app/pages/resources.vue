<template>
  <div class="resources-page">
    <div class="content">
      <p>
        This project utilizes the <code>emoji.csv</code> dataset from the GitHub repository
        <a href="https://github.com/datasets/emojis/tree/main">emojis</a>. The dataset is made available under the
        <strong>Public Domain Dedication and License (PDDL)</strong>.
      </p>
      <p>
        This project utilizes the <code>kMandarin_8105.txt</code> dataset from the GitHub repository
        <a href="https://github.com/mozillazg/pinyin-data">mozillazg/pinyin-data</a>. The dataset is made available
        under the terms of the
        <strong>MIT License</strong>.
      </p>
      <p>
        We all heavily rely on the Unicode Consortium for providing the Unicode character database
        (<a href="https://www.unicode.org/Public/UCD/latest/">UCD</a>).
      </p>
      <p>
        The Card flip related CSS code is developed based on the demo by Matthew Nance on
        <a href="https://codepen.io/mn8809/pen/OPmYxy">CodePen</a>.
      </p>

      <p>I want to express my gratitude to the three authors for providing valuable resources.</p>
    </div>
  </div>
</template>

<style scoped>
.resources-page {
  height: 89.9vh;
  max-width: 1600px;
  margin: 0 16px auto;
  padding: 20px;
}

.content {
  max-width: 800px;
  margin: 0 auto;
}

p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

code {
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Victor Mono", monospace;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  color: var(--primary-color);
}
</style>

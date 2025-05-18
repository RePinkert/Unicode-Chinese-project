## Unicode Chinese Project

### Project Overview

This project is an interactive Unicode character explorer. It provides a user-friendly interface to browse and search through various character sets and their code points.

### Project Main Content

| File                       | Description                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `blocks.html`              | Provides all character sets and their code points with a simple search functionality. |
| `generator.html`           | Offers two sets of Unicode character displays using a flip card style.                |
| `css/styles.css`           | CSS file for styling.                                                                 |
| `data/emojis.csv`          | Emoji dataset used in the project.                                                    |
| `data/kMandarin_8105.txt`  | Mandarin pinyin dataset used in the project.                                          |

### Data Source Acknowledgment

This project utilizes the `emojis.csv` dataset from the GitHub repository [emojis](https://github.com/datasets/emojis/tree/main). The dataset is made available under the **Public Domain Dedication and License (PDDL)**.

Additionally, this project utilizes the `kMandarin_8105.txt` dataset from the GitHub repository [mozillazg/pinyin-data](https://github.com/mozillazg/pinyin-data). The dataset is made available under the terms of the **MIT License**.

I am also grateful to the Unicode Consortium ([UCD](https://www.unicode.org/Public/UCD/latest/)) for providing the Unicode character database.

The card flip related CSS code is developed based on the demo by Matthew Nance on [CodePen](https://codepen.io/mn8809/pen/OPmYxy).
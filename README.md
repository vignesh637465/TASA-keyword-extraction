# Project 8: Keyword Extraction System

A beginner-friendly web application for automated **Keyword & Keyphrase Extraction** using Term Frequency (TF) analysis and Stop-Word Filtering. Built for the college subject **Text and Speech Analysis**.

---

## 📌 1. Title
**Keyword Extraction System**

## 📝 2. Description
The **Keyword Extraction System** scans long text documents or news articles, strips uninformative structural stop words (*"the"*, *"is"*, *"and"*), and extracts the most significant subject keywords. It provides Top 5 / Top 10 ranked keyword lists, a term frequency table with relative weights, and an interactive CSS word cloud.

## 🎯 3. Objectives
* Understand Information Extraction (IE) and Term Frequency (TF) scoring in NLP.
* Implement stop-word filtering algorithms.
* Visualize keyword density via dynamic word clouds.
* Present structured term weight tables for viva defense.

## ✨ 4. Features
* **Stop-Word Removal Filter:** Ignores common English stop words (*"the"*, *"is"*, *"are"*, *"with"*, *"for"*).
* **Top 5 & Top 10 Ranked Lists:** Displays top dominant keywords with occurrence counts.
* **Interactive CSS Word Cloud:** Renders word cloud badges with font sizes scaled proportionally to word frequency.
* **Term Frequency (TF) Table:** Displays word rank, frequency count, and importance percentage weight.
* **Sample Preset Article:** Includes a Machine Learning sample article for instant testing.
* **Clear Button:** One-click reset.

## 🛠️ 5. Technologies Used
* **HTML5:** Semantic tables, ordered lists, and layout cards.
* **CSS3:** Dark-theme styling, word cloud flexbox visualizer, and responsive tables.
* **JavaScript (ES6+):** RegEx tokenization, stop-word filtering, term frequency calculation, and dynamic HTML rendering.

## 🔬 6. How It Works
1. **Punctuation Stripping & Tokenization:** Text is converted to lower-case and split into individual word tokens.
2. **Stop-Word Exclusion:** Tokens matching common English stop words or numeric digits are filtered out.
3. **Stem Normalization:** Basic suffix stripping (e.g. converting plural forms back to singular stems).
4. **Term Frequency Ranking:** Calculates word occurrence counts and orders terms from highest to lowest frequency.

## 🧠 7. Algorithm & Logic Explanation (Viva Defense)
The application relies on **Term Frequency (TF) Feature Extraction**:

1. **Term Frequency Score:**
   $$\text{TF}(t, d) = \frac{\text{Count of term } t \text{ in document } d}{\text{Total valid terms in } d}$$
2. **Frequency Ranking Matrix:**
   $$\text{Ranked Keywords} = \text{Sort}(\{ (t, \text{Count}(t)) \mid t \notin \text{StopWords} \}, \text{Descending})$$
3. **Word Cloud Scale Formula:**
   $$\text{FontSize}(t) = 0.85\text{rem} + \left( \frac{\text{Count}(t)}{\max(\text{Count})} \right) \times 1.35\text{rem}$$

## 📥 8. Installation / Setup
No dependencies or build tools required.
1. Download or clone this folder:
   ```bash
   git clone <repository-url>
   cd 08-keyword-extraction-system
   ```

## 🚀 9. How to Run
Open `index.html` in any web browser.

* Double-click `index.html` or open via VS Code Live Server.

## 💡 10. Example Input & Output

### Input Text:
> *"Machine learning is a transformative branch of artificial intelligence... In data science, machine learning algorithms are used to make predictions..."*

### Output Results:
* **Top 5 Keywords:**
  1. `learning` (5 occurrences)
  2. `machine` (5 occurrences)
  3. `algorithm` (3 occurrences)
  4. `data` (3 occurrences)
  5. `artificial` (2 occurrences)
* **Word Cloud:** Renders `learning` and `machine` in large prominent fonts.

## 📁 11. Project Structure
```
08-keyword-extraction-system/
├── index.html        # HTML layout & table UI
├── style.css         # UI design & word cloud styles
├── script.js         # Term frequency & stop-word filtering algorithm
└── README.md         # Detailed project guide
```

## ⚠️ 12. Limitations
* Uses unigram (single-word) frequency scoring; does not extract multi-word phrases (collocations) like *"artificial intelligence"* as a single entity.
* Does not evaluate inverse document frequency (IDF) across a multi-document corpus.

## 🔮 13. Future Enhancements
* Implement RAKE (Rapid Automatic Keyword Extraction) for multi-word phrase extraction.
* Support full TF-IDF with custom reference corpus loading.
* Export keyword frequency table as CSV.

## 📷 14. Screenshots
*(Add project screenshots here when uploading to GitHub)*

```
+-----------------------------------------------------------+
|                 Keyword Extraction System                 |
| [Machine learning is a transformative branch...]          |
| Top 5: learning (5), machine (5), algorithm (3)...        |
| Cloud: [ LEARNING ] [ MACHINE ] [ DATA ] [ ALGORITHM ]    |
+-----------------------------------------------------------+
```

## 📜 15. License
This project is open-source under the [MIT License](LICENSE). Educational project for college coursework.

/**
 * 08 - KEYWORD EXTRACTION SYSTEM
 * Term Frequency (TF) & Stop-Word Filtered Extraction Engine
 */

// Stop-word list ignoring common structural words
const stopWords = new Set([
    "the", "is", "are", "and", "of", "to", "in", "a", "an", "for", "on", "with", "at", "by", "from",
    "up", "about", "into", "over", "after", "this", "that", "these", "those", "it", "its", "or",
    "as", "be", "been", "being", "have", "has", "had", "do", "does", "did", "but", "not", "no", "can",
    "will", "should", "would", "could", "all", "any", "which", "what", "who", "whom", "where", "when",
    "why", "how", "more", "most", "other", "some", "such", "only", "own", "same", "so", "than", "too",
    "very", "just", "also", "your", "my", "his", "her", "their", "our", "were", "was"
]);

// Sample Article for testing
const sampleMLArticle = `Machine learning is a transformative branch of artificial intelligence that focuses on building applications that learn from data and improve their accuracy over time without being explicitly programmed. In data science, machine learning algorithms are used to make predictions or decisions by finding hidden patterns in massive datasets.

Supervised machine learning algorithms train models on labeled datasets, enabling the algorithm to learn the relationship between input features and output targets. On the other hand, unsupervised machine learning algorithms discover natural groupings or clusters within unlabeled data. Deep learning, a specialized subset of machine learning using artificial neural networks, powers advanced technology such as autonomous vehicles, facial recognition, and natural language processing.`;

// DOM Elements
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const extractBtn = document.getElementById('extractBtn');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const resultsSection = document.getElementById('resultsSection');

// Result Output Elements
const top5List = document.getElementById('top5List');
const top10List = document.getElementById('top10List');
const wordCloud = document.getElementById('wordCloud');
const tableBody = document.getElementById('tableBody');

// Input Counter
textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words;
});

// Load Sample
sampleBtn.addEventListener('click', () => {
    textInput.value = sampleMLArticle;
    textInput.dispatchEvent(new Event('input'));
    extractKeywords();
});

// Action Buttons
extractBtn.addEventListener('click', extractKeywords);

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    resultsSection.classList.add('hidden');
});

/**
 * Keyword Extraction Engine
 */
function extractKeywords() {
    const text = textInput.value.trim();
    if (!text) {
        alert('Please enter or paste an article to extract keywords!');
        return;
    }

    // Step 1: Tokenize words & Clean punctuation
    const tokens = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);

    const totalValidWords = tokens.length;
    const wordFreq = {};

    // Step 2: Filter stop words & count term frequencies
    tokens.forEach(token => {
        // Simple stemming normalization (removing trailing 's')
        let stem = token;
        if (stem.length > 4 && stem.endsWith('s') && !stem.endsWith('ss')) {
            stem = stem.slice(0, -1);
        }

        if (stem.length > 2 && !stopWords.has(stem) && isNaN(stem)) {
            wordFreq[stem] = (wordFreq[stem] || 0) + 1;
        }
    });

    // Step 3: Sort terms by frequency descending
    const sortedKeywords = Object.keys(wordFreq).map(word => {
        const count = wordFreq[word];
        const tfScore = (count / totalValidWords).toFixed(4);
        return { word, count, tfScore };
    }).sort((a, b) => b.count - a.count);

    if (sortedKeywords.length === 0) {
        alert('No significant keywords found in the input text!');
        return;
    }

    // Render Top 5 & Top 10 Lists
    renderRankList(top5List, sortedKeywords.slice(0, 5));
    renderRankList(top10List, sortedKeywords.slice(0, 10));

    // Render Dynamic Word Cloud
    renderWordCloud(sortedKeywords.slice(0, 20));

    // Render Frequency Table
    renderTable(sortedKeywords.slice(0, 15));

    resultsSection.classList.remove('hidden');
}

/**
 * Helper to render Top N Rank List
 */
function renderRankList(container, keywordsArray) {
    container.innerHTML = '';
    keywordsArray.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.word} <span class="rank-count">(${item.count} occurrences)</span>`;
        container.appendChild(li);
    });
}

/**
 * Helper to render CSS Word Cloud
 */
function renderWordCloud(keywordsArray) {
    wordCloud.innerHTML = '';
    if (keywordsArray.length === 0) return;

    const maxCount = keywordsArray[0].count;
    const colors = ['#f472b6', '#38bdf8', '#34d399', '#fbbf24', '#c084fc', '#a7f3d0'];

    keywordsArray.forEach((item, idx) => {
        const span = document.createElement('span');
        span.className = 'cloud-tag';
        span.textContent = item.word;

        // Dynamic font size between 0.85rem and 2.2rem
        const fontSize = 0.85 + (item.count / maxCount) * 1.35;
        span.style.fontSize = `${fontSize.toFixed(2)}rem`;
        span.style.color = colors[idx % colors.length];
        span.title = `Frequency: ${item.count}`;

        wordCloud.appendChild(span);
    });
}

/**
 * Helper to render Frequency Table
 */
function renderTable(keywordsArray) {
    tableBody.innerHTML = '';
    keywordsArray.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${index + 1}</td>
            <td><strong>${item.word}</strong></td>
            <td>${item.count}</td>
            <td>${(item.tfScore * 100).toFixed(2)}%</td>
        `;
        tableBody.appendChild(tr);
    });
}

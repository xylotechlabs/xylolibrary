async function loadEbooks() {
  const response = await fetch('ebooks.json');
  return await response.json();
}

function displayResults(ebooks) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (ebooks.length === 0) {
    results.innerHTML = '<p style="color:white;">No results found !</p>';
    return;
  }

  ebooks.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.description}</p>
      <a href="${book.pdf}" target="_blank" class="btn">Read</a>
      <a href="${book.pdf}" download class="btn">Download PDF</a>
    `;
    results.appendChild(div);
  });
}

async function setupSearch() {
  const ebooks = await loadEbooks();
  const searchInput = document.getElementById('search');

  const render = () => {
    const query = searchInput.value.toLowerCase();
    const filtered = ebooks.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.author.toLowerCase().includes(query)
    );
    displayResults(filtered);
  };

  searchInput.addEventListener('input', render);
  render();
}

setupSearch();

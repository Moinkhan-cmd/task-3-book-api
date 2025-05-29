const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json({ message: 'Book added', book: newBook });
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = req.body;
    res.json({ message: 'Book updated', book: books[index] });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

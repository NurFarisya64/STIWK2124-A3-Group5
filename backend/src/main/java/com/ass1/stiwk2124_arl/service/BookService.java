package com.ass1.stiwk2124_arl.service;

import com.ass1.stiwk2124_arl.model.Book;
import com.ass1.stiwk2124_arl.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
      private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Book saveBook(Book book) {
        return repo.save(book);
    }

     // READ ALL (for pagination)
    public Page<Book> getAllBooks(Pageable pageable) {
        return repo.findAll(pageable);
    }

    // SEARCH
    public List<Book> searchBooks(String keyword) {
        return repo.searchBooks(keyword);
    }

    // GET BY ID
    public Optional<Book> getBookById(Long id) {
        return repo.findById(id);
    }

    // UPDATE
    public Book updateBook(Long id, Book newBook) {
        return repo.findById(id).map(book -> {
            book.setTitle(newBook.getTitle());
            book.setAuthor(newBook.getAuthor());
            book.setCategory(newBook.getCategory());
            book.setDescription(newBook.getDescription());
            return repo.save(book);
        }).orElse(null);
    }

    // DELETE
    public void deleteBook(Long id) {
        repo.deleteById(id);
    }
}

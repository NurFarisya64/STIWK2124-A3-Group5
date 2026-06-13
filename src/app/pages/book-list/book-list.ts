import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {

  books: any[] = [];
  filteredBooks: any[] = [];
  searchText: string = '';

  // Pagination configurations
  currentPage = 1;
  pageSize = 5;

  loading = false;
  errorMessage = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.errorMessage = '';

    this.bookService.getAll().subscribe({
      next: (data: any) => {
        this.books = data;
        this.filteredBooks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load books. Please try again.';
        this.loading = false;
      }
    });
  }

  search() {
    this.currentPage = 1; // Reset to page 1 during filter operations
    if (!this.searchText) {
      this.filteredBooks = this.books;
      return;
    }

    this.filteredBooks = this.books.filter(book =>
      book.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      book.author?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      book.category?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteBook(id: number) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.delete(id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.errorMessage = 'Authentication failed. You are not authorised to delete books.';
        } else if (err.status === 404) {
          this.errorMessage = 'Book not found. It may have already been deleted.';
        } else {
          this.errorMessage = 'Could not delete book. Please try again later.';
        }
      }
    });
  }

  get paginatedBooks() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBooks.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredBooks.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Updated accessibility feature using Web Speech API
  speakList() {
    if (this.filteredBooks.length === 0) {
      const emptySpeech = new SpeechSynthesisUtterance("Your reading list is currently empty.");
      window.speechSynthesis.speak(emptySpeech);
      return;
    }

    const text = this.filteredBooks
      .map(b => `Title: ${b.title}, written by ${b.author}. Category: ${b.category}. Description: ${b.description || 'No description provided.'}`)
      .join('. ');

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1.0; // Normal layout speech velocity
    
    // Stop any ongoing speech before starting a fresh track
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }
}
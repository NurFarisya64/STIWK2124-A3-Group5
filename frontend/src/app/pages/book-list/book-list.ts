import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList implements OnInit {

  books: any[] = [];
  filteredBooks: any[] = [];
  searchText: string = '';

  currentPage = 1;
  pageSize = 5;

  loading = false;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

loadBooks() {
    this.loading = true;
    this.errorMessage = '';
    
    this.bookService.getAll().subscribe({
      next: (response: any) => {
        let rawData = [];
        if (response && Array.isArray(response.content)) {
          rawData = response.content;
        } else if (Array.isArray(response)) {
          rawData = response;
        } else if (response && Array.isArray(response.data)) {
          rawData = response.data;
        }

        // Petakkan data ke dalam format HTML
        this.books = rawData.map((b: any) => {
          return {
            id: b.id ?? b.bookId ?? b.book_id ?? 0,
            title: b.title ?? b.bookTitle ?? 'No Title',
            author: b.author ?? b.bookAuthor ?? 'Unknown',
            category: b.category ?? b.bookCategory ?? 'General',
            description: b.description ?? b.bookDescription ?? '-'
          };
        });

        this.search(); 
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = 'Failed to load book list.';
        console.error(err);
      }
    });
  }

  search() {
    this.currentPage = 1;
    if (!Array.isArray(this.books)) {
      this.filteredBooks = [];
      return;
    }
    if (!this.searchText) {
      this.filteredBooks = [...this.books];
      return;
    }
    this.filteredBooks = this.books.filter(book =>
      book.title?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      book.author?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      book.category?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteBook(id: number) {
    if (!id || id === 0) {
      alert('Undefined. Id book not found.');
      return;
    }
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.bookService.delete(id).subscribe({
      next: () => this.loadBooks(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Error deleting book';
        console.error(err);
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

  speakList() {
    if (this.filteredBooks.length === 0) return;
    const text = this.filteredBooks.map(b => `${b.title} by ${b.author}`).join('. ');
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loggedIn');
    }
    this.router.navigate(['/']);
  }
}
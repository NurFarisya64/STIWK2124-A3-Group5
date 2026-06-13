import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {

  bookForm!: FormGroup;
  bookId: number | null = null;
  isEditMode = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.bookId) {
      this.isEditMode = true;
      this.loadBook(this.bookId);
    }
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    switch (err.status) {
      case 400: return 'Invalid input. Please check your data and try again.';
      case 401: return 'Authentication failed. You are not authorised to perform this action.';
      case 404: return 'Book not found. It may have been deleted.';
      default:  return 'An unexpected error occurred. Please try again later.';
    }
  }

  loadBook(id: number) {
    this.bookService.getById(id).subscribe({
      next: (data) => {
        this.bookForm.patchValue(data);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(err);
      }
    });
  }

  submit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const data = this.bookForm.value;
    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.bookId) {
      this.bookService.update(this.bookId, data).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/books']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = this.getErrorMessage(err);
        }
      });
    } else {
      this.bookService.create(data).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/books']);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = this.getErrorMessage(err);
        }
      });
    }
  }
}
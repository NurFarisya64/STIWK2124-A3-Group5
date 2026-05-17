import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Updated to match backend columns: title, author, category, description
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

  loadBook(id: number) {
    this.bookService.getById(id).subscribe({
      next: (data) => {
        this.bookForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error loading book', err);
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

    if (this.isEditMode && this.bookId) {
      this.bookService.update(this.bookId, data).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Update failed', err);
          this.loading = false;
        }
      });
    } else {
      this.bookService.create(data).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Create failed', err);
          this.loading = false;
        }
      });
    }
  }
}
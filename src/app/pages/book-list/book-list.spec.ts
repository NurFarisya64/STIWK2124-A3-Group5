import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookList } from './book-list';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  imports: [BookList],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: () => null
          }
        }
      }
    }
  ]
}).compileComponents();

    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

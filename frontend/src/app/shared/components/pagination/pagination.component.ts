import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination-container" *ngIf="totalItems > 0">
      <div class="page-size-selector">
        <label>Lignes par page:</label>
        <select [(ngModel)]="pageSize" (change)="onPageSizeChange()">
          <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
        </select>
      </div>

      <div class="pagination-info">
        Affichage {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalItems }}
      </div>

      <div class="pagination-controls">
        <button [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)" class="btn-page-nav" title="Précédent">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="pages-list">
          <button *ngFor="let page of pages" 
                  [class.active]="currentPage === page" 
                  [class.ellipsis]="page === '...'"
                  [disabled]="page === '...'"
                  (click)="goToPage(page)"
                  class="btn-page">
            {{ page }}
          </button>
        </div>

        <button [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)" class="btn-page-nav" title="Suivant">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: white;
      border-top: 1px solid #e2e8f0;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      font-size: 0.85rem;
      color: #475569;
      flex-wrap: wrap;
      gap: 10px;
    }

    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .page-size-selector select {
      padding: 6px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      outline: none;
      background: white;
      color: #334155;
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
    }

    .page-size-selector select:focus {
      border-color: #0ea5e9;
      box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
    }

    .pagination-info {
      font-weight: 500;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-page-nav, .btn-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 8px;
      border: 1px solid #cbd5e1;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      color: #475569;
      font-size: 0.85rem;
      transition: all 0.2s;
      font-family: inherit;
      font-weight: 500;
    }

    .btn-page-nav:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background: #f8fafc;
    }

    .btn-page-nav:not(:disabled):hover, .btn-page:not(:disabled):hover {
      background: #f1f5f9;
      border-color: #94a3b8;
    }

    .btn-page.active {
      background: var(--primary-color, #004a99);
      color: white;
      border-color: var(--primary-color, #004a99);
    }

    .btn-page.ellipsis {
      border: none;
      background: transparent;
      cursor: default;
    }

    .pages-list {
      display: flex;
      gap: 4px;
    }

    @media (max-width: 768px) {
      .pagination-container {
        flex-direction: column;
        justify-content: center;
      }
      .pagination-info {
        order: -1;
        margin-bottom: 5px;
      }
    }
  `]
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  
  @Output() pageChanged = new EventEmitter<{page: number, pageSize: number}>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  get pages(): (number | string)[] {
    const total = this.totalPages;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    if (this.currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    
    if (this.currentPage >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    
    return [1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', total];
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.emitChange();
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.emitChange();
    }
  }

  private emitChange() {
    this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });
  }
}

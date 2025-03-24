import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../services/services/crud.service';
import { Item } from '../classes/item';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, AfterViewInit {
  constructor(
    public crudService: CrudService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Items are automatically loaded by the CRUD service constructor
  }

  ngAfterViewInit(): void {
    // Initialize modals after view is ready
    this.ngZone.runOutsideAngular(() => {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        this.ngZone.run(() => {
          this.crudService.initializeModals();
        });
      }, 0);
    });
  }

  openModal(): void {
    this.crudService.openModal();
  }

  closeModal(): void {
    this.crudService.closeModal();
  }

  saveItem(): void {
    this.crudService.saveItem();
  }

  updateItem(): void {
    this.crudService.updateItem();
  }

  deleteItem(item: Item): void {
    this.crudService.deleteItem(item);
  }

  onEdit(item: Item): void {
    this.crudService.onEdit(item);
  }
}
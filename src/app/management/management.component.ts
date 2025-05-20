import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../services/services/crud.service';
import { Quest } from '../classes/quest';

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

  saveQuest(): void {
    this.crudService.saveQuest();
  }

  updateQuest(): void {
    this.crudService.updateQuest();
  }

  deleteQuest(quest: Quest): void {
    this.crudService.deleteQuest(quest);
  }

  onEdit(quest: Quest): void {
    this.crudService.onEdit(quest);
  }
}
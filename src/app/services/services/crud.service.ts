import { Injectable } from '@angular/core';
import { InMemoryDbService } from '../in-memory-db.service';
import { Quest } from '../../classes/quest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  questList: Quest[] = [];
  questObj: Quest = new Quest();
  questToDelete: Quest | null = null;

  // Bootstrap modals
  formModal: any;
  deleteModal: any;

  constructor(private dbService: InMemoryDbService) {
    this.loadQuests();
  }

  private loadQuests(): void {
    this.dbService.getQuests().subscribe(quests => {
      this.questList = quests;
    });
  }

  saveQuest(): void {
    console.log('Saving quest:', this.questObj);
    if (this.questObj.id) {
      // Update existing quest
      this.dbService.updateQuest(this.questObj.id, {
        name: this.questObj.name,
        description: this.questObj.description,
        reward: this.questObj.reward
      });
    } else {
      // Add new quest
      this.dbService.addQuest({
        name: this.questObj.name,
        description: this.questObj.description,
        reward: this.questObj.reward
      });
    }
    
    this.resetForm();
    this.closeModal();
  }

  deleteQuest(quest: Quest): void {
    console.log('Deleting quest:', quest);
    this.openDeleteModal(quest);
  }

  confirmDelete(): void {
    if (this.questToDelete) {
      this.dbService.deleteQuest(this.questToDelete.id);
      this.closeDeleteModal();
      this.questToDelete = null;
    }
  }

  updateQuest(): void {
    console.log('Updating quest:', this.questObj);
    if (this.questObj.id) {
      this.dbService.updateQuest(this.questObj.id, {
        name: this.questObj.name,
        description: this.questObj.description,
        reward: this.questObj.reward
      });
      this.resetForm();
      this.closeModal();
    }
  }

  onEdit(quest: Quest): void {
    this.questObj = new Quest(quest);
    this.openModal();
  }

  resetForm(): void {
    this.questObj = new Quest();
  }

  /**
   * Modal Management
   */
  initializeModals(): void {
    // Get modal elements
    const formModalEl = document.getElementById('formModal');
    const deleteModalEl = document.getElementById('deleteModal');

    if (formModalEl && deleteModalEl) {
      // @ts-ignore
      this.formModal = new bootstrap.Modal(formModalEl);
      // @ts-ignore
      this.deleteModal = new bootstrap.Modal(deleteModalEl);
    }
  }

  openModal(): void {
    if (!this.formModal) {
      this.initializeModals();
    }
    this.formModal?.show();
  }

  closeModal(): void {
    this.formModal?.hide();
    this.resetForm();
  }

  openDeleteModal(quest: Quest): void {
    console.log('Opening delete modal for quest:', quest);
    if (!this.deleteModal) {
      this.initializeModals();
    }
    this.questToDelete = quest;
    this.deleteModal?.show();
  }

  closeDeleteModal(): void {
    this.deleteModal?.hide();
    this.questToDelete = null;
  }
}

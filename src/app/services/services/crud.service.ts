import { Injectable } from '@angular/core';
import { InMemoryDbService, Quest } from '../in-memory-db.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  questList: Quest[] = [];
  questObj: Quest = {
    id: '',
    name: '',
    description: '',
    reward: 0
  };  
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
    this.questObj = {...quest};
    this.openModal();
  }

  resetForm(): void {
    this.questObj = {
      id: '',
      name: '',
      description: '',
      reward: 0
    };
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

  /**
   * Alustaa modaalit
   * Tarkistaa Bootstrap-kirjaston saatavuuden
   * Siivoaa vanhat modaalit muistivuotojen estämiseksi
   * Hakee modaalielementit DOM:sta
   * Luo uudet modaali-instanssit turvallisilla asetuksilla
   * @returns void
   */
  initializeModals(): void {
    try {
      if (typeof window === 'undefined' || !(window as any).bootstrap) {
        console.error('Bootstrap is not loaded');
        return;
      }

      this.formModal?.dispose();
      this.deleteModal?.dispose();

      const formElement = document.getElementById('myModal');
      const deleteElement = document.getElementById('deleteModal');

      if (!formElement || !deleteElement) {
        console.error('Modal elements not found');
        return;
      }

      this.formModal = new (window as any).bootstrap.Modal(formElement, {
        keyboard: true,
        backdrop: 'static'
      });

      this.deleteModal = new (window as any).bootstrap.Modal(deleteElement, {
        keyboard: true,
        backdrop: 'static'
      });
    } catch (error) {
      console.error('Error initializing modals:', error);
    }
  }
}

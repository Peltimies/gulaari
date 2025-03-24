import { Injectable } from '@angular/core';
import { InMemoryDbService, Item } from '../in-memory-db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemList: Item[] = [];
  itemObj: Item = {
    id: '',
    name: '',
    description: '',
    price: 0
  };
  itemToDelete: Item | null = null;

  // Bootstrap modals
  formModal: any;
  deleteModal: any;

  constructor(private dbService: InMemoryDbService) {
    this.loadItems();
  }

  private loadItems(): void {
    this.dbService.getItems().subscribe(items => {
      this.itemList = items;
    });
  }

  saveItem(): void {
    console.log('Saving item:', this.itemObj);
    if (this.itemObj.id) {
      // Update existing item
      this.dbService.updateItem(this.itemObj.id, {
        name: this.itemObj.name,
        description: this.itemObj.description,
        price: this.itemObj.price
      });
    } else {
      // Add new item
      this.dbService.addItem({
        name: this.itemObj.name,
        description: this.itemObj.description,
        price: this.itemObj.price
      });
    }
    
    this.resetForm();
    this.closeModal();
  }

  deleteItem(item: Item): void {
    console.log('Deleting item:', item);
    this.openDeleteModal(item);
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      this.dbService.deleteItem(this.itemToDelete.id);
      this.closeDeleteModal();
      this.itemToDelete = null;
    }
  }

  updateItem(): void {
    console.log('Updating item:', this.itemObj);
    if (this.itemObj.id) {
      this.dbService.updateItem(this.itemObj.id, {
        name: this.itemObj.name,
        description: this.itemObj.description,
        price: this.itemObj.price
      });
      this.resetForm();
      this.closeModal();
    }
  }

  onEdit(item: Item): void {
    this.itemObj = {...item};
    this.openModal();
  }

  resetForm(): void {
    this.itemObj = {
      id: '',
      name: '',
      description: '',
      price: 0
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

  openDeleteModal(item: Item): void {
    console.log('Opening delete modal for item:', item);
    if (!this.deleteModal) {
      this.initializeModals();
    }
    this.itemToDelete = item;
    this.deleteModal?.show();
  }

  closeDeleteModal(): void {
    this.deleteModal?.hide();
    this.itemToDelete = null;
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

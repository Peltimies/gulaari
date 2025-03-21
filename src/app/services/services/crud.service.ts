import { Injectable } from '@angular/core';
import { Item } from '../../classes/item';

interface Modal {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemObj: Item = new Item();
  itemList: Item[] = [];
  itemToDelete: Item | null = null;
  private formModal: Modal | null = null;
  private deleteModal: Modal | null = null;

  constructor() {
    this.loadItems();
  }

  initializeModals(): void {
    try {
      if (typeof window === 'undefined' || !(window as any).bootstrap) {
        console.error('Bootstrap is not loaded');
        return;
      }

      // Clean up existing modals
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

  loadItems(): void {
    const localData = localStorage.getItem('items');
    if (localData != null) {
      this.itemList = JSON.parse(localData);
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
    this.itemObj = new Item();
  }

  openDeleteModal(item: Item): void {
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

  saveItem(): void {
    const isLocalPresent = localStorage.getItem('items');
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.itemObj.id = this.getNextId(oldArr);
      oldArr.push(this.itemObj);
      localStorage.setItem('items', JSON.stringify(oldArr));
    } else {
      const newArr = [];
      this.itemObj.id = 1;
      newArr.push(this.itemObj);
      localStorage.setItem('items', JSON.stringify(newArr));
    }
    this.loadItems();
    this.closeModal();
  }

  deleteItem(item: Item): void {
    this.openDeleteModal(item);
  }

  confirmDelete(): void {
    if (this.itemToDelete) {
      const currentRecord = this.itemList.findIndex(i => i.id === this.itemToDelete!.id);
      this.itemList.splice(currentRecord, 1);
      localStorage.setItem('items', JSON.stringify(this.itemList));
      this.closeDeleteModal();
    }
  }

  onEdit(item: Item): void {
    this.itemObj = {...item}; // Create a copy to prevent direct reference
    this.openModal();
  }

  updateItem(): void {
    const currentRecord = this.itemList.find(item => item.id === this.itemObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.itemObj.name;
      currentRecord.description = this.itemObj.description;
      currentRecord.price = this.itemObj.price;
      localStorage.setItem('items', JSON.stringify(this.itemList));
      this.closeModal();
    }
  }

  private getNextId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}

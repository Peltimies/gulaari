import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../classes/item';
import { firstValueFrom } from 'rxjs';

// Modaali-rajapinta määrittelee Bootstrap-modaalin metodit
interface Modal {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

 /** 1. Palvelun Määrittely
  * Tämä määrittelee palvelun toimintoja
  * itemObj: On Item-tyyppinen olio, joka alustetaan tyhjäksi. Tänne tulee käsiteltävä kohde (uusi tai muokattava).
  * itemList: kaikki kohteet
  * itemToDelete: poistettava kohde
  * Kaksi modaalia: lomake ja poistovahvistus
  * @returns void
  */
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemObj: Item = new Item(); // Käsiteltävä kohde (uusi tai muokattava)
  itemList: Item[] = []; // Kaikki kohteet
  itemToDelete: Item | null = null; // Poistettava kohde
  private formModal: Modal | null = null; // Lomakemodaali
  private deleteModal: Modal | null = null; // Poistomodaali

  constructor(private http: HttpClient) {
    this.loadItems();
  }

  /** 2. Tietojen lataus
   * Lataa kohteet ensisijaisesti localStoragesta
   * Jos localStoragessa ei ole dataa, lataa oletustiedot JSON-tiedostosta
   * @returns Promise<void>
   */
  async loadItems(): Promise<void> {
    const localData = localStorage.getItem('items');
    
    if (localData) {
      this.itemList = JSON.parse(localData);
    } else {
      try {
        // Lataa oletustiedot JSON-tiedostosta
        const response = await firstValueFrom(
          this.http.get<{items: Item[]}>('assets/default-items.json')
        );
        this.itemList = response.items;
        // Tallenna oletustiedot localStorageen
        localStorage.setItem('items', JSON.stringify(this.itemList));
      } catch (error) {
        console.error('Error loading default items:', error);
        this.itemList = [];
      }
    }
  }

  /** 3. Tietojen tallennus
   * Tallentaa tiedot localStorageen
   * @returns void
   */
  private saveToLocalStorage(): void {
    localStorage.setItem('items', JSON.stringify(this.itemList));
  }

  saveItem(): void {
    const isLocalPresent = localStorage.getItem('items');
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.itemObj.id = this.getNextId(oldArr);
      oldArr.push(this.itemObj);
      this.saveToLocalStorage();
    } else {
      const newArr = [];
      this.itemObj.id = 1;
      newArr.push(this.itemObj);
      this.saveToLocalStorage();
    }
    this.loadItems();
    this.closeModal();
  }

  deleteItem(item: Item): void {
    this.openDeleteModal(item);
  }

  onEdit(item: Item): void {
    this.itemObj = {...item}; 
    this.openModal();
  }

  updateItem(): void {
    const currentRecord = this.itemList.find(item => item.id === this.itemObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.itemObj.name;
      currentRecord.description = this.itemObj.description;
      currentRecord.price = this.itemObj.price;
      this.saveToLocalStorage();
      this.closeModal();
    }
  }

  /** 4. Modaalinhallinta
   * openModal: Avaa lomakemodalin
   * closeModal: Sulkee lomakemodalin
   * openDeleteModal: Avaa poistomodalin
   * closeDeleteModal: Sulkee poistomodalin
   * @returns void
   */
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

  /** 5. Poiston vahvistus
   * confirmDelete: Vahvistaa poistamisen
   * @returns void
   */
  confirmDelete(): void {
    if (this.itemToDelete) {
      const currentRecord = this.itemList.findIndex(i => i.id === this.itemToDelete!.id);
      this.itemList.splice(currentRecord, 1);
      this.saveToLocalStorage();
      this.closeDeleteModal();
    }
  }

  /** 6. Tietojen nollaus
   * Palauttaa oletustiedot JSON-tiedostosta
   * @returns Promise<void>
   */
  async resetToDefaults(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<{items: Item[]}>('assets/default-items.json')
      );
      this.itemList = response.items;
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error resetting to defaults:', error);
    }
  }

  /** 2. Modaalien alustus
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

      // Vanhojen modaalien siivous
      this.formModal?.dispose(); 
      this.deleteModal?.dispose(); 

      const formElement = document.getElementById('myModal'); 
      const deleteElement = document.getElementById('deleteModal'); 

      if (!formElement || !deleteElement) {
        console.error('Modal elements not found'); 
        return;
      }

      // Uusien modaalien alustus
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

  /** 6. Yleiset toiminnot
   * getNextId: Generoi uuden ID:n
   * @returns number
   */
  private getNextId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}

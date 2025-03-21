import { Injectable } from '@angular/core';
import { Item } from '../../classes/item';

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

  constructor() {
    this.loadItems();
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
      if (typeof window === 'undefined' || !(window as any).bootstrap) { // Tarkistaa, että Bootstrap on ladattu
        console.error('Bootstrap is not loaded');
        return;
      }

      // Vanhojen modaalien siivous
      // Tämä tekee sen, että vanha modaali ei jää käyttöliittymään kummittelemaan  
      this.formModal?.dispose(); // Jos formModal (hallinnoi lisäystä/muokkausta) on null, eli ei olemassa = dispose()-metodia ei kutsuta.
      this.deleteModal?.dispose(); // Jos deleteModal (hallinnoi poistoa) on null, eli ei olemassa = dispose()-metodia ei kutsuta.

      const formElement = document.getElementById('myModal'); // Hakee lomakemodalin elementin
      const deleteElement = document.getElementById('deleteModal'); // Hakee poistomodalin elementin

      if (!formElement || !deleteElement) {
        console.error('Modal elements not found'); // Tarkistaa, että modaalielementit löytyvät
        return;
      }

      // Uusien modaalien alustus
      this.formModal = new (window as any).bootstrap.Modal(formElement, { // Luo uuden lomakemodalin-instanssin
        keyboard: true,
        backdrop: 'static'
      });

      this.deleteModal = new (window as any).bootstrap.Modal(deleteElement, { // Luo uuden poistomodalin-instanssin
        keyboard: true,
        backdrop: 'static'
      });
    } catch (error) {
      console.error('Error initializing modals:', error); // Tarkistaa, että modaalit alustuvat
    }
  }

  /** 3. CRUD-operaatiot
   * loadItems: Lataa kohteet localStoragesta
   * saveItem: Tallentaa uuden kohteen, generoi ID:n
   * updateItem: Päivittää olemassa olevan kohteen
   * deleteItem: Poistaa kohteen localStoragestä
   * onEdit: Avaa muokkausmodalin
   * updateItem: Päivittää olemassa olevan kohteen
   * @returns void
   */
  loadItems(): void {
    const localData = localStorage.getItem('items');
    if (localData != null) {
      this.itemList = JSON.parse(localData);
    }
  }

  saveItem(): void {
    const isLocalPresent = localStorage.getItem('items'); // Tarkistaa, että localStorage on olemassa
    if (isLocalPresent != null) { // Jos localStorage on olemassa, tallentaa uuden kohteen
      const oldArr = JSON.parse(isLocalPresent); // oldArr, eli taulukko joka sisältää vanhat kohteet
      this.itemObj.id = this.getNextId(oldArr); // Generoi uuden ID:n
      oldArr.push(this.itemObj); // oldArr lisätään itemObj, joka on uusi kohde
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

  onEdit(item: Item): void {
    this.itemObj = {...item}; // Create a copy to prevent direct reference
    this.openModal();
  }

  updateItem(): void {
    const currentRecord = this.itemList.find(item => item.id === this.itemObj.id); // Etsii olemassa olevan kohden ID:llä
    if (currentRecord != undefined) {
      currentRecord.name = this.itemObj.name;
      currentRecord.description = this.itemObj.description;
      currentRecord.price = this.itemObj.price;
      localStorage.setItem('items', JSON.stringify(this.itemList));
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

  /** 5. Modaalinhallinta
   * confirmDelete: Vahvistaa poistamisen
   * @returns void
   */
  confirmDelete(): void {
    if (this.itemToDelete) {
      const currentRecord = this.itemList.findIndex(i => i.id === this.itemToDelete!.id);
      this.itemList.splice(currentRecord, 1);
      localStorage.setItem('items', JSON.stringify(this.itemList));
      this.closeDeleteModal();
    }
  }

  /** 6. Yleisemmat toiminnot
   * getNextId: Generoi uuden ID:n
   * @returns number
   */
  private getNextId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}

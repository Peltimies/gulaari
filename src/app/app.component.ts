import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from './classes/item';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  itemObj: Item = new Item();
  itemList: Item[] = [];


  openModal() {
   
    const modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'block';
    }
  }

  ngOnInit(): void {
    const isLocalPresent = localStorage.getItem('items');
    if(isLocalPresent != null) {
      this.itemList = JSON.parse(isLocalPresent);
    }
  }

  closeModal() {
    this.itemObj = new Item();
    const modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none';
    }
  }

  saveItem() {

    const isLocalPresent = localStorage.getItem('items');
    if(isLocalPresent != null) {
      
      const oldArr = JSON.parse(isLocalPresent);
      this.itemObj.id = this.itemList.length + 1;
      oldArr.push(this.itemObj);
      this.itemList = oldArr;
      localStorage.setItem('items', JSON.stringify(oldArr));
    } else {
      const newArr = [];
      newArr.push(this.itemObj);
      this.itemList = newArr;
      localStorage.setItem('items', JSON.stringify(newArr));
    }
    this.closeModal();
  }

  deleteItem(item: Item) {
    const isDeleted = confirm('Are you sure you want to delete this item?');
    if (isDeleted) {
      const currentRecord = this.itemList.findIndex(item => item.id === this.itemObj.id);
      this.itemList.splice(currentRecord, 1);
      localStorage.setItem('items', JSON.stringify(this.itemList));
    }
  }

  onEdit(item: Item) {
    this.itemObj = item;
    this.openModal(); 
  }

  updateItem() {
    const currentRecord = this.itemList.find(item => item.id === this.itemObj.id);
    if(currentRecord != undefined) {
      currentRecord.name = this.itemObj.name;
      currentRecord.description = this.itemObj.description;
      currentRecord.price = this.itemObj.price;
    }
    // Muistetaan tallentaa myös localstorageen tämä muutos
    localStorage.setItem('items', JSON.stringify(this.itemList));
    this.closeModal();
  }
}
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from './classes/item';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  itemObj: Item = new Item(0, '', '', 0);
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
    const modal = document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none';
    }
  }

  saveItem() {
    debugger;
    const isLocalPresent = localStorage.getItem('items');
    if(isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      oldArr.push(this.itemObj);
      localStorage.setItem('items', JSON.stringify(oldArr));
    } else {
      const newArr = [];
      newArr.push(this.itemObj);
      localStorage.setItem('items', JSON.stringify(newArr));
    }
    this.closeModal();
  }
}
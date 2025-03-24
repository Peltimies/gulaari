import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDbService {
  private items: Item[] = [];
  private itemsSubject = new BehaviorSubject<Item[]>([]);

  constructor() {
    // Initialize with some sample data
    this.items = [
      {
        id: '1',
        name: 'Potion of Healing',
        description: 'Restores 2d4+2 hit points to the drinker',
        price: 50
      },
      {
        id: '2',
        name: 'Ring of Protection',
        description: '+1 to AC and saving throws',
        price: 3500
      }
    ];
    this.itemsSubject.next(this.items);
  }

  // Get all items as an observable
  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  // Get a single item by ID
  getItem(id: string): Observable<Item | undefined> {
    return this.itemsSubject.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  // Add a new item
  addItem(item: Omit<Item, 'id'>): void {
    const newItem = {
      ...item,
      id: this.generateId()
    };
    this.items = [...this.items, newItem];
    this.itemsSubject.next(this.items);
  }

  // Update an existing item
  updateItem(id: string, updates: Partial<Omit<Item, 'id'>>): void {
    this.items = this.items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    this.itemsSubject.next(this.items);
  }

  // Delete an item
  deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }

  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all items (useful for testing)
  clearAll(): void {
    this.items = [];
    this.itemsSubject.next(this.items);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quest } from '../classes/quest';

export interface Item {
  id: string;
  name: string;
  description: string;
  reward: number;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDbService {
  private readonly STORAGE_KEY = 'quests';
  private quests: Quest[] = [];
  private questsSubject = new BehaviorSubject<Quest[]>([]);

  constructor() {
    this.loadFromStorage();   
  }

  private loadFromStorage(): void {
    const storedQuests = localStorage.getItem(this.STORAGE_KEY);
    if (storedQuests) {
      this.quests = JSON.parse(storedQuests);
    } else {
      // Initialize with sample data only if storage is empty
      this.quests = [
        {
          id: '1',
          name: 'Potion of Healing',
          description: 'Restores 2d4+2 hit points to the drinker',
          reward: 50
        },
        {
          id: '2',
          name: 'Ring of Protection',
          description: '+1 to AC and saving throws',
          reward: 3500
        }
      ];
      this.saveToStorage();
    }
    this.questsSubject.next(this.quests);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.quests));
  }

  // Get all quests as an observable
  getQuests(): Observable<Quest[]> {
    return this.questsSubject.asObservable();
  }

  // Get a single quest by ID
  getQuest(id: string): Observable<Quest | undefined> {
    return this.questsSubject.pipe(
      map(quests => quests.find(quest => quest.id === id))
    );
  }

  // Add a new quest
  addQuest(quest: Omit<Quest, 'id'>): void {
    const newQuest = {
      ...quest,
      id: this.generateId()
    };
    this.quests = [...this.quests, newQuest];
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  // Update an existing quest
  updateQuest(id: string, updates: Partial<Omit<Quest, 'id'>>): void {
    this.quests = this.quests.map(quest => 
      quest.id === id ? { ...quest, ...updates } : quest
    );
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  // Delete an item
  deleteQuest(id: string): void {
    this.quests = this.quests.filter(quest => quest.id !== id);
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all quests (useful for testing)
  clearAll(): void {
    this.quests = [];
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }
}
export { Quest };


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quest } from '../classes/quest';

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
      const parsedQuests = JSON.parse(storedQuests);
      this.quests = parsedQuests.map((q: any) => new Quest(q));
    } else {
      // Initialize with sample data only if storage is empty
      this.quests = [
        new Quest({
          id: '1',
          name: 'Green Dragon Menace',
          description: 'Villagers speak of an ancient wyrm, scales like emerald, that hath taken roost in the Forgotten Barrows. Tales tell of its hoard, gleaming with treasures of old, hidden deep within the sacred tomb.',
          reward: 5000
        }),
        new Quest({
          id: '2',
          name: 'The Dark Sacrament',
          description: 'Dark tidings from the Abbey of St.Seraphim - Sister Alena, a beloved healer of the Abbey of St.Seraphim, has been taken by the crimson-robed cultists of Belhor. Their unholy rituals must be stopped before the next blood moon. Time is of the essence.',
          reward: 800
        }),
        new Quest({
          id: '3',
          name: 'The Lost Forge',
          description: 'Deep beneath the Ironspine Mountains lies a legendary forge. Its location, lost to time, holds secrets of masterwork crafting.',
          reward: 2000
        }),
        new Quest({
          id: '4',
          name: 'The Haunted Lighthouse',
          description: 'The phantom light at Stormbreaker Point leads ships to their doom. The ghost of the old keeper must be laid to rest before more souls join his eternal vigil.',
          reward: 1200
        }),
        new Quest({
          id: '5',
          name: 'Goblin Market Mayhem',
          description: 'The night market of Altscheid has been overrun by mischievous goblins selling questionable "potions". The Merchants\' Guild seeks aid in restoring order.',
          reward: 300
        }),
        new Quest({
          id: '6',
          name: 'Stolen Magic Items',
          description: 'Several powerful magic items have been stolen from the imperial vaults. The imperial council seeks aid in recovering them.',
          reward: 5000
        }),
        new Quest({
          id: '7',
          name: 'Kraken\'s Curse',
          description: 'A massive tentacled horror terrorizes the Merchant\'s Bay. Brave souls are needed to venture into the depths and break the curse that binds it to our realm.',
          reward: 4000
        }),
        new Quest({
          id: '8',
          name: 'Faerie Ring Mystery',
          description: 'Children of Mosshollow village vanish during the full moon, led away by enchanting music. The trail leads to an ancient faerie ring deep in the misty forest.',
          reward: 1500
        }),
        new Quest({
          id: '9',
          name: 'Tournament of Fools',
          description: 'The mysterious Crimson Jester hosts a grand tournament where nothing is as it seems. Champions needed, sense of humor required, survival not guaranteed.',
          reward: 1000
        }),
        new Quest({
          id: '10',
          name: 'The Wandering Library',
          description: 'A magical library appears in different locations each full moon. Within its endless shelves lies a tome of great power, if one can navigate its ever-shifting corridors.',
          reward: 2500
        }),
        new Quest({
          id: '11',
          name: 'Feud between two Noble Houses',
          description: 'Two noble houses are feuding over a valuable artifact. The Merchants\' Guild seeks aid in calming the situation.',
          reward: 800
        }),
        new Quest({
          id: '12',
          name: 'Have you heard of the High Elves?',
          description: 'A mysterious band of High Elves, adorned in ancient regalia, seeks brave souls to delve into the Crypts of the Forgotten King. They speak of a powerful artifact from their homeland, though their ethereal smiles hide deeper motives. The promised reward is generous, perhaps suspiciously so.',
          reward: 3500
        })
      ];
      this.saveToStorage();
    }
    this.questsSubject.next(this.quests);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.quests));
  }

  getQuests(): Observable<Quest[]> {
    return this.questsSubject.asObservable();
  }

  getQuest(id: string): Observable<Quest | undefined> {
    return this.questsSubject.pipe(
      map(quests => quests.find(quest => quest.id === id))
    );
  }

  addQuest(quest: Omit<Quest, 'id'>): void {
    const newQuest = new Quest({
      ...quest,
      id: this.generateId()
    });
    this.quests = [...this.quests, newQuest];
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  updateQuest(id: string, updates: Partial<Omit<Quest, 'id'>>): void {
    this.quests = this.quests.map(quest => 
      quest.id === id ? new Quest({ ...quest, ...updates }) : quest
    );
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  deleteQuest(id: string): void {
    this.quests = this.quests.filter(quest => quest.id !== id);
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  clearAll(): void {
    this.quests = [];
    this.saveToStorage();
    this.questsSubject.next(this.quests);
  }
}
export { Quest };

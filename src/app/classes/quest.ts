export class Quest {
  id: string;
  name: string;
  description: string;
  reward: number;

  constructor(init?: Partial<Quest>) {
    this.id = init?.id || '';
    this.name = init?.name || '';
    this.description = init?.description || '';
    this.reward = init?.reward || 0;
  }
}
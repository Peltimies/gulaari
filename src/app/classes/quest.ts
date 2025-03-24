export class Quest {
  id: string;
  name: string;
  description: string;
  reward: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.reward = 0;
  }
}
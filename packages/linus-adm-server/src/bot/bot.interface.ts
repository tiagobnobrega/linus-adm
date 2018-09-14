export interface IBot {
  readonly name: string;
  readonly id?: string;
  readonly description?: string;
  readonly globalTokenizers: string[];
  readonly rootTopic: string;
}

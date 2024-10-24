export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}
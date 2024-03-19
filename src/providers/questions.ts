import Question from '../models/question';

export enum QuestionStatus {
  loading,
  error,
  ready,
  active,
  finished,
}

export enum ActionType {
  received,
  failed,
  start,
}

export default class Questions {
  static async getQuestions(): Promise<Question[]> {
    try {
      const res: Response = await fetch('http://localhost:8000/questions');
      const data = await res.json();
      return data as Question[];
    } catch (e) {
      throw e;
    }
  }
}

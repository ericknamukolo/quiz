import Question from '../models/question';

export enum Status {
  initial,
  loading,
  complete,
  active,
  error,
  finished,
}

export enum ActionType {
  dataReceived,
  dataFailed,
  quizStarted,
  newAnswer,
  nextQuestion,
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

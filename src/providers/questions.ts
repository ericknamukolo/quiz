import Question from '../models/question';

export default class Questions {
  static async getQuestions(): Promise<Question[]> {
    try {
      const res: Response = await fetch('http://localhost:8000/questions');
      const data = await res.json();
      return data as Question[];
    } catch (e) {
      alert(e);
    }
    return [];
  }
}

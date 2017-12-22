export interface TodoInterface {
  _id?: string
  text: string
  isCompleted?: boolean;
}

export class Todo implements TodoInterface {
  _id: string;
  text: string;
  isComplated: boolean = false;

  /**
   * @param {TodoInterface} todoInterface
   */
  constructor(todoInterface: TodoInterface){
    this._id = todoInterface._id || (new Date()).getTime().toString();
    this.text = todoInterface.text;
    this.isComplated = !!todoInterface.isCompleted;
  }
}

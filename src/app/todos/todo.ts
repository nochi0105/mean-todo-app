export interface TodoInterface {
  _id?: string;
  text: string;
  isCompleted?: boolean;
  isEditMode?: boolean;
}

export class Todo implements TodoInterface {
  _id: string;
  text: string;
  isCompleted = false;
  isEditMode = false;
  // Origin value
  _text_org: string;
  _isCompleted_org: boolean;
  /**
   * @param {TodoInterface} todoInterface
   */
  constructor(todoInterface: TodoInterface) {
    this._id = todoInterface._id || (new Date()).getTime().toString();
    this.text = todoInterface.text;
    this.isCompleted = !!todoInterface.isCompleted;
    this._text_org = this.text;
    this._isCompleted_org = this.isCompleted;
  }
}

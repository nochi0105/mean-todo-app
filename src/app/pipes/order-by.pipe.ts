import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  /**
   *
   * @param {Array<Object>} array
   * @param {string} key
   * @param args
   * @returns {Array<Object>}
   */
  transform(array: Array<object>, key: string, ...args): Array<any> {
    args[0] = args[0] || '';
    // use slice() to copy the array and not just make a reference
    const result = array;
    if (array.length > 0) {
      switch (args[0].toLowerCase()) {
        case 'asc':
          result.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
          break;
        case 'desc':
          result.sort((a, b) => a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0);
          break;
        default:
          result.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
      }
    }
    return result;
  }
}


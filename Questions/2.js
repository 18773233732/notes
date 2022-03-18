/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var addTwoNumbers = function (l1, l2) {
  let h1 = l1,
    h2 = l2;
  let result = new ListNode();
  let cur = result;
  let flag = 0;
  while (h1 || h2) {
    // l1空了
    if (!h1) {
      while (h2) {
        const value = h2.val + flag;
        flag = value >= 10 ? 1 : 0;
        h2.val = value % 10;
        cur.next = h2;
        h2 = h2.next;
        cur = cur.next;
      }
      break;
    }
    // l2空了
    if (!h2) {
      while (h1) {
        const value = h1.val + flag;
        flag = value >= 10 ? 1 : 0;
        h1.val = value % 10;
        cur.next = h1;
        h1 = h1.next;
        cur = cur.next;
      }
      break;
    }
    let value = (h1.val + h2.val + flag);
    flag = value >= 10 ? 1 : 0;
    value = value % 10;
    h1.val = value % 10;
    cur.next = h1;
    h1 = h1.next;
    h2 = h2.next;
    cur = cur.next;
  }
  if (flag) {
      let node = new ListNode(1);
      cur.next = node;
  }
  return result.next;
};
let h1 = new ListNode(9);
let h2 = new ListNode(9);
console.log(h1);
console.log(h2);
console.log(addTwoNumbers(h1, h2).next);

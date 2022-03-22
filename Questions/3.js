/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const array = Array.from(s);
  let start = 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    if (~array.slice(start, i).indexOf(array[i])) {
      start = start + array.slice(start, i).indexOf(array[i]) + 1;
    } else {
      result = i + 1 - start > result ? i + 1 - start : result;
    }
  }
  return result;
};

console.log(lengthOfLongestSubstring("pwwkew"));
// console.log([1, 2, 3].slice(0, 0));

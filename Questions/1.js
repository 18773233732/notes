/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = {};
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    // 求出另一半
    const minNum = target - nums[i];
    const minNumIndex = map[minNum];
    if (minNumIndex >= 0 && minNumIndex !== i) {
      result =  minNumIndex < i ? [minNumIndex, i] : [i, minNumIndex];
      break;
    } else {
      map[nums[i]] = i;
    }
  }
  return result;
};

console.log(twoSum([3, 2, 4], 6))
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

const createTreeNode = (
  value: number,
  left: TreeNode | null = null,
  right: TreeNode | null = null,
): TreeNode => ({
  value,
  left,
  right,
});

function insert(root: TreeNode | null, value: number): TreeNode {
  if (root === null) {
    return createTreeNode(value);
  }

  if (value < root.value) {
    root.left = insert(root.left, value);
  } else {
    root.right = insert(root.right, value);
  }

  return root;
}

function inOrderTraversal(root: TreeNode | null, result: number[]): void {
  if (root === null) {
    return;
  }

  inOrderTraversal(root.left, result);
  result.push(root.value);
  inOrderTraversal(root.right, result);
}

export function sortArrayUsingBST(nums: number[]): number[] {
  let root: TreeNode | null = null;

  for (const num of nums) {
    root = insert(root, num);
  }

  const sortedArray: number[] = [];
  inOrderTraversal(root, sortedArray);

  return sortedArray;
}

function measureTime(fn: () => void): number {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  return endTime - startTime;
}

const arr: number[] = [4, 2, 6, 1, 3, 5, 7];

const bstTime: number = measureTime(() => {
  sortArrayUsingBST(arr);
});

const arraySortTime: number = measureTime(() => {
  arr.sort((a, b) => a - b);
});

console.log(`Time taken by sortArrayUsingBST: ${bstTime} milliseconds`);
console.log(`Time taken by Array.sort: ${arraySortTime} milliseconds`);

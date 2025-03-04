interface TrieNode {
  children: Record<string, TrieNode>;
  isWord: boolean;
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = { children: {}, isWord: false };
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = { children: {}, isWord: false };
      }
      node = node.children[char];
    }
    node.isWord = true;
  }

  findWords(letters: string, minLength: number = 3): Set<string> {
    const words = new Set<string>();
    const lettersList = Array.from(letters.toLowerCase());

    const backtrack = (
      node: TrieNode,
      path: string,
      remainingLetters: string[],
    ): void => {
      if (node.isWord && path.length >= minLength) {
        words.add(path);
      }

      // Make a copy to avoid modifying the original array
      const lettersForThisLevel = [...remainingLetters];

      for (let i = 0; i < lettersForThisLevel.length; i++) {
        const char = lettersForThisLevel[i];
        if (node.children[char]) {
          // Remove the used letter
          const newRemaining = [...lettersForThisLevel];
          newRemaining.splice(i, 1);

          // Continue with the next node
          backtrack(node.children[char], path + char, newRemaining);
        }
      }
    };

    if (lettersList.length > 0) {
      backtrack(this.root, '', lettersList);
    }
    return words;
  }
}
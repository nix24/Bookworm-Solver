import { Trie } from './trie';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Import JSON files directly
import colors from '../data/colors.json';
import mammals from '../data/mammals.json';
import metals from '../data/metals.json';
import words from '../data/words.json';

export type WordStrength = {
  word: string;
  strength: number;
};

export type DictionaryResults = {
  [filename: string]: WordStrength[];
};

export class BookwormSolver {
  tries: Record<string, Trie> = {};
  
  // Letter strengths from the README
  letterStrengths: Record<string, number> = {
    'a': 1, 'd': 1, 'e': 1, 'g': 1, 'i': 1, 'l': 1, 'n': 1, 'o': 1, 'r': 1, 's': 1, 't': 1, 'u': 1,
    'b': 1.25, 'c': 1.25, 'f': 1.25, 'h': 1.25, 'm': 1.25, 'p': 1.25,
    'v': 1.5, 'w': 1.5, 'y': 1.5,
    'j': 1.75, 'k': 1.75, 'q': 1.75,
    'x': 2, 'z': 2,
    'qu': 2.75 // Special case for 'qu'
  };

  calculateWordStrength(word: string): number {
    let i = 0;
    let strength = 0;
    
    while (i < word.length) {
      // Check for 'qu' special case
      if (i < word.length - 1 && word.substring(i, i + 2).toLowerCase() === 'qu') {
        strength += this.letterStrengths['qu'];
        i += 2;
      } else {
        const char = word[i].toLowerCase();
        strength += this.letterStrengths[char] || 0;
        i++;
      }
    }
    
    return strength;
  }

  // Load a dictionary directly from imported JSON
  loadDictionary(dictionaryName: string, words: string[]): void {
    try {
      const trie = new Trie();
      
      for (const word of words) {
        if (typeof word === 'string' && word.trim()) {
          trie.insert(word.trim());
        }
      }
      
      this.tries[dictionaryName] = trie;
    } catch (error) {
      console.error(`Error loading dictionary ${dictionaryName}:`, error);
      throw error;
    }
  }

  // Load all dictionaries synchronously
  loadAllDictionaries(): void {
    this.loadDictionary('colors', colors);
    this.loadDictionary('mammals', mammals);
    this.loadDictionary('metals', metals);
    // @ts-ignore
    this.loadDictionary('words', words);
  }

  findSolutions(letters: string): DictionaryResults {
    const results: DictionaryResults = {};
    
    for (const [filename, trie] of Object.entries(this.tries)) {
      const words = Array.from(trie.findWords(letters));
      
      // Calculate word strengths and sort
      const wordStrengths: WordStrength[] = words.map(word => ({
        word,
        strength: this.calculateWordStrength(word)
      }));
      
      // Sort by strength (desc) then alphabetically
      wordStrengths.sort((a, b) => {
        if (b.strength !== a.strength) {
          return b.strength - a.strength;
        }
        return a.word.localeCompare(b.word);
      });
      
      results[filename] = wordStrengths.slice(0, 10); // Only top 10
    }
    
    return results;
  }
}
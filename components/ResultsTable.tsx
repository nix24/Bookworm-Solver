import { WordStrength } from '@/app/utils/solver';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type ResultsTableProps = {
  words: WordStrength[];
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ words }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedWord, setSelectedWord] = React.useState<string | null>(null);
  
  const renderItem = ({ item, index }: { item: WordStrength; index: number }) => {
    const isSelected = selectedWord === item.word;
    const isEvenRow = index % 2 === 0;
    
    return (
      <Pressable
        onPress={() => setSelectedWord(isSelected ? null : item.word)}
        style={[
          styles.row,
          {
            backgroundColor: isSelected
              ? `${colors.primary}20` 
              : isEvenRow
                ? colors.tableRowEven
                : colors.tableRowOdd,
          },
        ]}
      >
        <View style={styles.wordContainer}>
          <Text
            style={[
              styles.word,
              {
                color: isSelected ? colors.primary : colors.text,
                fontWeight: isSelected ? 'bold' : 'normal',
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.word}
          </Text>
        </View>
        <View style={styles.strengthContainer}>
          <LinearGradient
            colors={[
              isSelected ? colors.primary : `${colors.primary}75`,
              isSelected ? colors.secondary : `${colors.secondary}25`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.strengthBadge,
              {
                borderColor: isSelected ? colors.primary : 'transparent',
              },
            ]}
          >
            <Text style={[styles.strength, { color: isSelected ? '#fff' : colors.text }]}>
              {item.strength.toFixed(1)}
            </Text>
          </LinearGradient>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { borderBottomColor: colors.glassBorder }]}>
        <Text style={[styles.headerText, { color: colors.text, flex: 3 }]}>Word</Text>
        <Text style={[styles.headerText, { color: colors.text, flex: 1, textAlign: 'right' }]}>Strength</Text>
      </View>
      <FlatList
        data={words}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  wordContainer: {
    flex: 3,
    paddingRight: 8,
  },
  word: {
    fontSize: 16,
  },
  strengthContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  strengthBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center',
  },
  strength: {
    fontSize: 14,
    fontWeight: '500',
  },
});
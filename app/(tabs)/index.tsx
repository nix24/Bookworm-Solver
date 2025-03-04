import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookwormSolver, DictionaryResults } from '@/app/utils/solver';
import { DictionaryTabs } from '@/components/DictionaryTabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [letters, setLetters] = useState('');
  const [results, setResults] = useState<DictionaryResults>({});
  const [loading, setLoading] = useState(false);
  const [solver] = useState(() => {
    // Initialize solver immediately since it's now synchronous
    const newSolver = new BookwormSolver();
    newSolver.loadAllDictionaries();
    return newSolver;
  });

  const handleFindWords = () => {
    if (!letters.trim()) {
      Alert.alert('Error', 'Please enter letters');
      return;
    }

    // Sanitize input: remove spaces, numbers, and special characters
    const sanitizedLetters = letters.replace(/[^a-zA-Z]/g, '');
    
    if (!sanitizedLetters) {
      Alert.alert('Error', 'Please enter valid letters');
      return;
    }

    setLoading(true);
    try {
      const solutions = solver.findSolutions(sanitizedLetters);
      setResults(solutions);
    } catch (error) {
      console.error('Error finding solutions:', error);
      Alert.alert('Error', 'Failed to find solutions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <LinearGradient
        colors={
          colorScheme === 'dark' 
            ? ['#264653', '#1A1E23'] 
            : ['#2A9D8F', '#264653']
        }
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.overlay} />
        
        <View style={styles.contentContainer}>
          {/* Header with Glassmorphism */}
          <BlurView intensity={80} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.headerContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.title, { color: colors.primary }]}>Bookworm Solver</Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                Find the best words for your puzzle
              </Text>
            </View>
          </BlurView>
          
          {/* Input Section with Glassmorphism */}
          <BlurView intensity={60} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.inputContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.label, { color: colors.text }]}>Enter your letters:</Text>
              
              <View style={styles.inputRow}>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: colors.inputBackground,
                      borderColor: colors.glassBorder,
                      color: colors.text
                    }
                  ]}
                  value={letters}
                  onChangeText={setLetters}
                  placeholder="Enter letters (max 16)"
                  placeholderTextColor={`${colors.text}80`}
                  autoCapitalize="none"
                  maxLength={16}
                />
                
                <TouchableOpacity
                  onPress={handleFindWords}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
                    style={[
                      styles.button,
                      loading && { opacity: 0.7 }
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.buttonText}>Find Words</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
          
          {/* Results Section with Glassmorphism */}
          <BlurView intensity={40} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.resultsContainer}>
            <View style={[
              styles.glassCard, 
              styles.resultsCard,
              { backgroundColor: colors.cardBackground }
            ]}>
              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text style={[styles.loaderText, { color: colors.text }]}>
                    Finding the best words...
                  </Text>
                </View>
              ) : (
                <>
                  {Object.keys(results).length > 0 ? (
                    <DictionaryTabs results={results} />
                  ) : (
                    <View style={styles.emptyContainer}>
                      <Text style={[styles.emptyText, { color: colors.text }]}>
                        Enter letters above to find words
                      </Text>
                      <Text style={[styles.emptySubtext, { color: `${colors.text}80` }]}>
                        Try to use all 16 letters for the best results
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </BlurView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  inputContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  glassCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.8,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 200,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 12,
    marginBottom: 8,
  },
  button: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultsCard: {
    flex: 1,
    padding: 0,
    overflow: 'hidden',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
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
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {/* Header with Glassmorphism */}
          <BlurView intensity={80} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.headerContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.title, { color: colors.primary }]}>About Bookworm Solver</Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                An efficient solver for the Bookworm puzzle game
              </Text>
            </View>
          </BlurView>
          
          {/* Features Section */}
          <BlurView intensity={60} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.sectionContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Key Features</Text>
              
              <View style={styles.featureItem}>
                <Ionicons name="flash" size={24} color={colors.primary} style={styles.featureIcon} />
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>Fast Word Lookup</Text>
                  <Text style={[styles.featureDescription, { color: `${colors.text}90` }]}>
                    Using an optimized Trie data structure for quick word retrieval
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="book" size={24} color={colors.primary} style={styles.featureIcon} />
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>Multiple Dictionaries</Text>
                  <Text style={[styles.featureDescription, { color: `${colors.text}90` }]}>
                    Support for various word lists including colors, mammals, metals, and more
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="calculator" size={24} color={colors.primary} style={styles.featureIcon} />
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>Scoring System</Text>
                  <Text style={[styles.featureDescription, { color: `${colors.text}90` }]}>
                    Accurate scoring based on letter weights from the Bookworm game
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="phone-portrait" size={24} color={colors.primary} style={styles.featureIcon} />
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>Modern UI</Text>
                  <Text style={[styles.featureDescription, { color: `${colors.text}90` }]}>
                    Clean, responsive interface built with React Native and Expo
                  </Text>
                </View>
              </View>
            </View>
          </BlurView>
          
          {/* Letter Weights Section */}
          <BlurView intensity={60} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.sectionContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Letter Weights</Text>
              
              <View style={styles.letterWeightsContainer}>
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightHeader, { color: colors.text }]}>Weight</Text>
                  <Text style={[styles.weightHeader, { color: colors.text }]}>Letters</Text>
                </View>
                
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>1</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>A, D, E, G, I, L, N, O, R, S, T, U</Text>
                </View>
                
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>1.25</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>B, C, F, H, M, P</Text>
                </View>
                
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>1.5</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>V, W, Y</Text>
                </View>
                
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>1.75</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>J, K, Q</Text>
                </View>
                
                <View style={[styles.weightRow, { borderBottomColor: colors.glassBorder }]}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>2</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>X, Z</Text>
                </View>
                
                <View style={styles.weightRow}>
                  <Text style={[styles.weightValue, { color: colors.text }]}>2.75</Text>
                  <Text style={[styles.weightLetters, { color: colors.text }]}>Qu (special case)</Text>
                </View>
              </View>
            </View>
          </BlurView>
          
          {/* Footer Section */}
          <BlurView intensity={40} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.sectionContainer}>
            <View style={[styles.glassCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>About the Developer</Text>
              <Text style={[styles.paragraph, { color: colors.text }]}>
                This app was created to help Bookworm players find the best possible words for their puzzles.
                Inspired by the classic PopCap game, it aims to provide a useful tool for both casual and competitive players.
              </Text>
              
              <TouchableOpacity 
                style={[styles.button, { marginTop: 20 }]}
                onPress={() => openLink('https://github.com/nix24/Bookworm-Solver')}
              >
                <LinearGradient
                  colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="logo-github" size={20} color="white" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>View on GitHub</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <Text style={[styles.copyright, { color: `${colors.text}70` }]}>
                {new Date().getFullYear()} Bookworm Solver. All rights reserved.
              </Text>
            </View>
          </BlurView>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sectionContainer: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  letterWeightsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  weightRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  weightHeader: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  weightValue: {
    width: 60,
    fontSize: 15,
  },
  weightLetters: {
    flex: 1,
    fontSize: 15,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  copyright: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
  },
});

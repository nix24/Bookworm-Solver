import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform, ScrollView, Dimensions } from 'react-native';
import { DictionaryResults } from '@/app/utils/solver';
import { ResultsTable } from './ResultsTable';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type DictionaryTabsProps = {
  results: DictionaryResults;
};

export const DictionaryTabs: React.FC<DictionaryTabsProps> = ({ results }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const dictionaries = Object.keys(results);
  const [activeTab, setActiveTab] = React.useState<string>(
    dictionaries.length > 0 ? dictionaries[0] : ''
  );

  // Animation for tab indicator
  const [indicatorPosition] = React.useState(new Animated.Value(0));
  const [indicatorWidth] = React.useState(new Animated.Value(0));
  const tabPositions = React.useRef<{ [key: string]: { x: number; width: number } }>({});
  const scrollViewRef = React.useRef<ScrollView>(null);

  const animateIndicator = (tab: string) => {
    const position = tabPositions.current[tab];
    if (position) {
      Animated.parallel([
        Animated.timing(indicatorPosition, {
          toValue: position.x,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(indicatorWidth, {
          toValue: position.width,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
      
      // Scroll to make the active tab visible
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: Math.max(0, position.x - width / 4),
          animated: true,
        });
      }
    }
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    animateIndicator(tab);
  };

  // Initialize indicator position for the first tab
  React.useEffect(() => {
    if (dictionaries.length > 0 && activeTab) {
      animateIndicator(activeTab);
    }
  }, [dictionaries, activeTab]);

  // Use a safer approach for layout measurement
  const handleTabLayout = (tab: string, event: any) => {
    try {
      if (event && event.nativeEvent && event.nativeEvent.layout) {
        const { x, width } = event.nativeEvent.layout;
        
        // Only update if we have valid measurements
        if (typeof x === 'number' && typeof width === 'number') {
          tabPositions.current[tab] = { x, width };
          
          // If this is the active tab, update the indicator position
          if (tab === activeTab) {
            animateIndicator(tab);
          }
        }
      }
    } catch (error) {
      console.log('Error measuring tab:', error);
    }
  };

  if (dictionaries.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>No results found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.tabsOuterContainer, { borderBottomColor: colors.glassBorder }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContainer}
        >
          <View style={styles.tabsContainer}>
            {dictionaries.map((dict) => (
              <TouchableOpacity
                key={dict}
                onPress={() => handleTabPress(dict)}
                onLayout={(e) => handleTabLayout(dict, e)}
                style={styles.tab}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === dict ? colors.primary : `${colors.text}80` },
                  ]}
                >
                  {dict.charAt(0).toUpperCase() + dict.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
            
            {/* Only render the indicator if we have valid positions */}
            {Object.keys(tabPositions.current).length > 0 && (
              <Animated.View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: colors.primary,
                    left: indicatorPosition,
                    width: indicatorWidth,
                  },
                ]}
              />
            )}
          </View>
        </ScrollView>
      </View>
      
      <View style={styles.contentContainer}>
        {activeTab && results[activeTab] && (
          <LinearGradient
            colors={[`${colors.cardBackground}`, `${colors.cardBackground}90`]}
            style={styles.contentGradient}
          >
            <ResultsTable words={results[activeTab]} />
          </LinearGradient>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabsOuterContainer: {
    borderBottomWidth: 1,
    position: 'relative',
  },
  tabsScrollContainer: {
    paddingHorizontal: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative', // Ensure the container has a position for absolute positioning of the indicator
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  contentGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    overflow: 'hidden',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
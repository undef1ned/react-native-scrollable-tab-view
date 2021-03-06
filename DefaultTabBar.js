const React = require('react');
const ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated
} = ReactNative;
const Button = require('./Button');

const createReactClass = require('create-react-class');

const DefaultTabBar = createReactClass({

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(tab, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = 'normal';

    return <Button
      style={styles.flexOne}
      key={tab.label}
      accessible={true}
      accessibilityLabel={tab.label}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        {
            tab.icon &&
            <Image
                source={{uri: tab.icon}}
                style={styles.tab_icon}
            />
       }
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {tab.label}
        </Text>
      </View>
    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const width = this.props.tabBarWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: (width || containerWidth) / numberOfTabs,
      height: this.props.underlineHeight || 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  (width || containerWidth) / numberOfTabs, ],
    });
    return (
    <View style={{
        backgroundColor: this.props.backgroundColor,
        borderBottomColor: this.props.borderColor || null
    }}
    >
      <View style={[styles.tabs, {
          backgroundColor: this.props.backgroundColor,
          width: width || containerWidth}
        , this.props.style,
     ]}>
        {this.props.tabs.map((tab, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(tab, page, isTabActive, this.props.goToPage);
        })}
        <View style={[{
          position: 'absolute',
          width: containerWidth,
          height: 1,
          backgroundColor: this.props.borderColor || '#f4f4f4',
          bottom: 0,
        }]} />
        <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
      </View>
     </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    alignSelf: 'center'
  },
    tab_icon: {
       width: 28,
       height: 28,
       borderRadius: 14,
       marginRight: 5
   },
});

module.exports = DefaultTabBar;

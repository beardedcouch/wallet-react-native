import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { performDivisibility } from './../util/general';

// import { CardSection } from './../common';
import Colors from './../config/colors';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class TransactionListItem extends Component {
  renderItem() {
    const { item } = this.props;
    const {
      containerStyleHeader,
      iconStyle,
      textStyleHeader,
      textStyleDate,
      textStyleAmount,
      viewStyleAmount,
    } = styles;
    console.log(item);

    let iconName = '';
    let headerText = '';
    let color = '';

    // console.log(this.state.tx_type);

    switch (item.tx_type) {
      case 'debit':
        // console.log('Debit');
        iconName = 'call-made';
        headerText = 'Sent';
        if (item.destination_transaction) {
          //  && item.destination_transaction.user
          headerText =
            headerText + ' to ' + item.destination_transaction.user.email;
        }
        color = Colors.negative;
        break;
      case 'credit':
        // console.log('Credit');
        iconName = 'call-received';
        headerText = 'Received';
        if (item.source_transaction) {
          // && item.source_transaction.user
          headerText =
            headerText + ' from ' + item.source_transaction.user.email;
        }
        color = Colors.positive;
        break;
      default:
        iconName = 'question';
        headerText = 'Unknown transaction type';
        color = Colors.warning;
    }

    return (
      <View style={containerStyleHeader}>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={iconStyle} size={24} name={iconName} color={color} />
          <View style={{ paddingLeft: 8 }}>
            <Text style={textStyleHeader}>{headerText}</Text>
            <Text style={textStyleDate}>{moment(item.created).fromNow()}</Text>
          </View>
        </View>
        <View style={viewStyleAmount}>
          <Text style={[textStyleAmount, { color: color }]}>
            {item.currency.symbol}{' '}
            {performDivisibility(
              item.amount,
              item.currency.divisibility,
            ).toFixed(item.currency.divisibility)}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return <View>{this.renderItem()}</View>;
  }
}

const styles = {
  containerStyleHeader: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  viewStyleAmount: {
    // right: 0,
    // justifyContent: 'flex-end',
  },
  textStyleHeader: {
    fontSize: 12,
  },
  textStyleDate: {
    fontSize: 10,
    borderBottomColor: 'lightgrey',
  },
  textStyleAmount: {
    fontSize: 12,
  },
};

// const mapStateToProps = (state, ownProps) => {
//   const expanded = (state.selectedLibraryId === ownProps.library.id);
//   return { expanded };
// };

export default TransactionListItem; //connect(mapStateToProps, actions)(ListItem);

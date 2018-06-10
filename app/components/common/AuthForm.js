import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';

const AuthForm = props => {
  const {
    viewStyleContainer,
    viewStyleHeader,
    viewStyleContent,
    viewStyleFooter,
    iconStyleHeaderLeft,
    buttonStyleActionRight,
    textStyleAction,
  } = styles;

  const {
    iconHeaderLeft,
    onPressHeaderLeft,
    textHeaderRight,
    onPressHeaderRight,
    textFooterLeft,
    onPressFooterLeft,
    textFooterRight,
    onPressFooterRight,
    loading,
  } = props;

  return (
    <View style={viewStyleContainer}>
      {iconHeaderLeft || textHeaderRight ? (
        <View style={viewStyleHeader}>
          {iconHeaderLeft ? (
            <HeaderButton
              icon={iconHeaderLeft}
              onPress={onPressHeaderLeft}
              color={Colors.primaryContrast}
            />
          ) : (
            <View />
          )}
          {textHeaderRight ? (
            <TouchableOpacity onPress={onPressHeaderRight}>
              <Text style={textStyleAction}>{textHeaderRight}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      ) : null}
      <View style={viewStyleContent}>
        {loading ? <Spinner size="small" /> : props.children}
      </View>
      <View style={viewStyleFooter}>
        {textFooterLeft ? (
          <TouchableOpacity onPress={onPressFooterLeft}>
            <Text style={textStyleAction}>{textFooterLeft}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {textFooterRight ? (
          <TouchableOpacity onPress={onPressFooterRight}>
            <Text style={textStyleAction}>{textFooterRight}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  viewStyleHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 64,
    // paddingTop: 32,
    // padding: 12,
  },
  viewStyleContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
    // backgroundColor: Colors.onPrimary,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  viewStyleFooter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 64,
    padding: 8,
  },
  iconStyleHeaderLeft: {
    margin: 16,
    color: Colors.onPrimary,
    // opacity: 0.87,
  },
  textStyleAction: {
    color: Colors.onPrimary,
    fontSize: 18,
    padding: 16,
    // alignSelf: 'flex-end',
  },
};

export { AuthForm };
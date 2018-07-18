import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {
  initMFA,
  nextStateMFA,
  verifyMFA,
  authFieldChange,
} from './../../../../redux/actions';

import Header from '../../../../components/header';
import {
  Button,
  Spinner,
  Input,
  InputContainer,
  Output,
  CodeInput,
} from '../../../../components/common';
// import {} from '../../../../util/Rehive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TwoFactorScreen extends Component {
  static navigationOptions = {
    title: 'Two factor',
  };

  componentDidMount() {
    this.props.initMFA();
    // checks mfa status, updates state accordingly
    // this.setState({ viewState: 'landing' });
  }

  renderContent() {
    const { mfaState } = this.props;

    switch (mfaState) {
      case 'landing':
        return this.renderLanding();
      case 'enabled':
        return this.renderEnabled();
      case 'token':
        return this.renderToken();
      case 'sms':
        return this.renderSMS();
      case 'verifyToken':
      case 'verifySMS':
        return this.renderVerify();
      default:
        return <Spinner size="large" />;
    }
  }

  renderLanding() {
    const { colors } = this.props.company_config;
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Multi-factor authentication increases the security of your account by
          requiring a code (either SMS or from a token provider) above your
          normal password for authentication. {'\n'}
          {'\n'}Please choose the type of multi-factor authentication you would
          like to activate on your account.
        </Text>
        {this.props.mfaLoading ? (
          <Spinner size="large" />
        ) : (
          <View>
            <Button
              label="TOKEN"
              textColor={colors.primaryContrast}
              backgroundColor={colors.primary}
              onPress={() => this.props.nextStateMFA('token')}
            />
            <Button
              label="SMS"
              textColor={colors.primary}
              backgroundColor="transparent"
              onPress={() => this.props.nextStateMFA('sms')}
            />
          </View>
        )}
      </View>
    );
  }

  renderEnabled() {
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Multi-factor authentication increases the security of your account by
          requiring a code (either SMS or from a token provider) above your
          normal password for authentication. {'\n'}
          {'\n'}Multi-factor authentication is enabled on this account.
        </Text>
        <Button label="Disable" onPress={() => this.props.nextStateMFA('')} />
      </View>
    );
  }

  renderToken() {
    const { colors } = this.props.company_config;
    const { mfaToken } = this.props;
    return (
      <InputContainer>
        <Image
          style={{ width: 250, height: 250, alignSelf: 'center' }}
          source={{
            uri:
              'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=' +
              mfaToken.imageURI,
          }}
        />
        <Output label="Issuer" value={mfaToken.issuer} copy />
        <Output label="Account" value={mfaToken.account} copy />
        <Output label="Key" value={mfaToken.key} copy />
        <Button
          label="ENABLE"
          onPress={() => this.props.nextStateMFA('verifyToken')}
        />
        <Button
          label="CANCEL"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </InputContainer>
    );
  }

  renderSMS() {
    const { colors } = this.props.company_config;
    return (
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>
          Please input a mobile number that will be used for SMS multi-factor
          auth.
        </Text>
        <Input
          label="Mobile number"
          placeholder="e.g. +278412345687"
          autoCapitalize="none"
          value={this.props.mfaMobile}
          // inputError={updateError}
          onChangeText={value =>
            this.props.authFieldChange({ prop: 'mfaMobile', value })
          }
          colors={colors}
        />
        <Button
          label="ENABLE"
          onPress={() => this.props.nextStateMFA('verifySMS')}
        />
        <Button
          label="CANCEL"
          onPress={() => this.props.nextStateMFA('back')}
        />
      </View>
    );
  }

  renderVerify() {
    const { mfaError, mfaState } = this.props;
    return (
      <View>
        <Text style={styles.textStyle}>
          {mfaState === 'verifyToken'
            ? 'Please input the token from your 2FA app'
            : 'Please input the OTP sent to your mobile number'}
        </Text>
        <CodeInput
          ref={component => (this._pinInput2 = component)}
          secureTextEntry
          activeColor="gray"
          autoFocus
          inactiveColor="lightgray"
          className="border-b"
          codeLength={mfaState === 'verifyToken' ? 6 : 4}
          space={7}
          size={30}
          inputPosition="center"
          containerStyle={{ marginTop: 0, paddingBottom: 16, minHeight: 40 }}
          onFulfill={code => this.props.verifyMFA(code)}
        />
        {mfaError ? (
          <Text style={[styles.textStyle, { color: 'red' }]}>{mfaError}</Text>
        ) : null}

        {/* <Button
          label="CANCEL"
          onPress={() => this.setState({ showPin: false })}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header navigation={this.props.navigation} back title="Two factor" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  contentStyle: {
    // flex: 1,
    padding: 16,
  },
  textStyle: {
    // flex: 1,
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: Colors.lightgray,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 16,
  },
});

const mapStateToProps = ({ auth }) => {
  const {
    company_config,
    mfaState,
    mfaToken,
    mfaError,
    mfaLoading,
    mfaMobile,
  } = auth;
  return {
    company_config,
    mfaState,
    mfaToken,
    mfaError,
    mfaLoading,
    mfaMobile,
  };
};

export default connect(mapStateToProps, {
  initMFA,
  nextStateMFA,
  verifyMFA,
  authFieldChange,
})(TwoFactorScreen);

import React from 'react';
import { Lbry } from 'lbry-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  Linking,
  NativeModules,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native';
import Colors from 'styles/colors';
import Constants from 'constants';
import firstRunStyle from 'styles/firstRun';

class WalletPage extends React.PureComponent {
  state = {
    password: null,
    placeholder: 'passphrase',
    statusTries: 0
  };

  handleChangeText = (text) => {
    // save the value to the state email
    const { onPasswordChanged } = this.props;
    this.setState({ password: text });
    if (onPasswordChanged) {
      onPasswordChanged(text);
    }

    if (NativeModules.UtilityModule) {
      NativeModules.UtilityModule.setSecureValue(Constants.KEY_FIRST_RUN_PASSWORD, text);
      // simply set any string value to indicate that a passphrase was set on first run
      AsyncStorage.setItem(Constants.KEY_FIRST_RUN_PASSWORD, "true");
    }
  }

  render() {
    const { onPasswordChanged, onWalletViewLayout } = this.props;

    const content = (
      <View onLayout={onWalletViewLayout}>
        <Text style={firstRunStyle.title}>Your Wallet</Text>
        <Text style={firstRunStyle.paragraph}>LBRY Credits (or LBC) are tokens which you can use to purchase content and support creators in the digital marketplace.</Text>
        <Text style={firstRunStyle.paragraph}>We use a wallet to store these tokens, which needs to be secured. Please enter a passphrase to secure your wallet.</Text>
        <TextInput style={firstRunStyle.passwordInput}
            placeholder={this.state.placeholder}
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={text => this.handleChangeText(text)}
            onFocus={() => {
              if (!this.state.password || this.state.password.length === 0) {
                this.setState({ placeholder: '' });
              }
            }}
            onBlur={() => {
              if (!this.state.password || this.state.password.length === 0) {
                this.setState({ placeholder: 'passphrase' });
              }
            }}
            />
        <Text style={firstRunStyle.infoParagraph}>If you forget your passphrase, you will be unable to make use of your LBC. Make sure to use a memorable passphrase.</Text>
      </View>
    );

    return (
      <View style={firstRunStyle.container}>
        {content}
      </View>
    );
  }
}

export default WalletPage;
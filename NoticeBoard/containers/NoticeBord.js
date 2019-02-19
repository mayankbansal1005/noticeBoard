/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import NoticeBord from '@NoticeBoard/screens/NoticeBord';
import Toast from 'react-native-simple-toast';
import { getData } from '@Core/Localstorage/Localstorage';
import { getNoticeBord } from '../model/NoticeBoard';

class NoticeBordContainer extends Component {
  static navigationOptions = {
    title: ' Notice Board',
  };

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      noticeBordList: [],
    };
  }

  componentWillMount() {
    this.getNoticeBordDetails();
  }

  async getNoticeBordDetails() {
    this.userDataStore = await getData('userDataLocalStore');
    this.setState({ showProgress: true });
    const noticeBordParamRequest = {
      soc_sdm_uuid: this.userDataStore.sdm_uuid,
      is_post: true,
      to: 9,
    };
    if (noticeBordParamRequest) {
      getNoticeBord(noticeBordParamRequest, (errorMessage, noticeBordList) => {
        this.setState({ showProgress: false });
        if (errorMessage) {
          Toast.show(errorMessage);
        } else {
          this.setState({ noticeBordList });
          // log(`noticeBordListData : ${JSON.stringify(noticeBordList)}`);
        }
      });
    }
  }

  onContinueClick = (navigationURL) => {
    this.setState({ showProgress: true });
    const { navigation } = this.props;
    const requestJSON = {
      noticeBordDetails: {
        noticeBord: '',
      },
    };
    if (requestJSON) {
      this.setState({ showProgress: false });
      navigation.navigate(navigationURL, { response: requestJSON.noticeBordDetails });
    }
  };

  render() {
    const { showProgress, noticeBordList } = this.state;
    return (
      <NoticeBord
        noticeBordListData={noticeBordList}
        onContinueClick={this.onContinueClick}
        showProgress={showProgress}
      />
    );
  }
}

export default NoticeBordContainer;

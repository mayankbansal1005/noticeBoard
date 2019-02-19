/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  WebView
} from 'react-native';
import CommonStyle from '@styles/CommonStyle';
import CollapsibleList from '@Core/CollapsibleList';
import Loader from '@Core/Loader';
import { LoaderMsgText } from '@util/strings';
import { RGTextColor1, RGTextColor2, RGTextColorLight } from '@util/colors';
import { NoticeBordImage } from '@util/images';

const styles = StyleSheet.create({
  CollapsibleListSection: {},
  CustomListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  NoticeBordCardSection: {
    flex: 1,
    flexDirection: 'column',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    width: '100%',
    padding: 15,
  },
  NoticeBordTextContainer: { 
    width: '100%',
    // flex: 1,
  },
  NoticeBordTitle: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 18,
    color: RGTextColor1,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  NoticeBordInfoText: {
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    color: RGTextColor2,
  },
  NoticeBordImageContainer: { 
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  NoticeBordImageStyle: {
    minHeight: 150,
    minWidth: 150,
    margin: 10,

  },
  noRecordFound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 500,
    width: '100%',
  },
  noRecordFoundText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 18,
    color: RGTextColor1,
  },
  validityInfoText: {
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 15,
    color: RGTextColorLight,
    paddingVertical: 2,
    textTransform: 'capitalize',
  },
});
class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler = (navigationURL) => {
    const { onContinueClick } = this.props;
    if (navigationURL) {
      onContinueClick('', navigationURL);
    } else {
      onContinueClick('', 'Home');
    }
  };

  render() {
    const { container } = CommonStyle;
    const { showProgress, noticeBordListData } = this.props;
    const { clickHandler } = this;
    let noRecordFound;
    if (noticeBordListData.length === 0) {
      noRecordFound = (
        <View style={styles.noRecordFound}>
          <Text style={styles.noRecordFoundText}>No Record Found !</Text>
        </View>
      );
    }
    return (
      <View style={container}>
        <ScrollView>
          <View style={styles.CollapsibleListSection}>
            {noRecordFound}
            <View style={styles.CustomListContainer}>
              {noticeBordListData.map((item, Index) => (
                <CollapsibleList
                  titleText={item.subject}
                  // subTitleText={`${item.sender_id}, ${item.sent_date}`}
                  collapesBodyStatus
                  status="NoticeBord" // Assigned, Verified, Notification, NoticeBord
                // statusText="4 hours ago"
                  id={item.notice_uuid}
                  key={Index + 1}
                >
                  <View style={styles.NoticeBordCardSection}>
                    <View style={styles.NoticeBordTextContainer}>
                      <Text style={styles.NoticeBordTitle}>{item.heading}</Text>
                      {/* <Text style={styles.NoticeBordInfoText}>
                        {item.text_body}
                      </Text> */}
                      {/* <WebView style={{width:'100%',height:100}} source={{html:item.text_body}} /> */}
                      <Text style={styles.validityInfoText}>{`${item.sender_id}, ${item.sent_date}`}</Text>
                      <Text style={styles.validityInfoText}>{`Valid From-${item.valid_from}`}</Text>
                      <Text style={styles.validityInfoText}>{`Valid Till-${item.valid_till}`}</Text> 
                    </View>
                    <View style={styles.NoticeBordImageContainer}>
                      {item.docs.map((item, Index) => (
                        <Image key={Index + 100} source={{ uri: item.doc_url }} style={styles.NoticeBordImageStyle} />
                      ))}
                    </View>
                  </View>
                </CollapsibleList>
              ))}
            </View>
           
         
          </View>
        </ScrollView>

        {showProgress ? (
          <Loader
            status="INPROGRESS"
            msgText={LoaderMsgText}
            showDialog={showProgress}
            loaderHandler={() => {}}
          />
        ) : null}
      </View>
    );
  }
}
export default Maintenance;

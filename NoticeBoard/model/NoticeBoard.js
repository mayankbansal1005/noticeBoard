/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import * as NetworkManager from '@Core/networkmanager/NetworkManager';
// import { log } from '@util/Logger';
import * as ApiConstants from './api/ApiConstants';

const getNoticeBord = (paramsName, callback) => {
  // const staffparamsNameRequest = {
  //   soc_sdm_uuid: '584055c8-2388-4dc6-a0eb-a6fc57875c62',
  //   is_post: true,
  // };
  NetworkManager.get(ApiConstants.NOTICEBORD_URL, paramsName)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      callback(error.data.message);
    });
};

export { getNoticeBord };

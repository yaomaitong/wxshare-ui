import fetch from '../../config/fetch'

export const newsList = (pageNo, pageSize) => fetch('news/v1/list', {
  pageNo: pageNo,
  pageSize: pageSize
});

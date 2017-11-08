import fetch from '../../config/fetch'

export const newsList = (pageNo, pageSize) => fetch('news_list', {
    page: pageNo,
    page_size: pageSize
});

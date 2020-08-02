'use strict';

import * as axios from 'axios';

//функция отправки данных через axios
async function postData(url, data) {
    let res = await axios({
        method: 'post',
        url: url,
        headers: {
            'Content-type': 'application/json'
        },
        data: data,
    });

    return await res;
}

//функция получения данных через axios
function getData (url) {
    let res = axios.get(url);

    return res;
}


export {postData, getData};
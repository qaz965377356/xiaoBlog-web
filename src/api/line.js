
import axios from '@/http/api';


const article = {
    // 时间线列表
    list () {
        return axios({
            url: '/line/list',
            method: 'get'
        })
    },
}

export default article;

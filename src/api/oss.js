
import axios from '@/http/api';


const oss = {
    // 时间线列表
    uploadImg (data) {
        return axios({
            url: '/pass/oss/upload',
            data:data,
            method: 'post'
        })
    },
}

export default oss;

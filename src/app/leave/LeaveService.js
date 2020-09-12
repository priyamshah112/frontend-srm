import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  
  postLeave(params, payload, token) {
    return axios.post(`${BACKEND_API_URL}/leaves`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTU3Y2Y5Ni0wMDM1LTRhNDUtODY5ZC1mNDE5YWM5NzI0MjEiLCJqdGkiOiI3YWE0YjMzYTcxZDU2YWYxYzg0ZjZmMGM2ZDI3MWE4NDA0MDkxZTM5ZDk3YTZhMzg4ZGE4NzAxNjQ2Mjg2MzYwNjc4MjI1NjEwNGZhN2FkMSIsImlhdCI6MTU5OTQ2NDQyNCwibmJmIjoxNTk5NDY0NDI0LCJleHAiOjE2MzEwMDA0MjQsInN1YiI6IjkwIiwic2NvcGVzIjpbXX0.BfgImPU2LW8s4_2QgOZUn7dvo9x9glEx33fVC0ZMAFwPwpeww4K71oYP9v61AQFInDotG4d-7O43hwJ7dy5wBJQNM6GOGyzsr67WxFlsYClsu-_ep6QL4MViiPsJld5UCS6RZvCVLIp7Up0eBvJnoQVR42mJoWFj0-tGcM9o2od05FCkB-RUw8Unlw05kK3BmuKcCkEjSDNH5dHiudsqKVoczWN3HVsjEAesHr1GlyA7StS5_uCWezjc4Eg0FdIdATuo9Xx7vT9rvRntOs2wvAdK871s9v4bMNV3KT2iYKnzxXhclf0NG2yixNQ7q86Xi3rQJcxizymjgXkuBNaqaBxNfjEpuCZQPAo1_COQSWrligMR7bxiXrXbfACnFrTU19zLLufWQDgEPd27rb_C8Sor8RVo-VE59PG0kGr3BBbjnEQrraEkYXbC5rs_rtnGR52U_c1NTN_1BIQNzScG8gRkbcUsikX5uEe9kcrZ5TWNmUYxsphdLTidCSkMoM0w4VbUSa1sVePPHbXnqAFExcBE2bAHLuDbJanFHOay54E9z_lX_7koPYHpv16OToNkCoXFpr7HCdbjVS1DSsotOStBEO7JSV3LJA97GcevCsPs-LcUj5frv9Mgy_QNfC00awCaL9AMMW_lnivLwIC0cO40EJmWpT00G-t0PP7h5EA`,
      },
    });
  }
  putLeave(payload, token) {
    return axios.put(`${BACKEND_API_URL}/leaves`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTU3Y2Y5Ni0wMDM1LTRhNDUtODY5ZC1mNDE5YWM5NzI0MjEiLCJqdGkiOiI3YWE0YjMzYTcxZDU2YWYxYzg0ZjZmMGM2ZDI3MWE4NDA0MDkxZTM5ZDk3YTZhMzg4ZGE4NzAxNjQ2Mjg2MzYwNjc4MjI1NjEwNGZhN2FkMSIsImlhdCI6MTU5OTQ2NDQyNCwibmJmIjoxNTk5NDY0NDI0LCJleHAiOjE2MzEwMDA0MjQsInN1YiI6IjkwIiwic2NvcGVzIjpbXX0.BfgImPU2LW8s4_2QgOZUn7dvo9x9glEx33fVC0ZMAFwPwpeww4K71oYP9v61AQFInDotG4d-7O43hwJ7dy5wBJQNM6GOGyzsr67WxFlsYClsu-_ep6QL4MViiPsJld5UCS6RZvCVLIp7Up0eBvJnoQVR42mJoWFj0-tGcM9o2od05FCkB-RUw8Unlw05kK3BmuKcCkEjSDNH5dHiudsqKVoczWN3HVsjEAesHr1GlyA7StS5_uCWezjc4Eg0FdIdATuo9Xx7vT9rvRntOs2wvAdK871s9v4bMNV3KT2iYKnzxXhclf0NG2yixNQ7q86Xi3rQJcxizymjgXkuBNaqaBxNfjEpuCZQPAo1_COQSWrligMR7bxiXrXbfACnFrTU19zLLufWQDgEPd27rb_C8Sor8RVo-VE59PG0kGr3BBbjnEQrraEkYXbC5rs_rtnGR52U_c1NTN_1BIQNzScG8gRkbcUsikX5uEe9kcrZ5TWNmUYxsphdLTidCSkMoM0w4VbUSa1sVePPHbXnqAFExcBE2bAHLuDbJanFHOay54E9z_lX_7koPYHpv16OToNkCoXFpr7HCdbjVS1DSsotOStBEO7JSV3LJA97GcevCsPs-LcUj5frv9Mgy_QNfC00awCaL9AMMW_lnivLwIC0cO40EJmWpT00G-t0PP7h5EA`,
      },
    });
  }
  fetchMoreLeave(token) {
    return axios.get(`${BACKEND_API_URL}/leaves`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllLeaves(token) {
    return axios.get(`${BACKEND_API_URL}/leaves`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllTeacher(token) {
    return axios.get(`${BACKEND_API_URL}/getUsers/teacher`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  
}

export default new FaqService();

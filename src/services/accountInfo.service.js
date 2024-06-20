import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';
const API_URL = BASE_API_URL + '/order/accountinfo';


class AccountInfoService {

  savePayment(id,account) {
    console.log("accountInfo",id,account)
    return axios.post('http://localhost:8080/order/accountinfo'+`/${id}`, account, { headers: authHeader() });
  }

//   getMyOrders(id) {
//     return axios.get(API_URL+`/${id}` , { headers: authHeader() })
//   }

//   cancelMyOrder(id) {
//     console.log("in Method"+authHeader())
//     return axios.put(API_URL+`/cancel/${id}` , id,{ headers: authHeader() })
//   }
}

export default new AccountInfoService();

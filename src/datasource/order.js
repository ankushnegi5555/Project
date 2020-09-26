import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class OrderAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/order`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    async createOrder(payload) {
        try{
            console.log('inside create order', payload);
            const response = await this.post('/', {...payload});
            const { message } = response;
            return message;
        } catch(error){
            console.log('Error: ', error);
        }
    }
    
    async deleteOrder(ID) {
        const { id } = ID;
        console.log('inside delete order', ID, id);
        const response = await this.delete(`/${id}`);
        const { message } = response;
        return message;
    }
    
    async getOrder(options) {
        try {
            console.log('value of options in getTrainee', options);
            const response = await this.get('/', {...options});
            const { record, count } = response.data;
            console.log('value of response in same', response, record);
            return { count, record };
        } catch(error) {
            console.log('Error: ', error);
        }
    }
    
    async updateOrder(payload) {
        const { dataToUpdate } = payload;
        const response = await this.put('/', {...dataToUpdate});
        const { data: { id} } = response;
        return id;
    }
}
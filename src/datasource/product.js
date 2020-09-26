import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class ProductAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/product`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    async createProduct(payload) {
        try{
            console.log('value of createProduct', payload);
            const response = await this.post('/', {...payload});
            const { message } = response;
            return message;
        } catch(error){
            console.log('Error: ', error);
        }

    }
    
    async deleteProduct(ID) {
        const { id } = ID;
        console.log('value inside delete Product', id, ID);
        const response = await this.delete(`/${id}`);
        const { message } = response;
        return message;
    }
    
    async getProduct(options) {
        try {
            console.log('inside getProduct', options);
            const response = await this.get('/', {...options});
            console.log('value of response', response);
            const { count, records } = response.data;
            return { count, records };
        } catch(error) {
            console.log('Error: ', error);
        }

    }
    
    async updateProduct(payload) {
        const { id, dataToUpdate } = payload;
        console.log('inside update product', id, dataToUpdate);
        const response = await this.put('/', payload);
        console.log('value of response', response);
        const { message } = response;
        return message;
    }
}
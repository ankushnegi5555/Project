import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configuration';

export default class OwnerAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/owner`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    async createUser(payload) {
        try{
            console.log('inside createuser', payload);
            const response = await this.post('/', {...payload});
            console.log('value of response', response);
            const { message } = response;
            return message;
        } catch(error){
            console.log('Error: ', error);
        }

    }
    
    async deleteUser(ID) {
        const { id } = ID;
        const response = await this.delete(`/${id}`);
        console.log('value of response', response);
        const { message } = response;
        return message;
    }
    
    async getUser(options) {
        try {
            const response = await this.get('/', options);
            const { data } = response;
            const { count, records } = data;
            return { count, records };
        } catch(error) {
            console.log('Error: ', error);
        }
    }
    
    async updateUser(payload) {
        console.log('value of payload inside updateUser', payload);
        const response = await this.put('/', {...payload});
        console.log('value of response', response);
        const { message } = response;
        return message;
    }
}
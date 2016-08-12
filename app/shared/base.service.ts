
export class BaseService {

    protected _handleError(error){
        return Promise.reject(error.message);
    }
}
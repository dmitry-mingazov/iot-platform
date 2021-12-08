import HttpService from './HttpService';

class NodeRedService {
    static baseUrl = `${process.env.REACT_APP_MANAGER_URL}/`;
    static async getInstance() {
        return HttpService.get(NodeRedService.baseUrl);
    }
}
export default NodeRedService;
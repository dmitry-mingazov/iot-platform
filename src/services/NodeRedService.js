import HttpService from './HttpService';

class NodeRedService {
    static baseUrl = `${process.env.REACT_APP_MANAGER_URL}/`;
    static async getInstance() {
        return HttpService.get(NodeRedService.baseUrl);
    }

    static async createFlow(nodeRedUrl, flow) {
        return HttpService.post(`${nodeRedUrl}/flow`, flow);
    }

    static async getFlows(nodeRedUrl) {
        return HttpService.get(`${nodeRedUrl}/flows`);
    }

    static async postFlows(nodeRedUrl, flows) {
        return HttpService.post(`${nodeRedUrl}/flows`, flows);
    }
}
export default NodeRedService;
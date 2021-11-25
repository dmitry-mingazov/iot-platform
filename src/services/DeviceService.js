import HttpService from './HttpService';

class DeviceService {
    static baseUrl = `${process.env.REACT_APP_API_URL}/devices`;
    static async createDevice(device) {
        return HttpService.post(DeviceService.baseUrl, device);
    }
    static async getDevices() {
        return HttpService.get(DeviceService.baseUrl);
    }
}
export default DeviceService;
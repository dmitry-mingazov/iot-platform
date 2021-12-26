import HttpService from './HttpService';

class DeviceService {
    static baseUrl = `${process.env.REACT_APP_API_URL}/device`;
    static devicesUrl = `${DeviceService.baseUrl}s`;

    static async createDevice(device) {
        return HttpService.post(DeviceService.baseUrl, device);
    }
    static async createDevices(devices) {
        return HttpService.post(DeviceService.devicesUrl, devices);
    }
    static async getDevices() {
        return HttpService.get(DeviceService.devicesUrl);
    }
    static async getDevice(id) {
        return HttpService.get(`${DeviceService.baseUrl}/${id}`);
    }
}
export default DeviceService;
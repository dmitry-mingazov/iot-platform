import HttpService from "./HttpService";

class FileService {
    static baseUrlDevices = `${process.env.REACT_APP_API_URL}/devices`;
    static baseUrlDevice = `${process.env.REACT_APP_API_URL}/device`;

    static async getDevicesFile(filename, devices) {
        const ids = [];
        ids.push(...devices.map(device => device._id));
        const params = {ids: ids.join()};
        return HttpService.getWithParams(`${FileService.baseUrlDevices}`, params)
            .then(devices => {
                const _devices = [...devices];
                // we want to remove _id from devices before exporting them
                _devices.forEach(device => {
                    delete device._id;
                })
                const json = JSON.stringify(_devices, null, 2);
                const blob = new Blob([json], {type: 'application/json'});
                FileService.downloadBlob(blob, filename);
            });
    }

    static async getDevicesTurtleFile(filename, devices) {
        // only one device is handled
        const device = devices[0];
        return HttpService.get(`${FileService.baseUrlDevice}/turtle/${device._id}`)
            .then(ttl => {
                const blob = new Blob([ttl], {type: 'text/plain'})
                FileService.downloadBlob(blob, filename);
            })
    }
    
    static downloadBlob(blob, filename) {
        const href = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = href
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
}

export default FileService;
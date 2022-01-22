import HttpService from "./HttpService";

class FileService {
    static baseUrl = `${process.env.REACT_APP_API_URL}/devices`;

    static async getDevicesFile(filename, devices) {
        const ids = [];
        ids.push(...devices.map(device => device._id));
        const params = {ids: ids.join()};
        return HttpService.getWithParams(`${FileService.baseUrl}`, params)
            .then(devices => {
                const json = JSON.stringify(devices, null, 2);
                const blob = new Blob([json], {type: 'application/json'});
                const href = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = href;
                anchor.download = filename;
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            });
    }
}

export default FileService;
export class CreateDeviceDto {
  name: string;
  devtype: string;
  services: [
    {
      endpoint: string;
      interfaceType: string;
      metadata: {
        metadataType: string;
        value: string;
      };
    },
  ];
}

export class CreateDeviceDto {
  name: string;
  devtype: string;
  userId: string;
  services: [
    {
      endpoint: string;
      interfaceType: string;
      metadata: [
        {
          metadataType: string;
          value: string;
        }
      ];
    },
  ];
}

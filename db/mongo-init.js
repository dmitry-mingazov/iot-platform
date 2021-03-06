print("################################");
print("SETTING UP DATABASES AND SCHEMAS");
print("################################");
db = db.getSiblingDB('devices');
db.createCollection("devices", {
   validator: {
      $jsonSchema: {
         bsonType: ["object"],
         required: [ "name", "devtype", "services" ],
         properties: {
            _id: {bsonType: "objectId"},
            name: {
               bsonType: ["string"],
               description: "Device name"
            },
            devtype: {
               enum: [ "ActuatingDevice", "SensingDevice", "TagDevice"],
               description: "Type of device"
            },
	    services: {
          bsonType: ["array"],
	       uniqueItems: true,
	       additionalItems: false,
	       minItems: 1,	
	       items: {
	       	  bsonType: ["object"],
               	  required: [ "interfaceType", "metadata" ],
               	  properties: {
                  endpoint: {
                     bsonType: ["string"],
                     description: "Endpoint URL"
                  },
                  interfaceType: {
                     bsonType: ["string"],
                     description: "Interface Type"
                  },
		  metadata: {
		     bsonType: ["array"],
           uniqueItems: true,
           additionalItems: false,
           items: {
              bsonType: ["object"],
               required: [ "metadataType", "value"],
               properties: {
                  metadataType: {
                     bsonType: ["string"]
                  },
                  value: {
                     bsonType: ["string"]
                  }
               }
           }
		  }
	       }
               }
            }
         }
      }
   }
});
db = db.getSiblingDB('devicesTest');
db.createCollection("devices", {
   validator: {
      $jsonSchema: {
         bsonType: ["object"],
         required: [ "name", "devtype", "services" ],
         properties: {
            _id: {bsonType: "objectId"},
            name: {
               bsonType: ["string"],
               description: "Device name"
            },
            devtype: {
               enum: [ "ActuatingDevice", "SensingDevice", "TagDevice"],
               description: "Type of device"
            },
	    services: {
          bsonType: ["array"],
	       uniqueItems: true,
	       additionalItems: false,
	       minItems: 1,	
	       items: {
	       	  bsonType: ["object"],
               	  required: [ "interfaceType", "metadata" ],
               	  properties: {
                  endpoint: {
                     bsonType: ["string"],
                     description: "Endpoint URL"
                  },
                  interfaceType: {
                     bsonType: ["string"],
                     description: "Interface Type"
                  },
                  metadata: {
                     bsonType: ["array"],
                     uniqueItems: true,
                     additionalItems: false,
                     items: {
                        bsonType: ["object"],
                         required: [ "metadataType", "value"],
                         properties: {
                            metadataType: {
                               bsonType: ["string"]
                            },
                            value: {
                               bsonType: ["string"]
                            }
                         }
                     }
                  }
               }
            }
         }
      }
   }
}});

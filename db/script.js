db.createCollection("devices", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "devtype", "services" ],
         properties: {
            name: {
               bsonType: "string",
               description: "Device name"
            },
            devtype: {
               enum: [ "ActuatingDevice", "SensingDevice", "TagDevice"],
               description: "Type of device"
            },
	    services: {
               bsonType: "array",
	       minItems: 1,
	       items: {
	       	  bsonType: "object",
               	  required: [ "endpoint", "interfaceType", "metadata" ],
               	  properties: {
                  endpoint: {
                     bsonType: "string",
                     description: "Endpoint URL"
                  },
                  interfaceType: {
                     bsonType: "string",
                     description: "Interface Type"
                  },
		  metadata: {
		     bsonType: "object",
		     required: [ "metadataType", "value" ],
		     properties: {
			metadataType: {
			   bsonType: "string"
			},
			value: {
			   bsonType: "string"
			}
		     }
		  }
	       }
               }
            }
         }
      }
   }
})


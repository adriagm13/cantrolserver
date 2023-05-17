require('./config/variables');
const routes = require('./routes/routes');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.static("public")); //Procedure to set public folder contain process files (css,image,.js,..)

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/cantrol-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Policy CORS
app.use(cors());

// Add middleware to parse JSON bodies
app.use(bodyParser.json({
    extended: true
}));

// Add router middleware
app.use(routes);

// Start server

var server = require("http").Server(app); 
/*server.listen(8080, () => { 
  console.log('listening on *:80');
});*/
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  //imprimirTTN();
});

/*function imprimirTTN() {
  let index = 0;

  array = [{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 255.96875,
        acceleration_y: 0,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.212796590087756,
        longitude:  -8.773815716301026,
        micromean: 200,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: '2023-05-02T14:02:12.336189938Z',
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 255.96875,
        acceleration_y: 0,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21316808137816, 
        longitude: -8.774242187490247,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 139.96875,
        acceleration_y: 134,
        acceleration_z: 0.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.213978600245525,
        longitude:   -8.774338747004785,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 223.96875,
        acceleration_y: 95,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21384152793255,
        longitude:  -8.773979331033999 ,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 200.96875,
        acceleration_y: 200,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21339455093233,
        longitude:  -8.774156356810655,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 32.96875,
        acceleration_y: 192,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21344421519969,
        longitude:  -8.773652101568056,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 0.96875,
        acceleration_y: 22,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21369054938852,
        longitude:  -8.773582364140887,
        micromean: 0,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 255.96875,
        acceleration_y: 10,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21371836125269,
        longitude:  -8.773692334699115,
        micromean: 500,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  },{
    end_device_ids: {
      device_id: 'cantrol-3',
      application_ids: { application_id: 'cantrol-sp' },
      dev_eui: '70B3D57ED005CB2B',
      dev_addr: '260BD019'
    },
    correlation_ids: [
      'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
      'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
      'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
      'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
      'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
      'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
      'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
    ],
    received_at: new Date(),
    uplink_message: {
      f_port: 10,
      f_cnt: 146,
      frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
      decoded_payload: {
        acceleration_x: 10.96875,
        acceleration_y: 83,
        acceleration_z: 1.10546875,
        altitude: 446,
        hdop: 1,
        latitude: 42.21357532867785,
        longitude:  -8.775481367926844,
        micromean: 0,
        sats: 8
      },
      rx_metadata: [ [Object], [Object] ],
      settings: {
        data_rate: [Object],
        frequency: '868300000',
        timestamp: 426258288,
        time: '2023-05-02T14:02:20.940Z'
      },
      received_at: '2023-05-02T14:02:12.124406955Z',
      consumed_airtime: '0.082176s',
      locations: { 'frm-payload': [Object] },
      network_ids: {
        net_id: '000013',
        tenant_id: 'ttn',
        cluster_id: 'eu1',
        cluster_address: 'eu1.cloud.thethings.network'
      }
    }
  }]
  setInterval(() => {
    console.log(array[index]);

    saveDataCollar(array[index]);

    index = (index + 1) % array.length;
  }, 40000);
}
*/
// MQTT setup
var mqtt = require('mqtt');
const { saveDataCollar } = require('./controllers/datacollarController');
const { deleteAllDataCollars } = require('./controllers/datacollarController');
const { calculateNorms } = require('./controllers/datacollarController');
const { getAccelerometerData } = require('./controllers/datacollarController');


var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'cantrol-sp@ttn',
    password: 'NNSXS.DAPHN36QWEWM5ACXX3REYKVDDWSV3FLGU7AJW7Y.TWKBPR7K7GAOEPZIDE7GGQWLGUNHZUFGPMUX3I5BP4C255K2CEHQ',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('https://eu1.cloud.thethings.network',options);

// Global variable to save data
var globalMQTT = 0;


// MQTT setup
client.on('connect', function() {
  console.log('Client connected to TTN')
  client.subscribe('#')
});

client.on('error', function(err) {
  console.log(err);
});

client.on('message', function(topic, message) {
  var getDataFromTTN = JSON.parse(message);
  //console.log(getDataFromTTN);
  //console.log(message);
  /*var getDataFromTTN = {
  end_device_ids: {
    device_id: 'cantrol-3',
    application_ids: { application_id: 'cantrol-sp' },
    dev_eui: '70B3D57ED005CB2B',
    dev_addr: '260BD019'
  },
  correlation_ids: [
    'as:up:01GZECAMZG0FX7HEE29TV5T5Y3',
    'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
    'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
    'gs:uplink:01GZECAMRV559X5TFVGGDJ3WRA',
    'ns:uplink:01GZECAMRWJAM817F97RG72JZV',
    'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZECAMRWAD1QKBZ39DCSCS6H',
    'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZECAMZFPRV5XYZ8ET1HDEEV'
  ],
  received_at: '2023-05-02T14:02:12.336189938Z',
  uplink_message: {
    f_port: 10,
    f_cnt: 146,
    frm_payload: 'u/lYedKRAb4KCP/4AAABGwAAAAAAAAAA',
    decoded_payload: {
      acceleration_x: 255.96875,
      acceleration_y: 0,
      acceleration_z: 1.10546875,
      altitude: 446,
      hdop: 1,
      latitude: 42.16922594125424,
      longitude: -8.687063973371039,
      micromean: 500,
      sats: 8
    },
    rx_metadata: [ [Object], [Object] ],
    settings: {
      data_rate: [Object],
      frequency: '868300000',
      timestamp: 426258288,
      time: '2023-05-02T14:02:20.940Z'
    },
    received_at: '2023-05-02T14:02:12.124406955Z',
    consumed_airtime: '0.082176s',
    locations: { 'frm-payload': [Object] },
    network_ids: {
      net_id: '000013',
      tenant_id: 'ttn',
      cluster_id: 'eu1',
      cluster_address: 'eu1.cloud.thethings.network'
    }
  }
}*/
/*var getDataFromTTN = {
	end_device_ids: {
	  device_id: 'cantrol-3',
	  application_ids: { application_id: 'cantrol-sp' },
	  dev_eui: '70B3D57ED005CB2B',
	  dev_addr: '260BD019'
	},
	correlation_ids: [
	  'as:up:01GZED0ZSAE5XGNBK994N6TQCT',
	  'as:up:01GZED0ZSFC3VATMTQSQERYS5S',
	  'gs:conn:01GXT9XCYZ75DYPEWKE5TAFXXY',
	  'gs:up:host:01GXT9XCZ6WTCRC249ZPJ00YVE',
	  'gs:uplink:01GZED0ZJQTPQP6BAHHWA68XAS',
	  'ns:uplink:01GZED0ZJR53DCXN53H4N6NVGB',
	  'rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01GZED0ZJRE2DJTHC8R899EQ5B',
	  'rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01GZED0ZS9CKA485E8FVM7H92R'
	],
	received_at: '2023-05-02T14:14:24.297943271Z',
	location_solved: {
	  service: 'frm-payload',
	  location: {
		latitude: 42.16915083939736,
		longitude: -8.687149804064632,
		altitude: 456,
		source: 'SOURCE_GPS'
	  }
	}
  }*/
  //console.log(getDataFromTTN);
 //deleteAllDataCollars();
 if(getDataFromTTN.uplink_message && getDataFromTTN.uplink_message.decoded_payload){

	saveDataCollar(getDataFromTTN);
 } else{
	console.log("ME SOBRA")
 }
});



// Setup load ejs file to display on Browsers
app.get('/',function(req,res){
 console.log("good get");
 res.writeHead(200, {'Content-Type': 'text/plain'}); 
 res.end('Hello World\n');
});


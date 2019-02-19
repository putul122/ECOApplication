const relationshipData = {
    'resources': [
      {
          'constraint_type': 'Outgoing',
          'component': 11,
          'component_name': 'IVR',
          'target_component': 234,
          'target_component_name': 'Server ABC',
          'target_component_type_name': 'Server',
          'target_component_type': 456,
          'connection_type': 123,
          'connection_type_name': 'Is Hosted At',
          'name': 'Is Hosted At',
          'description': null,
          'id': 8,
          'type': 'Connection',
          'icon_id': 56,

                '_links': [
                  {
                    'rel': 'self',
                    'action_key': 'GetConnection',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/model/models/1/connections/8'
                  },
                  {
                    'rel': 'component',
                    'action_key': 'GetComponent',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/model/models/1/components/11'
                  },
                  {
                    'rel': 'target_component',
                    'action_key': 'GetComponent',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/model/models/1/components/234'
                  }
                ]
          },

              {
          'constraint_type': 'Outgoing',
          'component': 11,
          'component_name': 'IVR',
          'target_component': 235,
          'target_component_name': 'Server DEF',
          'target_component_type_name': 'Server',
          'target_component_type': 456,
          'connection_type': 123,
          'connection_type_name': 'Is Hosted At',
          'name': 'Is Hosted At',
          'description': null,
          'id': 9,
          'type': 'Connection'

      },
      {
          'constraint_type': 'Incoming',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 236,
          'related_component_name': 'Process ABC',
          'target_component_type_name': 'Process',
          'target_component_type': 457,
          'connection_type': 123,
          'connection_type_name': 'Uses',
          'name': 'Uses',
          'description': null,
          'id': 10,
          'type': 'Connection'
      },

      {
          'constraint_type': 'Incoming',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 237,
          'related_component_name': 'Process 2',
          'target_component_type_name': 'Process',
          'target_component_type': 457,
          'connection_type': 123,
          'connection_type_name': 'Uses',
          'name': 'Uses',
          'description': null,
          'id': 11,
          'type': 'Connection'
      },

          {
          'constraint_type': 'Incoming',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 238,
          'related_component_name': 'Vendor ABC',
          'target_component_type_name': 'Vendor',
          'target_component_type': 458,
          'connection_type': 123,
          'connection_type_name': 'Supports',
          'name': 'Supports',
          'description': null,
          'id': 12,
          'type': 'Connection'
      },

      {
          'constraint_type': 'Incoming',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 235,
          'related_component_name': 'Vendor DEF',
          'target_component_type_name': 'Vendor',
          'target_component_type': 458,
          'connection_type': 123,
          'connection_type_name': 'Supports',
          'name': 'Supports',
          'description': null,
          'id': 13,
          'type': 'Connection'
      },
      {
          'constraint_type': 'Parent',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 234,
          'related_component_name': 'Australia BU'
      },

      {
          'constraint_type': 'Child',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 787,
          'related_component_name': 'IVR Module 1'
      },
      {
          'constraint_type': 'Child',
          'component': 11,
          'component_name': 'IVR',
          'related_component': 789,
          'related_component_name': 'IVR Module 2'
      }
    ],
    'result_code': 0,
    'err_code': null,
    'err_msg': null,
    'count': 4,
    'total_count': 832,
    '_links': []
  }

export default relationshipData

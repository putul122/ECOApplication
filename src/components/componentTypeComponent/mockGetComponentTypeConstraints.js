const ComponentTypeConstraintsData = {
	'resources': [{
			'constraint_type': 'Parent',
			'enforced': true,
			'component_type': {
				'icon': 0,
				'id': 13,
				'name': 'Application',
				'description': 'Application 557'
			},
			'connection_type': {
				'icon': 0,
				'id': 10,
				'name': 'Parent',
				'description': 'Application 557 Parent connection'
			},
			'target_component_type': {
				'icon': 0,
				'id': 0,
				'name': 'Application',
				'description': 'Application Parent'
			},
			'min': 0,
			'max': 1,
			'icon': 0,
			'is_deleted': false,
			'id': 0,
			'name': 'Parent',
			'description': 'This is the description of Parent'
		},
		{
			'constraint_type': 'Child',
			'enforced': true,
			'component_type': {
				'icon': 0,
				'id': 13,
				'name': 'Application',
				'description': 'Application 557'
			},
			'connection_type': {
				'icon': 0,
				'id': 11,
				'name': 'Child',
				'description': 'Application 557 Child Connection'
			},
			'target_component_type': {
				'icon': 0,
				'id': 0,
				'name': 'Module',
				'description': 'Module 887'
			},
			'min': 0,
			'max': 0,
			'icon': 0,
			'is_deleted': false,
			'id': 0,
			'name': 'string',
			'description': 'string'
		},
		{
			'constraint_type': 'ConnectTo',
			'enforced': true,
			'component_type': {
				'icon': 0,
				'id': 13,
				'name': 'Application',
				'description': 'Application 557'
			},
			'connection_type': {
				'icon': 0,
				'id': 25,
				'name': 'is hosted at',
				'description': 'is hosted at'
			},
			'target_component_type': {
				'icon': 0,
				'id': 35,
				'name': 'Server',
				'description': 'Server hosting'
			},
			'min': 0,
			'max': 0,
			'icon': 0,
			'is_deleted': false,
			'id': 0,
			'name': 'ConnectTo',
			'description': 'Some Description'
		},
		{
			'constraint_type': 'ConnectFrom',
			'enforced': true,
			'component_type': {
				'icon': 0,
				'id': 13,
				'name': 'Application',
				'description': 'Application 557'
			},
			'connection_type': {
				'icon': 0,
				'id': 233,
				'name': 'supports',
				'description': 'supports something'
			},
			'target_component_type': {
				'icon': 0,
				'id': 56,
				'name': 'Vendor',
				'description': 'Vendors'
			},

			'min': 0,
			'max': 0,
			'icon': 0,
			'is_deleted': false,
			'id': 0,
			'name': 'ConnectFrom',
			'description': 'Some Description'
		}
	],
	'count': 4,
	'result_code': 0,
	'error_code': null,
	'error_message': null,
	'links': [{
		'rel': 'self',
		'action_key': 'GetComponentConstraints',
		'href': 'https://localhost:46000/component_types/46/components'
	}]
}

export default ComponentTypeConstraintsData

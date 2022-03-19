/**
 * Our API Schemas
 */

export default {
  'User': {
    properties: {
      id: {type: 'number'},
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      user_meta: {$ref: '#/components/schemas/UserMeta'},
      role: {$ref: '#/components/schemas/Role'},
      interests: {$ref: '#/components/schemas/Interest'},
    }
  },
  'UserInput': {
    properties: {
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      user_meta: {$ref: '#/components/schemas/UserMeta'},
      role: {$ref: '#/components/schemas/Role'},
      interests: {$ref: '#/components/schemas/Interest'},
    },
    example: {
      firstName: 'Michiel',
      lastName: 'Lovelace',
      user_meta: {
        address: 'Kilianstraat',
        zipCode: '9030',
        city: 'Gent'
      },
      roles: [{
        name: 'admin'
      }],
      interests: [{
        name: 'michiel'
      }]
    }
  },
  'UserMeta': {
    properties: {
      id: {type: 'number'},
      address: {type: 'string'},
      zipCode: {type: 'string'},
      city: {type: 'string'},
    }
  },
  'Role': {
    properties: {
      id: {type: 'number'},
      name: {type: 'string'},
      user: {$ref: '#/components/schemas/User'},
    }
  },
  'RoleInput': {
    properties: {
      name: {type: 'string'},
      user: {$ref: '#/components/schemas/User'},
    }
  },
  'Interest': {
    properties: {
      id: {type: 'number'},
      name: {type: 'string'},
    }
  },
  'InterestInput': {
    properties: {
      name: {type: 'string'},
    }
  },
  'NavigationItem': {
    properties: {
      id: {type: 'number'},
      url: {type: 'string'},
      text: {type: 'string'},
    }
  }
};
export default {
  superadmin: {
    AuthService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    },
    UsersService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    },
    LlmService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    }
  },
  admin: {
    AuthService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    },
    UsersService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    },
    LlmService: {
      'read:any': ['*'],
      'update:any': ['*'],
      'create:any': ['*'],
      'delete:any': ['!*']
    }
  },
  client: {
    AuthService: {
      'read:own': ['*'],
      'update:own': ['*'],
      'create:own': ['*'],
      'delete:own': ['*']
    },
    UsersService: {
      'read:own': ['*'],
      'update:own': ['!*'],
      'create:own': ['!*'],
      'delete:own': ['!*']
    },
    LlmService: {
      'read:own': ['*'],
      'update:own': ['!*'],
      'create:own': ['!*'],
      'delete:own': ['!*']
    }
  }
}

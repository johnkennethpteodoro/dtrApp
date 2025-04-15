
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.3.1
 * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
 */
Prisma.prismaVersion = {
  client: "5.3.1",
  engine: "61e140623197a131c2a6189271ffee05a7aa9a59"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  employee_id: 'employee_id',
  full_name: 'full_name',
  position: 'position',
  department: 'department',
  employment_status: 'employment_status',
  shift_schedule: 'shift_schedule',
  immediate_supervisor: 'immediate_supervisor',
  company_email: 'company_email',
  contact_number: 'contact_number',
  employee_since: 'employee_since',
  address: 'address',
  role: 'role',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.LeaveRequestScalarFieldEnum = {
  id: 'id',
  status: 'status',
  leave_type: 'leave_type',
  start_date: 'start_date',
  end_date: 'end_date',
  reason: 'reason',
  created_at: 'created_at',
  updated_at: 'updated_at',
  comments: 'comments',
  total_days: 'total_days',
  employee_name: 'employee_name',
  user_id: 'user_id',
  approved_by_id: 'approved_by_id'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  HR: 'HR',
  ADMIN: 'ADMIN'
};

exports.Status = exports.$Enums.Status = {
  OPEN: 'OPEN',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.LeaveType = exports.$Enums.LeaveType = {
  VACATION: 'VACATION',
  SICK: 'SICK',
  UNPAID: 'UNPAID',
  EMERGENCY: 'EMERGENCY'
};

exports.Prisma.ModelName = {
  User: 'User',
  LeaveRequest: 'LeaveRequest'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/johnkennethteodoro/Documents/GitHub/dtrApp/app/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.3.1",
  "engineVersion": "61e140623197a131c2a6189271ffee05a7aa9a59",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwKLy8gbGVhcm4gbW9yZSBhYm91dCBpdCBpbiB0aGUgZG9jczogaHR0cHM6Ly9wcmlzLmx5L2QvcHJpc21hLXNjaGVtYQoKLy8gTG9va2luZyBmb3Igd2F5cyB0byBzcGVlZCB1cCB5b3VyIHF1ZXJpZXMsIG9yIHNjYWxlIGVhc2lseSB3aXRoIHlvdXIgc2VydmVybGVzcyBvciBlZGdlIGZ1bmN0aW9ucz8KLy8gVHJ5IFByaXNtYSBBY2NlbGVyYXRlOiBodHRwczovL3ByaXMubHkvY2xpL2FjY2VsZXJhdGUtaW5pdAoKZ2VuZXJhdG9yIGNsaWVudCB7CiAgICBwcm92aWRlciA9ICJwcmlzbWEtY2xpZW50LWpzIgogICAgb3V0cHV0ICAgPSAiLi4vYXBwL2dlbmVyYXRlZC9wcmlzbWEiCn0KCmRhdGFzb3VyY2UgZGIgewogICAgcHJvdmlkZXIgPSAibXlzcWwiIC8vcG9zdGdyZXNxbAogICAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCm1vZGVsIFVzZXIgewogICAgaWQgICAgICAgICAgICAgICAgICAgSW50ICAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIGVtcGxveWVlX2lkICAgICAgICAgIFN0cmluZyAgIEB1bmlxdWUgQGRiLlZhckNoYXIoMjApCiAgICBmdWxsX25hbWUgICAgICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigxMDApCiAgICBwb3NpdGlvbiAgICAgICAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcig1MCkKICAgIGRlcGFydG1lbnQgICAgICAgICAgIFN0cmluZyAgIEBkYi5WYXJDaGFyKDUwKQogICAgZW1wbG95bWVudF9zdGF0dXMgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjApCiAgICBzaGlmdF9zY2hlZHVsZSAgICAgICBTdHJpbmcgICBAZGIuVmFyQ2hhcigyMCkKICAgIGltbWVkaWF0ZV9zdXBlcnZpc29yIFN0cmluZyAgIEBkYi5WYXJDaGFyKDEwMCkKICAgIGNvbXBhbnlfZW1haWwgICAgICAgIFN0cmluZyAgIEB1bmlxdWUgQGRiLlZhckNoYXIoMTAwKQogICAgY29udGFjdF9udW1iZXIgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjApCiAgICBlbXBsb3llZV9zaW5jZSAgICAgICBEYXRlVGltZQogICAgYWRkcmVzcyAgICAgICAgICAgICAgU3RyaW5nICAgQGRiLlZhckNoYXIoMjAwKQogICAgcm9sZSAgICAgICAgICAgICAgICAgUm9sZSAgICAgQGRlZmF1bHQoRU1QTE9ZRUUpCgogICAgLy8gUmVsYXRpb25zIChrZXB0IGFzIFBhc2NhbENhc2UgaW4gUHJpc21hKQogICAgYXBwcm92ZWRfcmVxdWVzdHMgTGVhdmVSZXF1ZXN0W10gQHJlbGF0aW9uKCJhcHByb3ZlZF9yZXF1ZXN0cyIpCgogICAgY3JlYXRlZF9hdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICAgIHVwZGF0ZWRfYXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAp9Cgptb2RlbCBMZWF2ZVJlcXVlc3QgewogICAgaWQgICAgICAgICAgICBJbnQgICAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICAgIHN0YXR1cyAgICAgICAgU3RhdHVzICAgIEBkZWZhdWx0KE9QRU4pCiAgICBsZWF2ZV90eXBlICAgIExlYXZlVHlwZQogICAgc3RhcnRfZGF0ZSAgICBTdHJpbmcgICAgQGRiLlZhckNoYXIoNTAwKQogICAgZW5kX2RhdGUgICAgICBTdHJpbmcgICAgQGRiLlZhckNoYXIoNTAwKQogICAgcmVhc29uICAgICAgICBTdHJpbmcgICAgQGRiLlZhckNoYXIoNTAwKQogICAgY3JlYXRlZF9hdCAgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpCiAgICB1cGRhdGVkX2F0ICAgIERhdGVUaW1lICBAdXBkYXRlZEF0CiAgICBjb21tZW50cyAgICAgIFN0cmluZz8gICBAZGIuVmFyQ2hhcigxMDAwKQogICAgdG90YWxfZGF5cyAgICBJbnQKICAgIGVtcGxveWVlX25hbWUgU3RyaW5nICAgIEBkYi5WYXJDaGFyKDUwMCkKICAgIHVzZXJfaWQgICAgICAgSW50CgogICAgYXBwcm92ZWRfYnkgICAgVXNlcj8gQHJlbGF0aW9uKG5hbWU6ICJhcHByb3ZlZF9yZXF1ZXN0cyIsIGZpZWxkczogW2FwcHJvdmVkX2J5X2lkXSwgcmVmZXJlbmNlczogW2lkXSkKICAgIGFwcHJvdmVkX2J5X2lkIEludD8KfQoKZW51bSBTdGF0dXMgewogICAgT1BFTgogICAgQVBQUk9WRUQKICAgIFJFSkVDVEVECiAgICBDQU5DRUxMRUQKfQoKZW51bSBMZWF2ZVR5cGUgewogICAgVkFDQVRJT04KICAgIFNJQ0sKICAgIFVOUEFJRAogICAgRU1FUkdFTkNZCn0KCmVudW0gUm9sZSB7CiAgICBFTVBMT1lFRQogICAgTUFOQUdFUgogICAgSFIKICAgIEFETUlOCn0K",
  "inlineSchemaHash": "1e67cb49a2ef677fd6c209bcb30fc2493650cabd5068cfae48b44d3edb41f850"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employment_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shift_schedule\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"immediate_supervisor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"company_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contact_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee_since\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":\"EMPLOYEE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approved_requests\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LeaveRequest\",\"relationName\":\"approved_requests\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LeaveRequest\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Status\",\"default\":\"OPEN\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"leave_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LeaveType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"comments\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"employee_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approved_by\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"approved_requests\",\"relationFromFields\":[\"approved_by_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approved_by_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Status\":{\"values\":[{\"name\":\"OPEN\",\"dbName\":null},{\"name\":\"APPROVED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null}],\"dbName\":null},\"LeaveType\":{\"values\":[{\"name\":\"VACATION\",\"dbName\":null},{\"name\":\"SICK\",\"dbName\":null},{\"name\":\"UNPAID\",\"dbName\":null},{\"name\":\"EMERGENCY\",\"dbName\":null}],\"dbName\":null},\"Role\":{\"values\":[{\"name\":\"EMPLOYEE\",\"dbName\":null},{\"name\":\"MANAGER\",\"dbName\":null},{\"name\":\"HR\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)


config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


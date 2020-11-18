print('Start #################################################################');

const database = 'nab_icommerce'
const user = 'nab_icommerce'
const pwd = 'SrHbgm2PbLDnXBNN'

db = db.getSiblingDB(database)
db.createUser(
  {
    user,
    pwd,
    roles: [{ role: 'readWrite', db: database }],
  },
);
db.createCollection('products')

print('END #################################################################');
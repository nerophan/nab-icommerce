import * as Sequelize from 'sequelize'
const DataTypes = Sequelize.DataTypes

import connector from '../connector'

class WishlistItemModel extends Sequelize.Model {
  id?: number;
  wishlist: string;
  name: string;
}

WishlistItemModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER(),
    allowNull: false,
    primaryKey: true
  },
  wishlist: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize: connector,
  tableName: 'wishlist_items'
})

export default WishlistItemModel

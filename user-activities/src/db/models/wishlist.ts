import * as Sequelize from 'sequelize'
const DataTypes = Sequelize.DataTypes

import connector from '../connector'
import WishListItemModel from './wishlist_item'

class WishlistModel extends Sequelize.Model {
  id?: number;
  user: string;
  title: string;
  fullname: string;
}

WishlistModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER(),
    allowNull: false,
    primaryKey: true
  },
  user: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize: connector,
  tableName: 'wishlists'
})

WishlistModel.hasMany(WishListItemModel, { as: 'items', foreignKey: 'wishlist' })
WishListItemModel.belongsTo(WishlistModel, { foreignKey: 'wishlist' })

export default WishlistModel

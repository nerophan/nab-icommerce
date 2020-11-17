import * as Sequelize from 'sequelize'
const DataTypes = Sequelize.DataTypes

import connector from '../connector'

class ProductModel extends Sequelize.Model {
  id?: number;
  user: string;
  title: string;
  fullname: string;
}

ProductModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER(),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
}, {
  sequelize: connector,
  tableName: 'products'
})

export default ProductModel

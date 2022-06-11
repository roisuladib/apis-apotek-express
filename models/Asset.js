module.exports = (sequelize, DataTypes) => {
   const Asset = sequelize.define('Asset', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false
      },
      createdAt: {
         field: 'created_at',
         type: DataTypes.DATE,
         allowNull: false
      },
      updatedAt: {
         field: 'updated_at',
         type: DataTypes.DATE,
         allowNull: false
      },
   }, {
      tableName: 'assets'
   });
   return Asset;
}
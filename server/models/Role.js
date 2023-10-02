module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(4),
      allowNull: false
    }
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: "UserRole"
    });
  }

  return Role;
}
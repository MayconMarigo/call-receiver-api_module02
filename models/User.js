module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
    secret2fa: {
      type: DataTypes.STRING(80),
      defaultValue: "",
      allowNull: false,
    },
    logoImage: {
      type: DataTypes.BLOB("medium"),
    },
    colorScheme: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.UUID,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.UserType, { foreignKey: "userTypeId" });
    User.hasMany(models.Call, { as: "CallsAsCaller", foreignKey: "callerId" });
    User.hasMany(models.Call, {
      as: "CallsAsReceiver",
      foreignKey: "receiverId",
    });
    User.hasMany(models.Agenda, {
      as: "AgendasAsCaller",
      foreignKey: "callerId",
    });
    User.hasMany(models.Agenda, {
      as: "AgendasAsReceiver",
      foreignKey: "receiverId",
    });
  };

  return User;
};

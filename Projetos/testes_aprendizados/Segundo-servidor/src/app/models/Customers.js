import Sequelize, {Model} from "Sequelize";


class Customer extends Model {
    static init (sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            status: Sequelize.ENUM("ACTIVE", "ARCHIVED")
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.hasMany(models.Contact);
    }
}

export default Customer;
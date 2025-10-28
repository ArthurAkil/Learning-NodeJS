import Sequelize, {Model} from Sequelize;

class Contact extends Model {
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
        this.belongsTo(models.Customer, {foreingKey: "customer_id"});
    }
}

export default Contact;
import { SequelizeModule } from "@nestjs/sequelize";

const config:SequelizeModule={

    dialect: "mysql",
    host: "127.0.0.1",
    timezone: "+05:30",
    port: 3306,
    username: "root",
    password: "",
    database: "userauthsystem",
    autoLoadModels: true,
    synchronize: true,
    sync: { alter: true }
     

}
export default config
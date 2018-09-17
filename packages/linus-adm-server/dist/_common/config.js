"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const chalk_1 = require("chalk");
dotenv.config();
const logError = chalk_1.default.bold.red;
class ConfigurationError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ConfigurationError = ConfigurationError;
const parseDatabase = () => {
    const { DB_IMPL = 'sequelize', DB_DIALECT = 'sqlite', DB_OPTIONS = '{storage:"./data/db.sqlite"}', } = process.env;
    const dbImpls = ['sequelize'];
    if (dbImpls.indexOf(DB_IMPL) === -1) {
        const strErr = `Database implementation defined by env var DB_IMPL not supported. Expected one of: ${dbImpls}, found: ${DB_IMPL}`;
        logError(strErr);
        throw new ConfigurationError(strErr);
    }
    const dbDialects = ['mysql', 'sqlite', 'postgres', 'mssql'];
    if (dbDialects.indexOf(DB_DIALECT) === -1) {
        const strErr = `Database dialect defined by env var DB_DIALECT not supported. Expected one of: ${dbDialects}, found: ${DB_DIALECT}`;
        logError(strErr);
        throw new ConfigurationError(strErr);
    }
    let dbOptions;
    try {
        dbOptions = JSON.parse(DB_OPTIONS);
    }
    catch (e) {
        logError(`Error parsing Database Options defined by env var DB_OPTIONS: ${e.message}`);
        throw new ConfigurationError(e);
    }
    const envConfig = {
        implementation: DB_IMPL,
        dialect: DB_DIALECT,
        options: dbOptions,
    };
    return envConfig;
};
const parse = () => ({
    database: parseDatabase(),
});
exports.default = parse();
//# sourceMappingURL=config.js.map
import Ajv, { ValidateFunction } from 'ajv';
import { existsSync } from 'fs';
// import { JSONMetaSchemaType } from '../base/json/meta-schema';

type ConfigurationEntry = {
	validator: ValidateFunction;
	name: string;
};

class _SettingConfigurationManager {
	private settingConfigurations: Record<string, ConfigurationEntry>;
	private ajv: Ajv;

	constructor() {
		this.settingConfigurations = {};
		this.ajv = new Ajv();

		// This is a singleton class
		// During initialization, the initialization process will send configuration info to this class to be stored.
		// The settings menu will use this class to validate user input and warn when user input is not valid
		// validation can be done asyncronously
		// When validation is complete, the most data about validation possible is best

		// To perform validation, this class only needs to store the setting's validation function and name.
		// To create the validation function, the schema must be passed in and processed through ajv.
	}

	public RegisterConfiguration(packagePath: string) {
		if (!existsSync(packagePath) || !packagePath.endsWith('package.json')) {
			// TODO: throw error
		}

		let package: Object = require(packagePath);
		if (!('contributes' in package && 'configuration' in package['contributions'])) {
			return;
		}

		let packageName = package['name'];
		let configurationInfo = package['contributes']['configuration'];
	}

	public AddConfiguration(configName: string, configuration: object) {
		if (configName in this.settingConfigurations) {
			// do something
		}

		let validator = this.ajv.compile(configuration);

		this.settingConfigurations[configName] = {
			validator: validator,
			name: configName
		};
	}

	public RemoveConfiguration(configName: string) {
		if (configName in settingConfigurations)
	}
}

export const SettingConfigurationManager = new _SettingConfigurationManager();

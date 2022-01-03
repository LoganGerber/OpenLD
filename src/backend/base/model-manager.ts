import Model from "./model";

class ModelManager {
	private _registeredModels: Record<string, Model>;

	constructor() {
		this._registeredModels = {};
	}

	public registerModel<T extends Model>(model: T): boolean {
		if (model.id in this._registeredModels) {
			return false;
		}

		this._registeredModels[model.id] = model;
		return true;
	}

	public getModel(id: string): Model | null {
		if (id in this._registeredModels) {
			return this._registeredModels[id];
		}

		return null;
	}
}


export default new ModelManager();

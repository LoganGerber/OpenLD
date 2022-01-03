import { Model } from "./model";

// TODO: Should this eventually contain a factory for creating models?
// Model types / names would get registered on launch from plugins.
// If it's a factory, the managager can leverage a pool of models, to minimize memory allocations.
class ModelManager {
	private _registeredModels: Record<string, Model>;

	constructor() {
		this._registeredModels = {};
	}

	public registerModel(model: Model): void {
		if (!(model.id in this._registeredModels)) {
			this._registeredModels[model.id] = model;
		}
	}

	public isRegisteredModel(model: Model): boolean {
		return model.id in this._registeredModels;
	}

	public removeModel(model: Model | string): void {
		let modelId: string;
		if (typeof model === 'string') {
			modelId = model;
		}
		else {
			modelId = model.id;
		}

		delete this._createdModels[modelId];
	}

}


export default new ModelManager();

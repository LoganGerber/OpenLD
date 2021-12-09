import { validate } from "uuid";
import { EventEmitter } from 'events';

export abstract class SelectionManager {
	private static _selectedModelId: string | undefined = undefined;
	private static _emitter: EventEmitter = new EventEmitter();



	public static get eventEmitter(): EventEmitter {
		return SelectionManager._emitter;
	}

	public static get selectedModelId(): string | undefined {
		return SelectionManager._selectedModelId;
	}


	public static async requestSelection(id: string): Promise<boolean> {
		return new Promise<boolean>(() => {
			if (!validate(id)) {
				return false;
			}
			//TODO: check if the id belongs to a valid model

			SelectionManager._selectedModelId = id;
			return true;
		});
	}
}

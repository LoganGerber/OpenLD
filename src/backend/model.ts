import { v4 } from 'uuid';

export class Model {
	private readonly _uuid: string;


	public get id(): string {
		return this._uuid;
	}


	constructor() {
		this._uuid = v4();
	}
}

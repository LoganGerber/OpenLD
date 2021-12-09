import { v4 as uuidv4 } from 'uuid';

export class Model {
	private readonly id: string;


	public get modelId(): string {
		return this.id;
	}

	constructor() {
		this.id = uuidv4();
	}
}

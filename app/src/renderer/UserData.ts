import Store from "electron-store";

type DataType = {
	game: string;
	ai_path: string;
	piece_set: string;
	color_set: string;
    arrow: string;
};

const schema = {
	game: {
		type: "string",
		default: "chess",
	},
	ai_path: {
		type: "string",
		default: "",
	},
	piece_set: {
		type: "string",
		default: "cburnett",
	},
	color_set: {
		type: "string",
		default: "original",
	},
	arrow: {
		type: "string",
		default: "G",
	},
} as const;

const store = new Store({ schema: schema });

export function setData(key: keyof DataType, data: string) {
	store.set(key, data);
}

export function getData(key: keyof DataType): string {
	return store.get(key).toString();
}

export function resetData(key: keyof DataType) {
	store.reset(key);
}

export function resetAll() {
	store.clear();
}

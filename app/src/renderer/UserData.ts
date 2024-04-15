import Store from "electron-store";

const schema = {
	game: {
		type: "string",
		default: "chess",
	},
	ai_path: {
		type: "string",
		default: "",
	},
} as const;

const store = new Store({ schema: schema });

export function setData(key: "game" | "ai_path", data: string) {
	store.set(key, data);
}

export function getData(key: "game" | "ai_path"): string {
	return store.get(key).toString();
}

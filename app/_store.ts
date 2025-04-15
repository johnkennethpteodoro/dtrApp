import { proxy } from "valtio";

interface Store {
	isFetch: boolean;
}

const store = proxy<Store>({
	isFetch: false,
});

export { store };

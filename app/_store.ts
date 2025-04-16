import { proxy } from "valtio";

interface Store {
	isFetched: boolean;
}

const store = proxy<Store>({
	isFetched: false,
});

export { store };

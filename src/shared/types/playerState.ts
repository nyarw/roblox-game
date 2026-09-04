export interface PlayerState {
	health: number;
	hunger: number;
	stamina: number;
	sanity: number;
	currentArea?: string;
}

export const PLAYER_STATE_KEYS: (keyof PlayerState)[] = [
	"health",
	"hunger",
	"stamina",
	"sanity",
	"currentArea",
];

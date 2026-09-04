import { getPlayerState } from "./playerStateManager";
import { playerStateRemote } from "./remotes";
import { PLAYER_STATE_KEYS, type PlayerState } from "./types";

export function getPlayerStateSnapshot(
	player: Player,
): PlayerState | undefined {
	const board = getPlayerState(player);
	if (!board) return undefined;

	return {
		health: board.Get("health"),
		hunger: board.Get("hunger"),
		stamina: board.Get("stamina"),
		sanity: board.Get("sanity"),
		currentArea: board.Get("currentArea"),
	};
}

export function updatePlayerState(
	player: Player,
	changes: Partial<PlayerState>,
) {
	const board = getPlayerState(player);
	if (!board) return false;

	for (const key of PLAYER_STATE_KEYS) {
		switch (key) {
			case "health":
				if (changes.health !== undefined) board.Set(key, changes.health);
				break;
			case "hunger":
				if (changes.hunger !== undefined) board.Set(key, changes.hunger);
				break;
			case "stamina":
				if (changes.stamina !== undefined) board.Set(key, changes.stamina);
				break;
			case "sanity":
				if (changes.sanity !== undefined) board.Set(key, changes.sanity);
				break;
			case "currentArea":
				if (changes.currentArea !== undefined)
					board.Set(key, changes.currentArea);
				break;
		}
	}

	const state = getPlayerStateSnapshot(player);
	if (!state) return false;
	playerStateRemote.FireClient(player, state);

	return true;
}

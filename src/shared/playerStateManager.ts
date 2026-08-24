import { Blackboard } from "@rbxts/state-management";

import type { PlayerState } from "./types";

const DEFAULT_PLAYER_STATE: PlayerState = {
	health: 100,
	sanity: 100,
	stamina: 100,
	hunger: 100,
};

const playerStates = new Map<Player, Blackboard<PlayerState>>();

export function createPlayerState(player: Player, initialData?: PlayerState) {
	const blackboard = new Blackboard<PlayerState>(
		initialData ?? DEFAULT_PLAYER_STATE,
	);
	playerStates.set(player, blackboard);
}

export function removePlayerState(player: Player) {
	playerStates.delete(player);
}

export function getPlayerState(player: Player) {
	return playerStates.get(player);
}

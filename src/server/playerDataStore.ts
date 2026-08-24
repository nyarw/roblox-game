import { DataStoreService, Players } from "@rbxts/services";
import {
	createPlayerState,
	getPlayerState,
	removePlayerState,
} from "shared/playerStateManager";
import type { PlayerState } from "shared/types";

const AUTOSAVE_INTERVAL_SECONDS = 300;

const gameStore = DataStoreService.GetDataStore("PlayerData");

function getPlayerKey(player: Player) {
	return tostring(player.UserId);
}

function loadPlayerData(player: Player): PlayerState | undefined {
	const key = getPlayerKey(player);
	const [success, result] = pcall(() => gameStore.GetAsync(key));

	if (success) {
		if (result === undefined) return undefined;

		return result as PlayerState;
	} else return undefined;
}

function savePlayerData(player: Player) {
	const key = getPlayerKey(player);
	const board = getPlayerState(player);
	if (!board) return false;

	const state: PlayerState = {
		health: board.Get("health"),
		sanity: board.Get("sanity"),
		stamina: board.Get("stamina"),
		hunger: board.Get("hunger"),
	};

	const [success] = pcall(() => gameStore.SetAsync(key, state));
	return success;
}

Players.PlayerAdded.Connect((player) => {
	const data = loadPlayerData(player);
	createPlayerState(player, data);
});

Players.PlayerRemoving.Connect((player) => {
	savePlayerData(player);
	removePlayerState(player);
});

task.spawn(() => {
	while (true) {
		task.wait(AUTOSAVE_INTERVAL_SECONDS);

		for (const player of Players.GetPlayers()) {
			savePlayerData(player);
		}
	}
});

/** biome-ignore-all lint/style/useNamingConvention: Roblox API uses PascalCase */
import { ReplicatedStorage } from "@rbxts/services";

import type { PlayerState } from "./types";

export interface PlayerStateRemote extends RemoteEvent {
	FireClient(player: Player, state: PlayerState): void;
	OnClientEvent: RBXScriptSignal<(state: PlayerState) => void>;
}

export const playerStateRemote = ReplicatedStorage.WaitForChild(
	"PlayerStateRemote",
) as PlayerStateRemote;

import React from "@rbxts/react";
import { useEffect, useState } from "@rbxts/react";
import { playerStateRemote } from "shared/remotes";
import { PlayerState } from "shared/types";

export default function Hud() {
	const [playerState, setPlayerState] = useState<PlayerState>();

	useEffect(() => {
		const connection = playerStateRemote.OnClientEvent.Connect(
			(playerState) => {
				setPlayerState(playerState);
			},
		);
		playerStateRemote.FireServer();
		return () => connection.Disconnect();
	}, []);

	return (
		<frame Size={new UDim2(1, 0, 1, 0)}>
			{playerState && (
				<frame Size={new UDim2(0, 100, 0, 50)}>
					<textlabel Text={tostring(playerState.health)} />
				</frame>
			)}
		</frame>
	);
}

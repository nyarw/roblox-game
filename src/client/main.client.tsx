import { Players } from "@rbxts/services";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import React from "@rbxts/react";
import Hud from "./ui/Hud";

const player = Players.LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const screenGui = new Instance("ScreenGui");
screenGui.Parent = playerGui;

const root = createRoot(new Instance("Folder"));
root.render(createPortal(<Hud />, screenGui));

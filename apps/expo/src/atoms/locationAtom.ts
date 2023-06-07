import { atom } from "jotai";

export const locationTargetAtom = atom<"source" | "destination">("source");

export const sourceAtom = atom({
  latitude: 0,
  longitude: 0,
});

export const destinationAtom = atom({
  latitude: 0,
  longitude: 0,
});

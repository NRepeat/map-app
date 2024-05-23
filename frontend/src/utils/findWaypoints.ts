import { CoordsType, RouteInstruction } from "../types/types";

export const findWaypoints = (
  waypoint_coords: [number, number][],
  coords: [number, number][]
) => {
  const waypoints = waypoint_coords.map((waypoint) => coords[waypoint[0]]);
  // .filter((value, index, self) => self.indexOf(value) === index);

  return waypoints;
};

export const findWaypoint = (
  coords: [number, number][],
  waypointIndex: [number]
) => {
  const waypoint = coords[waypointIndex[0]];

  return waypoint;
};

export const findWaypointByCoords = (
  waypointId: string,
  coords: CoordsType,
  routeInstruction: RouteInstruction[]
) => {
  const id = waypointId.replace("waypoint-", "");

  const routeInstructionToFind = routeInstruction.filter(
    (data) => data.id === id
  );
  if (!routeInstructionToFind) {
    return null;
  }
  const instructions = routeInstructionToFind.map((instruction) =>
    instruction.steps.map((data, i: number) => ({
      instruction: data,
      coords: instruction.waypointCoords[i],
    }))
  );

  const data = instructions
    .flatMap((data) => data)
    .find((data) => data.coords[0].toFixed(4) === coords[0].toFixed(4));
  return data;
};

export const findWaypoints = (
  waypoint_coords: [number, number][],
  coords: [number, number][]
) => {
  const waypoints = waypoint_coords
    .map((waypoint) => coords[waypoint[0]])
    .filter((value, index, self) => self.indexOf(value) === index);

  return waypoints;
};

export const findWaypoint = (
  coords: [number, number][],
  waypointIndex: [number]
) => {
  const waypoint = coords[waypointIndex[0]];

  return waypoint;
};

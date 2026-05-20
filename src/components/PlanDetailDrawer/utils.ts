/** True when both latitude and longitude are defined on the given item. */
export const hasCoordinates = (item: {
  latitude?: number;
  longitude?: number;
}) => item.latitude !== undefined && item.longitude !== undefined;

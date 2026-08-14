export type WeatherIcon =
  | "clear"
  | "partly-cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm"
  | "unknown";

export type WeatherCondition = {
  label: string;
  icon: WeatherIcon;
};

const GROUPS: ReadonlyArray<{
  codes: readonly number[];
  condition: WeatherCondition;
}> = [
  { codes: [0, 1], condition: { label: "Clear sky", icon: "clear" } },
  { codes: [2], condition: { label: "Partly cloudy", icon: "partly-cloudy" } },
  { codes: [3], condition: { label: "Overcast", icon: "overcast" } },
  { codes: [45, 48], condition: { label: "Fog", icon: "fog" } },
  {
    codes: [51, 53, 55, 56, 57],
    condition: { label: "Drizzle", icon: "drizzle" },
  },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    condition: { label: "Rain", icon: "rain" },
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    condition: { label: "Snow", icon: "snow" },
  },
  {
    codes: [95, 96, 99],
    condition: { label: "Thunderstorm", icon: "thunderstorm" },
  },
];

const UNKNOWN: WeatherCondition = {
  label: "Unknown conditions",
  icon: "unknown",
};

export function describeWeatherCode(code: number): WeatherCondition {
  const group = GROUPS.find((g) => g.codes.includes(code));
  return group?.condition ?? UNKNOWN;
}

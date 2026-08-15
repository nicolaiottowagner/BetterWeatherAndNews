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
  { codes: [0, 1], condition: { label: "Klar himmel", icon: "clear" } },
  { codes: [2], condition: { label: "Delvist skyet", icon: "partly-cloudy" } },
  { codes: [3], condition: { label: "Overskyet", icon: "overcast" } },
  { codes: [45, 48], condition: { label: "Tåge", icon: "fog" } },
  {
    codes: [51, 53, 55, 56, 57],
    condition: { label: "Støvregn", icon: "drizzle" },
  },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    condition: { label: "Regn", icon: "rain" },
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    condition: { label: "Sne", icon: "snow" },
  },
  {
    codes: [95, 96, 99],
    condition: { label: "Tordenvejr", icon: "thunderstorm" },
  },
];

const UNKNOWN: WeatherCondition = {
  label: "Ukent vejr",
  icon: "unknown",
};

export function describeWeatherCode(code: number): WeatherCondition {
  const group = GROUPS.find((g) => g.codes.includes(code));
  return group?.condition ?? UNKNOWN;
}

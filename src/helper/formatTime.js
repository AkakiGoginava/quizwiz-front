function formatTime(timeInput, longFormat = true) {
  if (timeInput == null || isNaN(timeInput)) return "N/A";

  const hours = Math.floor(timeInput / 3600);
  const minutes = Math.floor((timeInput % 3600) / 60);
  const seconds = timeInput % 60;

  const units = [
    { value: hours, long: "Hour", short: "h" },
    { value: minutes, long: "Minute", short: "m" },
    { value: seconds, long: "Second", short: "s" },
  ];

  const parts = units
    .filter((unit) => unit.value > 0)
    .map((unit) => {
      const name = longFormat ? unit.long : unit.short;
      const plural = longFormat && unit.value > 1 ? "s" : "";
      return `${unit.value}${name}${plural}`;
    });

  return parts.join(" ") || (longFormat ? "0Second" : "0s");
}

export default formatTime;

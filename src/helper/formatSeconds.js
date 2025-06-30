const formatSeconds = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m} : ${s.toString().padStart(2, "0")}`;
};

export default formatSeconds;

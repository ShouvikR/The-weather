
// Time builder:

const TimeBuilder = () => {
  let time = new Date();
   return time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default TimeBuilder;
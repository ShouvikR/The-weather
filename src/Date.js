
// Date builder:

const DateBuilder = (par) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[par.getDay()];
  let date = par.getDate();
  let month = months[par.getMonth()];
  let year = par.getFullYear();

  return `${day} ${date}, ${month} ${year}`;
};

export default DateBuilder;

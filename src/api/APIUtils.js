
export function loadEmployeesData(){
    const url = "https://yalantis-react-school-api.yalantis.com/api/task0/users";
    return fetch(url)
      .then((data) => data.json())
      .then(data => data)
}

export const months = [
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

const currentMonth = new Date().getMonth();
export const sortedMonths = [
  ...months.slice(currentMonth),
  ...months.slice(0, currentMonth),
];

import React from "react";
import { months, sortedMonths } from "../api/APIUtils";

const Birthday = ({ checkedData }) => {
  const parseDate = (date) => {
    const parsedDate = Date.parse(date),
      newDate = new Date(parsedDate),
      day = newDate.getDate(),
      month = newDate.getMonth(),
      year = newDate.getFullYear();

    return `${day} ${months[month]}, ${year} year`;
  };

  const createBirthdayItem = (monthSection, index) => {
    return monthSection.length !== 0 ? (
      <div className="bday_section">
        <div className="bday_month">{sortedMonths[index]}</div>
        <ul className="bday_items">
          {monthSection.map((item) => {
            return (
              <div className="bday_item" key={item.id}>
                {item.lastName} {item.firstName} - {parseDate(item.dob)}
              </div>
            );
          })}
        </ul>
      </div>
    ) : null;
  };

  const createBirthdaySections = () => {
    return checkedData.length === 0 ? (
      <div>Employees List is empty</div>
    ) : (
      sortedMonths.map((curVal, index) => {
        const monthSection = checkedData.filter(
          (date) => months[new Date(Date.parse(date.dob)).getMonth()] === curVal
        );

        return (
          <div key={curVal}>{createBirthdayItem(monthSection, index)}</div>
        );
      })
    );
  };

  return (
    <div className="bday">
      <div className="bday_header">Employees birthday</div>
      <div className="bday_sections">{createBirthdaySections()}</div>
    </div>
  );
};

export default Birthday;

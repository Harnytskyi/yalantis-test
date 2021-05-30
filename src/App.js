import React, { useState, useEffect } from "react";
import Employees from "./components/Employee";
import Birthday from "./components/Birthday";
import { loadEmployeesData } from './api/APIUtils';

import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [checkedData, setCheckedData] = useState([]);

  useEffect(() => {
    loadEmployeesData().then((data) => {
      data.sort(dynamicSort('lastName'));

      function dynamicSort(property) {
        return function (a, b) {
          return a[property].localeCompare(b[property]);
        }
      }

      const localStorageData = JSON.parse(
        localStorage.getItem("checkedData")
      );

      if (localStorageData) {
        setCheckedData(localStorageData);

        const newData = data.map((dataItem) => {
          const indexData = localStorageData.find(
            (localStorageData) =>
            localStorageData.id === dataItem.id
          );
          if (indexData) {
            return { ...dataItem, checked: true };
          } else {
            return { ...dataItem };
          }
        });
        setData(newData);
      } else {
        setData(data);
      }
    });
  });

  const checkedArray = (newData) => {
    return newData
      .filter((item) => item.checked === true)
      .sort(monthSort())
  };
  function monthSort() {
    return function (a, b) {
      const month1 = new Date(Date.parse(a.dob)).getMonth();
      const month2 = new Date(Date.parse(b.dob)).getMonth();
      return month1 - month2;
    }
  }

  const checkedHandler = (item) => {
    const newData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        return { ...dataItem, checked: !dataItem.checked };
      } else if (dataItem.checked) {
        return { ...dataItem };
      } else {
        return { ...dataItem, checked: false };
      }
    });
    setData(newData);

    const dates = checkedArray(newData);
    setCheckedData(dates);

    localStorage.setItem("checkedData", JSON.stringify(dates));
  };

  return (
    <div className="App">
      <Employees data={data} checkedHandler={checkedHandler} />
      <Birthday checkedData={checkedData} />
    </div>
  );
};

export default App;
import React from "react";

const Employees = ({ data, checkedHandler }) => {
  const createSectionItem = (letterSection) => {
    return letterSection.length !== 0 ? (
      letterSection.map((item) => {
        return (
          <div className="empls_item" key={item.id}>
            <div className={item.checked ? "empls_name" : null}>
              {item.lastName} {item.firstName}
            </div>

            <label>
              <input
                type="radio"
                name={item.id}
                checked={!item.checked ? true : false}
                onChange={() => checkedHandler(item)}
              />{" "}
              not active
            </label>
            <label>
              <input
                type="radio"
                name={item.id}
                checked={item.checked ? true : false}
                onChange={() => checkedHandler(item)}
              />{" "}
              active
            </label>
          </div>
        );
      })
    ) : (
      <div className="empl_items empl_item_empty">----</div>
    );
  };

  const createSections = () => {
    let content =[];
    for(let i = 65; i<=90; i++){
        let letter = String.fromCharCode(i);
        
        const letterSection = data.filter((item) => item.lastName[0] === letter);
        content.push (
          <div className="empls_section" key={letter}>
            <div className="empls_letter">{letter}</div>
            <div className="empls_item">
              {createSectionItem(letterSection)}
            </div>
          </div>
        );
        
    }
    return content;
  };

  return (
    <div className="empls">
      <div className="empls_header">Employees</div>
      <div className="empls_sections">{createSections()}</div>
    </div>
  );
};

export default Employees;
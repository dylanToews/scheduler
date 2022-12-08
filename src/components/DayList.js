import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList(props) {

  const dayList = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        selected={day.name === props.value}
        name={day.name}
        spots={day.spots}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>{dayList}</ul>
  );
}

import React from "react";
import classNames from "classnames";
import "../styles/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  })
  const formatName = function(props) {
    if (props.selected){
      return props.name
    }
  }
  return (
<li className={interviewerClass}
  onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {formatName(props)}
</li>
  )
}
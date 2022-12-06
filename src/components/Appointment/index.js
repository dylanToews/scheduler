import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Confirm from "./Confirm";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    props
      .deleteInterview(props.id, interview)
      .then(() => transition(EMPTY));
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() =>
            transition(CREATE)}
        />
      }

      {mode === SHOW && (
        <Show
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props?.interviewers[props?.interview?.interviewer]?.name}
          onDelete={() =>
            transition(CONFIRM)}
          onEdit={() =>
            transition(EDIT)}
        />
      )}

      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}

      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onConfirm={deleteInterview}
          onCancel={() =>
            back()}
        />
      }


      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props?.interviewers[props?.interview?.interviewer]?.name}

          onSave={save}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() =>
            transition(EMPTY)}
          onSave={save}
        />
      }

    </article>
  );
}
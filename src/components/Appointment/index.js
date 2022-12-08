import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, edit) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview, edit)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }


  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props
      .deleteInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article
      className="appointment"
      data-testid="appointment">

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
          interviewer={props.interview.interviewer.name}
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

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save appointment"}
          onClose={() =>
            transition(EMPTY, true)}
        />
      )}

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={() =>
            transition(SHOW, true)}
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
          interviewer={props.interview.interviewer.name}
          onCancel={() =>
            transition(EMPTY)}
          onSave={save}
          edit={"true"}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() =>
            transition(EMPTY)}
          onSave={save}
          edit={"false"}
        />
      }
    </article>
  );
}
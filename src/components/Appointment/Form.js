import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/*The <Form> component should track the following state:

student:String
interviewer:Number
The <Form> component should have the following actions:

setStudent:Function
setInterviewer:Function
The <Form> component should take the following props:

student:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function 
*/


export default function Form(props) {


  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  // function validate() {
  //   if (name === "") {
  //     setError("Student name cannot be blank");
  //     return;
  //   }
  //   if (interviewer === null) {
  //     setError("Please select an interviewer");
  //     return;
  //   }
  
  //   props.onSave(name, interviewer);
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  );
}
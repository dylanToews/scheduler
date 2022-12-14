import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "../styles/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  
  const list = dailyAppointments.map((appointment) =>
    <Appointment
      interviewers={interviewers}
      key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview} />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {list}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

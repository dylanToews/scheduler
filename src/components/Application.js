import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "../styles/Application.scss";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });



  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data

        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);


  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const interview = getInterview(state, appointment.interview)

  const list = dailyAppointments.map((appointment) =>
    <Appointment
      interviewers={state.interviewers}
      key={appointment.id}
      {...appointment} />);


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

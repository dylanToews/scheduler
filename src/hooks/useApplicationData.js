import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {},
  });


  function updateSpots(increment) {
    let index;
    const day = state.days.find((day, i) => {
      if (day.name === state.day) {
        index = i;
        return day;
      }
    });
    if (increment) {
      day.spots++;
    }
    if (!increment) {
      day.spots--;
    }

    const days = state.days;
    days.splice(index, 1, day);
    return days;
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(false)
        });
      });
  }


  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(true)

        });
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        const days = all[0].data;

        const appointments = all[1].data;
        const interviewers = all[2].data;

        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);


  const setDay = day => setState({ ...state, day });



  return { state, setDay, bookInterview, deleteInterview };
}
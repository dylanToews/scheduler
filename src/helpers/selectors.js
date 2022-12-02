const matchIds = (appointments, ids) => {

  const matched = ids.map(id => appointments[id]);

  return matched;
};

export function getAppointmentsForDay(state, day) {

  //console.log(state.days)

  if (state.days.length > 0 && state.days.filter(user => user.name === day)[0]) {

    const appointmentArray = state.days.filter(user => user.name === day)[0];

    const filterAppointments = appointmentArray.appointments;

    return matchIds(state.appointments, filterAppointments);
  }

  return [];

}


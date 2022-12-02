export function getAppointmentsForDay(state, day) {
  const results = [];
  const dayObj = state.days.find(d => d.name === day);

  if (!dayObj) { return []; }

  for (const id of dayObj.appointments) {
    const appointment = state.appointments[id];
    results.push(appointment);
  }
  return results;
}


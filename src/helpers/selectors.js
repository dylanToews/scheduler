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

export function getInterviewersForDay(state, day) {
  const results = [];
  const dayObj = state.days.find(d => d.name === day);

  if (!dayObj) { return []; }

  for (const id of dayObj.interviewers) {
    const interviewers = state.interviewers[id];
    results.push(interviewers);
  }
  return results;
}



export function getInterview(state, interview) {
  if (!interview) { return null; }

  const interviewId = interview.interviewer;
  const interviewObj = state.interviewers[interviewId];

  const results = {
    student: interview.student,
    interviewer: interviewObj,
  };

  return results;
}
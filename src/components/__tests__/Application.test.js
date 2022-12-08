import React from "react";
import axios from "axios";



import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
}
  from "@testing-library/react";

import Application from "components/Application";
import { debug } from "request";



describe("Application", () => {
  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });




  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => 
      getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    const priorDay = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    console.log("priorDay", prettyDOM(priorDay))
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you want to delete this appointment?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(container, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })



  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => 
      getByText(container, "Archie Cohen"));

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
        );
        const appointment = getAllByTestId(container, "appointment").find(
          appointment => queryByText(appointment, "Archie Cohen")
        );

    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // console.log("day", prettyDOM(day))
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
 
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    })
  





    it("shows the save error when failing to save an appointment", async () => {
      axios.put.mockRejectedValueOnce()
      const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    
    await waitForElement(() => getByText(appointment, "Could not save appointment"))

    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
    });





    it("shows the delete error when failing to delete an existing appointment", async () => {
      axios.delete.mockRejectedValueOnce()
      const { container, debug } = render(<Application />);
      await waitForElement(() => 
        getByText(container, "Archie Cohen"));
      
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[1];
      
      fireEvent.click(getByAltText(appointment, "Delete"));
  
      expect(
        getByText(appointment, "Are you sure you want to delete this appointment?")
      ).toBeInTheDocument();
  
      fireEvent.click(getByText(appointment, "Confirm"));
  
      await waitForElement(() => getByText(appointment, "Could not delete appointment"))
   
      expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
    });
});










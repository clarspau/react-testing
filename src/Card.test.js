import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_DATA from "./_testCommon.js";

it("renders without crashing", function () {
     render(
          <Card
               card={TEST_DATA}
          />
     );
});

it("matches snapshot", function () {
     const { asFragment } = render(
          <Card
               card={TEST_DATA}
          />
     );
     expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the favorite button", function () {
     const { container } = render(
          <Card
               card={TEST_DATA}
          />
     );
     // expect the favorite button to be unchecked
     expect(
          container.querySelector('button[name="favorite"]')
     ).toBeInTheDocument();
     expect(
          container.querySelector('button[name="favorite"]').classList.contains('btn-secondary')
     ).toBe(true);
     expect(
          container.querySelector('button[name="favorite"]').classList.contains('btn-danger')
     ).toBe(false);

     // click the favorite button
     const favoriteButton = container.querySelector('button[name="favorite"]');
     fireEvent.click(favoriteButton);

     // expect the favorite button to be checked
     expect(
          container.querySelector('button[name="favorite"]').classList.contains('btn-secondary')
     ).toBe(false);
     expect(
          container.querySelector('button[name="favorite"]').classList.contains('btn-danger')
     ).toBe(true);
});
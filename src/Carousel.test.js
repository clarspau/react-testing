import { render, fireEvent, getByTestId } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import photos from "./photos";


// smoke test
it("renders without crashing", function () {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// test that the left arrow works
it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

// test that the left arrow is not shown when on the first image
it('left arrow is missing on first image and right arrow is missing on last image', () => {
  const { queryByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Check if left arrow is missing on the first image
  expect(queryByTestId('left-arrow')).toBeNull();

  // Move to the last image
  photos.forEach(() => {
    fireEvent.click(getByTestId('right-arrow'));
  });

  // Check if right arrow is missing on the last image
  expect(queryByTestId('right-arrow')).toBeNull();
});
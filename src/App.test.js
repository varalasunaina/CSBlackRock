import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

const mockCSV = `Date,Open,High,Low,Close,Volume
9/21/21,143.929993,144.600006,142.779999,143.429993,75834000
9/22/21,144.449997,146.429993,143.699997,145.850006,76404300
`;

test("renders open upload button", () => {
  render(<App />);
  const upload = screen.getByText(/Open/i);
  expect(upload).toBeInTheDocument();
});

test("checks file upload and no.of rows", async () => {
  render(<App />);
  const noData = screen.getByText(/No Data/i);
  expect(noData).toBeInTheDocument();

  const file = new File([mockCSV], "test.csv", { type: "text/csv" });

  const hiddenFileInput = document.querySelector('input[type="file"]');

  await act(async () => {
    fireEvent.change(hiddenFileInput, { target: { files: [file] } });
  });

  const firstRowCell1 = screen.getByText(/9\/21\/21/i);
  const firstRowCell2 = screen.getByText(/143\.929993/i);
  const firstRowCell3 = screen.getByText(/144\.600006/i);
  const firstRowCell4 = screen.getByText(/142\.779999/i);
  const firstRowCell5 = screen.getByText(/143\.429993/i);
  const firstRowCell6 = screen.getByText(/75834000/i);

  expect(firstRowCell1).toBeInTheDocument();
  expect(firstRowCell2).toBeInTheDocument();
  expect(firstRowCell3).toBeInTheDocument();
  expect(firstRowCell4).toBeInTheDocument();
  expect(firstRowCell5).toBeInTheDocument();
  expect(firstRowCell6).toBeInTheDocument();
  expect(noData).not.toBeInTheDocument();
});

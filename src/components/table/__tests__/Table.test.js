import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../Table";

const columns = [
  { header: "Name", accessorFn: (row) => row["name"] },
  { header: "Age", accessorFn: (row) => row["age"] },
];

const data = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
];

test("renders table with data correctly", () => {
  render(
    <Table
      columns={columns}
      data={data}
      isLoading={false}
      onRowClick={jest.fn()}
    />,
  );

  expect(screen.getByText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/age/i)).toBeInTheDocument();

  const rows = screen.getAllByRole("row");

  expect(rows[1]).toHaveTextContent("John");
  expect(rows[1]).toHaveTextContent("25");

  expect(rows[2]).toHaveTextContent("Jane");
  expect(rows[2]).toHaveTextContent("30");
});

test("shows loader when isLoading is true", () => {
  render(
    <Table
      columns={columns}
      data={data}
      isLoading={true}
      onRowClick={jest.fn()}
    />,
  );

  expect(
    screen.getByRole("region", { name: /loader container/i }),
  ).toBeInTheDocument();
});

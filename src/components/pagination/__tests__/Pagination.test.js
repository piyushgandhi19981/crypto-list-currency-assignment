import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Pagination";

describe("Pagination Component - Page Navigation", () => {
  const mockOnPageUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("navigates correctly using Prev and Next buttons", () => {
    render(
      <Pagination
        totalItems={100}
        onPageUpdate={mockOnPageUpdate}
        page={2}
        rows={50}
      />,
    );

    fireEvent.click(screen.getByText("< Prev"));
    expect(mockOnPageUpdate).toHaveBeenCalledWith({ page: 1, rows: 50 });

    fireEvent.click(screen.getByText("Next >"));
    expect(mockOnPageUpdate).toHaveBeenCalledWith({ page: 1, rows: 50 });
  });
});

describe("Pagination Component - Page Size Change", () => {
  const mockOnPageUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("changes page size and triggers onPageUpdate", () => {
    render(
      <Pagination
        totalItems={100}
        onPageUpdate={mockOnPageUpdate}
        pageSizeOptions={[10, 20, 50]}
      />,
    );

    fireEvent.change(screen.getByLabelText(/items per page/i), {
      target: { value: "20" },
    });

    expect(mockOnPageUpdate).toHaveBeenCalledWith({ page: 1, rows: 20 });
  });
});

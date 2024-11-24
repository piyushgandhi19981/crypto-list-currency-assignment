import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableManager from "../TableManager";
import { TABLE_ACTION_TYPES } from "../tableManager.constants";

describe("TableManager Component", () => {
  it("calls onAction with ON_INIT on initialization", () => {
    const onActionMock = jest.fn();

    render(<TableManager onAction={onActionMock} />);

    expect(onActionMock).toHaveBeenCalledTimes(1);
    expect(onActionMock).toHaveBeenCalledWith({
      type: TABLE_ACTION_TYPES.ON_INIT,
    });
  });
});

describe("TableManager Component", () => {
  it("renders subheader when renderSubheader prop is provided", () => {
    const renderSubheaderMock = jest.fn(() => (
      <div data-testid="subheader">Subheader Content</div>
    ));

    const { getByTestId } = render(
      <TableManager renderSubheader={renderSubheaderMock} />,
    );

    expect(getByTestId("subheader")).toBeInTheDocument();
    expect(renderSubheaderMock).toHaveBeenCalled();
  });

});

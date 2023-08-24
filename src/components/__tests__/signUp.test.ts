import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const middlewares = [thunk];

const mockProducts = [
  {
    id: 1,
    firstName: "akku",
    lastName: "ttt",
    email: "aak@g.com",
    password: "Akan@123",
  },
];

const initialState = {
  quantity: {
    allProducts: mockProducts,
  },
};

const mockStore = configureStore({
  reducer: initialState,
  middleware: middlewares,
});


describe("Main Component", () => {
  test("It should render a list of products from the redux store", async () => {
    render(
      <Provider store={mockStore}>
        <SignUp />
      </Provider>
    );

    // Wait for the product to appear
    await waitFor(() => {
      const productTitleElement = screen.queryByText(mockProducts[0]);
      expect(productTitleElement).toBeInTheDocument();
    });
  });
});

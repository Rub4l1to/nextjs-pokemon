// __tests__/Home.test.jsx

/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
  it("Should render the component ", () => {
    render(<Home pokemons={[]} />);
  });
});

import { render, screen } from "@testing-library/react";
import withAsyncChecks from "../utils/withAsyncChecks";

const DummyListComponent = ({ data }: { data: { name: string }[] }) => (
  <h1>hello {data[0].name}</h1>
);

const DummySingleComponent = ({ data }: { data: { name: string } }) => (
  <h1>hello {data.name}</h1>
);

let DummyComponentWithChecks: any;
let DummySingleComponentWithChecks: any;

describe("withAsyncChecks", () => {
  beforeAll(() => {
    // user withAsyncChecks HOC
    DummyComponentWithChecks = withAsyncChecks(DummyListComponent);
    DummySingleComponentWithChecks = withAsyncChecks(DummySingleComponent);
  });

  describe("while component fetching the data", () => {
    test("Should return spinner when isLoading state is true", () => {
      render(
        <DummyComponentWithChecks data={null} isLoading={true} error={null} />
      );

      // assert
      expect(screen.getByTestId("spinner-overlay")).toBeInTheDocument();
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    test("shouldn't render errorMesg or data components if isLoading true", () => {
      render(
        <DummyComponentWithChecks data={null} isLoading={true} error={null} />
      );

      // assert
      expect(
        screen.queryByRole("heading", {
          name: /hello/i,
        })
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
  });

  describe("when error occured while fetching the data", () => {
    test("Should render the error message if error occurs while fetching data", () => {
      render(
        <DummyComponentWithChecks
          data={null}
          isLoading={false}
          error={"something went wrong"}
        />
      );

      expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });

    test("shouldn't render data component or spinner if there is an error", () => {
      render(
        <DummyComponentWithChecks
          data={null}
          isLoading={false}
          error={"error msg"}
        />
      );

      expect(screen.queryByTestId("spinner-overlay")).not.toBeInTheDocument();
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });

  describe("when Data fetched successfully", () => {
    describe("Data is an array of objects", () => {
      test("Should return wrapped components if is no error and isLoading is false", () => {
        render(
          <DummyComponentWithChecks
            data={[{ name: "zakaria" }]}
            isLoading={false}
            error={null}
          />
        );

        expect(
          screen.getByRole("heading", { name: /hello zakaria/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { name: /hello zakaria/i })
        ).toHaveTextContent(/hello zakaria/i);
      });

      test("Shouldn't render any of errorMsg or spinner components if data is fetched", () => {
        render(
          <DummyComponentWithChecks
            data={[{ name: "zakaria" }]}
            isLoading={false}
            error={null}
          />
        );

        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
      });

      test("Should render an empty message if data length is zero", () => {
        render(
          <DummyComponentWithChecks data={[]} isLoading={false} error={null} />
        );

        expect(
          screen.getByText(/There's nothing to show./i)
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("heading", { name: /hello zakaria/i })
        ).not.toBeInTheDocument();
      });

      describe("Data is a single object", () => {
        test("Should return wrapped components if is no error and isLoading is false", () => {
          render(
            <DummySingleComponentWithChecks
              data={{ name: "zakaria" }}
              isLoading={false}
              error={null}
            />
          );

          expect(
            screen.getByRole("heading", { name: /hello zakaria/i })
          ).toBeInTheDocument();
          expect(
            screen.getByRole("heading", { name: /hello zakaria/i })
          ).toHaveTextContent(/hello zakaria/i);
        });

        test("Shouldn't render any of errorMsg or spinner components if data is fetched", () => {
          render(
            <DummySingleComponentWithChecks
              data={{ name: "zakaria" }}
              isLoading={false}
              error={null}
            />
          );

          expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
          expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
        });
      });
    });
  });
});

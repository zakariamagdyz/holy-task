import React from "react";
import Loading from "../Loading";
import Alert from "@mui/material/Alert";
import { Container } from "@mui/material";

interface IChecks<DataType> {
  isLoading: boolean;
  error: string | null;
  data: DataType[] | null;
}

const withChecks = <DataType, ChecksType extends IChecks<DataType>>(
  WrappedComponent: React.ElementType
) => {
  return ({ isLoading, error, data, ...others }: ChecksType) => {
    if (isLoading) {
      return <Loading />;
    }

    // handle server error or server is down

    if (error) {
      return (
        <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
          <Alert data-testid="error-msg" variant="filled" severity="error">
            Sorry, Our server is down please try again later :(
          </Alert>
        </Container>
      );
    }

    // return wrappedComponent if data is an array or single object
    return !data ? null : data.length || !(data instanceof Array) ? (
      <WrappedComponent data={data} {...others} />
    ) : (
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <Alert variant="filled" severity="info">
          There's nothing to show.
        </Alert>
      </Container>
    );
  };
};

export default withChecks;

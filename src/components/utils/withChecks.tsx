import React from "react";
import Loading from "../Loading";

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
        <p role="paragraph">
          Sorry, Our server is down please try again later :(
        </p>
      );
    }

    // if there's no data don't show any thing else check for arr length
    return !data ? null : data.length ? (
      <WrappedComponent data={data} {...others} />
    ) : (
      <p>"There's nothing to show yet."</p>
    );
  };
};

export default withChecks;

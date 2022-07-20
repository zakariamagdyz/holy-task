import { Component, ErrorInfo, ReactElement } from "react";
import Error from "./Error";

interface Props {
  children: ReactElement;
}

interface State {
  hasError: boolean;
}
export default class ErrorBoundry extends Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.log(err, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Error message="Sorry this page is broken" />;
    }

    return this.props.children;
  }
}

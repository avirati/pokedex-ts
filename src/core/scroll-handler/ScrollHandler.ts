import * as React from 'react';

interface IProps {
  onWindowScroll?: (event: MouseEvent) => void;
  targetElement: HTMLDivElement;
  onEndReached?: () => void;
}

export default class ScrollHandler extends React.Component <IProps> {
  private scrollListenerInitialised: boolean = false;

  public handleScroll(event: MouseEvent) {
    if (this.props.onWindowScroll) {
      this.props.onWindowScroll(event);
    }
    const elem = this.props.targetElement;
    if (this.props.onEndReached && (elem.scrollHeight - (elem.scrollTop + elem.offsetHeight) < 500)) {
      this.props.onEndReached();
    }
  }

  public render() {
    return this.props.children;
  }

  public componentDidMount() {
    if (this.props.targetElement) {
      this.props.targetElement.addEventListener('scroll', this.handleScroll.bind(this));
      this.scrollListenerInitialised = true;
    }
  }

  public componentWillReceiveProps(newProps: IProps) {
    if (newProps.targetElement && !this.scrollListenerInitialised) {
      newProps.targetElement.addEventListener('scroll', this.handleScroll.bind(this));
      this.scrollListenerInitialised = true;
    }
  }

  public componentWillUnmount() {
    if (this.props.targetElement) {
      this.props.targetElement.removeEventListener('scroll', this.handleScroll.bind(this));
      this.scrollListenerInitialised = false;
    }
  }
}

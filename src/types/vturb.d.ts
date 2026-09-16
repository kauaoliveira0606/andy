import type { DetailedHTMLProps, HTMLAttributes } from "react";

type VturbSmartplayerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  id?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": VturbSmartplayerProps;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": VturbSmartplayerProps;
    }
  }
}

export {};

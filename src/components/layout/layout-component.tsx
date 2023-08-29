import React, { FC } from "react";
import FooterComponent from "./footer-component";
import HeaderComponent from "./header-component";

interface LayoutComponentProps {
  children: React.ReactNode;
}

const LayoutComponent: FC<LayoutComponentProps> = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto py-6 px-3">{children}</div>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;

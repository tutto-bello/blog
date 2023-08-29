import React from "react";

const FooterComponent = () => {
  return (
    <div className="container mx-auto text-center p-6 px-3">
      {`${new Date().getFullYear()} | tuttobello™`}
    </div>
  );
};

export default FooterComponent;

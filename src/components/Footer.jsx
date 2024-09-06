import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        &copy; {year} Food by the Carlson and Hardy families and friends!
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";

function Footer() {
  const today = new Date();

  return (
    <footer>
      <div>
        &copy; {today.getFullYear()} Food by the Carlson and Hardy families and
        friends!
      </div>
    </footer>
  );
}

export default Footer;

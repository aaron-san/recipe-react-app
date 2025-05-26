import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex justify-center px-10 py-4 border-top: h-8 font-size: text-center solid 2px var(--buff); background: white; color: rgba(200, 100, 0, 0.9); 1.5rem;"
    >
      <div>
        &copy; {year} Food by the Carlson and Hardy families and friends!
      </div>
    </footer>
  );
}

export default Footer;

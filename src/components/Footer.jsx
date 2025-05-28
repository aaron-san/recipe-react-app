import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center bg-emerald-200 shadow px-10 py-4 border-emerald-400 border-t text-emerald-800">
      <div className="my-auto">
        &copy; {year} Food by the Carlson and Hardy families and friends!
      </div>
    </footer>
  );
}

export default Footer;

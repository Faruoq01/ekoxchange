"use client";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-5 px-[20px] lg:px-[30px]">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-text-light dark:text-text-dark">
          <span className="material-icons">menu</span>
        </button>
        <div className="relative w-96">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark">
            search
          </span>
          <input
            className="w-full bg-card-light dark:bg-card-dark border-none pl-10 pr-4 py-2 rounded-lg text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-text-light dark:text-text-dark">
          <span className="material-icons">notifications</span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500">
          <img
            alt="User avatar"
            className="rounded-full w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARlUrdzmlIurWPF4fyBiq1V8kLAMMlA7M9mjI6oO_NAhT4prluxHNWRXqRW9TGo6fxIPrnXEs1ziZtugtIf2DWSxf6AcwtduzL77zB5bhJKAsJDNiA5VyQ2cF2YXLm4fz3Op7Ha9-3QoUCNkmBcg0-wVnFL3qgvgjohd2bOnDd4T92P_MeB0MNwBKeWy8PUp4-t9mfUi3AGspgW1EiDBpaubTZcA-ucsottyA7RgpGMIwSZfASHxjvMkRy5ib-4P0tyCPGvPdHtw"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

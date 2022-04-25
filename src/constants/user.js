const UserConstant = {
  positions: [
    { display: "Instructor I", value: "instructor_1" },
    { display: "Instructor II", value: "instructor_2" },
    { display: "Associate Professor I", value: "associate_prof_1" },
    { display: "Associate Professor II", value: "associate_prof_2" },
    { display: "Associate Professor III", value: "associate_prof_3" },
    { display: "Associate Professor IV", value: "associate_prof_4" },
    { display: "Associate Professor V", value: "associate_prof_5" },
    { display: "Assistant Professor I", value: "assistant_prof_1" },
    { display: "Assistant Professor II", value: "assistant_prof_2" },
    { display: "Assistant Professor III", value: "assistant_prof_3" },
    { display: "Assistant Professor IV", value: "assistant_prof_4" },
    { display: "Assistant Professor V", value: "assistant_prof_5" },
  ],
  types: [
    { display: "Admin", value: "admin" },
    { display: "Employee", value: "employee" },
  ],
  statuses: [
    { display: "Active", value: "active" },
    { display: "Inactive", value: "inactive" },
  ],
  departments: [
    {
      display: "IT Department",
      value: "IT Department",
    },
    {
      display: "Education Department",
      value: "Education Department",
    },
    {
      display: "Entrepreneur Department",
      value: "Entrepreneur Department",
    },
    {
      display: "Fishery Department",
      value: "Fishery Department",
    },
    {
      display: "Admin Office",
      value: "Admin Office",
    },
    {
      display: "SASO Office",
      value: "SASO Office",
    },
    {
      display: "Accounting",
      value: "Accounting",
    },
    {
      display: "Registrar",
      value: "Registrar",
    },
    {
      display: "Cashier",
      value: "Cashier",
    },
    {
      display: "HRMO",
      value: "HRMO",
    },
    {
      display: "CMDC",
      value: "CMDC",
    },
    {
      display: "Library",
      value: "Library",
    },
    {
      display: "Clinic",
      value: "Clinic",
    },
  ],
};

export function getPositionsDisplay(value) {
  return UserConstant.positions.find(p => p.value === value).display
}

export default UserConstant;

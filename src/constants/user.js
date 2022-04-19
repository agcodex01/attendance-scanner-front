const UserConstant = {
  positions: [
    { display: "Instructor I", value: "instructor_1" },
    { display: "Instructor II", value: "instructor_2" },
    { display: "Associate Professor I", value: "associate_prof_1" },
    { display: "Associate Professor II", value: "associate_prof_2" },
    { display: "Associate Professor III", value: "associate_prof_3" },
    { display: "Associate Professor IV", value: "associate_prof_4" },
    { display: "Assistant Professor I", value: "assistant_prof_1" },
  ],
  types: [
    { display: "Admin", value: "admin" },
    { display: "Employee", value: "employee" },
  ],
  statuses: [
    { display: "Active", value: "active" },
    { display: "In Active", value: "inactive" },
  ],
  departments: [
    {
      display: "IT Department",
      value: "IT Department",
    },
    {
      display: "SASO Department",
      value: "SASO Department",
    },
  ],
};

export function getPositionsDisplay(value) {
  return UserConstant.positions.find(p => p.value === value).display
}

export default UserConstant;

function authorize(userRole, actionRole) {
  const roles = [
    "SYS_ADMIN",
    "LOCAL_ADMIN",
    "ENTERPRISE_USER",
    "BASIC_USER"
  ];

  const roleHierarchy = {
    SYS_ADMIN: ["LOCAL_ADMIN", "ENTERPRISE_USER", "BASIC_USER"],
    LOCAL_ADMIN: ["ENTERPRISE_USER", "BASIC_USER"],
    ENTERPRISE_USER: ["BASIC_USER"],
    BASIC_USER: []
  };

  const userRoleIndex = roles.indexOf(userRole);
  const actionRoleIndex = roles.indexOf(actionRole);

  return userRoleIndex >= 0 && actionRoleIndex >= 0 &&
    userRoleIndex <= actionRoleIndex &&
    roleHierarchy[actionRole].includes(userRole);
}

module.exports = authorize;

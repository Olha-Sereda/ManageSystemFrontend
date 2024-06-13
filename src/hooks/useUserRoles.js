export const useUserRoles = () => {
  const roles = localStorage.getItem('role');

  const checkRole = (role) => {
    if (!roles) {
      return false;
    }
    return roles.split(',').includes(role);
  };
  if (roles) {
    return { roles: roles.split(','), checkRole: checkRole };
  }
  return { roles: null, checkRole: checkRole };
};

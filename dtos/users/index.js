class UserDTO {
  userId;
  name;
  email;
  phoneNumber;
  status;
  projects;
  sharedProjects;

  constructor(user) {
    this.userId = user?.userId;
    this.name = user?.name;
    this.email = user?.email;
    this.phoneNumber = user?.phoneNumber;
    this.status = user?.status;
    this.projects = user?.projects;
    this.sharedProjects = user?.sharedProjects;
  }
}

export default UserDTO;

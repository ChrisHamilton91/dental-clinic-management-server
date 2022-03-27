export type Person = {
  house_number: number;
  street: string;
  city: string;
  province: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  ssn: number;
  email: string;
  date_of_birth: string;
  user_id: number;
};

export type Employee = {
  house_number: number;
  street: string;
  city: string;
  province: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  ssn: number;
  email: string;
  date_of_birth: string;
  type: Type;
  salary: number;
  username: string;
  password: string;
  branch_city: string;
};

export type Confirmation = {
  first_name: string;
  last_name: string;
  ssn: number;
  email: string;
};

export type Branch = Confirmation & {
  city: string;
}

export type Replacement = Confirmation & {
  old_first_name: string;
  old_last_name: string;
  old_ssn: number;
  old_email: string;
};

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  NON_BINARY = "Non-binary",
}

enum Type {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
}

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

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  NON_BINARY = "Non-binary",
}

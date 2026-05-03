import divisions from "./data/divisions.json";
import districts from "./data/districts.json";
import upazilas from "./data/upazilas.json";

import { Division, District, Upazila } from "./types";

const DIVISIONS = divisions as Division[];
const DISTRICTS = districts as District[];
const UPAZILAS = upazilas as Upazila[];

// DIVISION
export const getAllDivisions = (): Division[] => DIVISIONS;

export const getDivisionById = (id: string): Division | undefined =>
  DIVISIONS.find((d) => d.id === id);

export const getDivisionByName = (name: string): Division | undefined =>
  DIVISIONS.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );

// DISTRICT
export const getAllDistricts = (): District[] => DISTRICTS;

export const getDistrictById = (id: string): District | undefined =>
  DISTRICTS.find((d) => d.id === id);

export const getDistrictByName = (name: string): District | undefined =>
  DISTRICTS.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );

export const getDistrictsByDivision = (divisionId: string): District[] =>
  DISTRICTS.filter((d) => d.divisionId === divisionId);

// UPAZILA
export const getAllUpazilas = (): Upazila[] => UPAZILAS;

export const getUpazilaById = (id: string): Upazila | undefined =>
  UPAZILAS.find((u) => u.id === id);

export const getUpazilaByName = (name: string): Upazila | undefined =>
  UPAZILAS.find(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );

export const getUpazilasByDistrict = (districtId: string): Upazila[] =>
  UPAZILAS.filter((u) => u.districtId === districtId);

// ADVANCED
export const getFullLocation = (upazilaId: string) => {
  const upazila = getUpazilaById(upazilaId);
  if (!upazila) return null;

  const district = getDistrictById(upazila.districtId);
  const division = district
    ? getDivisionById(district.divisionId)
    : null;

  return {
    division,
    district,
    upazila,
  };
};


// Get districts with their upazilas
export const getDistrictWithUpazilas = (districtId: string) => {
  const district = getDistrictById(districtId);
  if (!district) return null;

  const upazilas = getUpazilasByDistrict(districtId);

  return {
    ...district,
    upazilas,
  };
};

// Get divisions with districts
export const getDivisionWithDistricts = (divisionId: string) => {
  const division = getDivisionById(divisionId);
  if (!division) return null;

  const districts = getDistrictsByDivision(divisionId);

  return {
    ...division,
    districts,
  };
};




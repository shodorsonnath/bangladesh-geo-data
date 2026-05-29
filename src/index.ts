import divisions        from "./data/divisions.json";
import districts        from "./data/districts.json";
import upazilas         from "./data/upazilas.json";
import unions           from "./data/unions.json";
import cityCorporations from "./data/city_corporations.json";
import wards            from "./data/wards.json";
import thanas           from "./data/thanas.json";

import {
  Division, District, Upazila, Union,
  CityCorpration, Ward,
  Thana, ThanaType, ThanaWithDetails,
  UpazilaWithUnions, DistrictWithUpazilas,
  DivisionWithDistricts, CityCorprationWithWards,
  FullLocation, FullUrbanLocation,
} from "./types";

const DIVISIONS         = divisions         as Division[];
const DISTRICTS         = districts         as District[];
const UPAZILAS          = upazilas          as Upazila[];
const UNIONS            = unions            as Union[];
const CITY_CORPORATIONS = cityCorporations  as CityCorpration[];
const WARDS             = wards             as Ward[];
const THANAS            = thanas            as Thana[];

// ─────────────────────────────────────────────
// DIVISION
// ─────────────────────────────────────────────

export const getAllDivisions = (): Division[] => DIVISIONS;

export const getDivisionById = (id: string): Division | undefined =>
  DIVISIONS.find((d) => d.id === id);

export const getDivisionByName = (name: string): Division | undefined =>
  DIVISIONS.find((d) => d.name.toLowerCase() === name.toLowerCase());

// ─────────────────────────────────────────────
// DISTRICT
// ─────────────────────────────────────────────

export const getAllDistricts = (): District[] => DISTRICTS;

export const getDistrictById = (id: string): District | undefined =>
  DISTRICTS.find((d) => d.id === id);

export const getDistrictByName = (name: string): District | undefined =>
  DISTRICTS.find((d) => d.name.toLowerCase() === name.toLowerCase());

export const getDistrictsByDivision = (divisionId: string): District[] =>
  DISTRICTS.filter((d) => d.divisionId === divisionId);

// ─────────────────────────────────────────────
// UPAZILA
// ─────────────────────────────────────────────

export const getAllUpazilas = (): Upazila[] => UPAZILAS;

export const getUpazilaById = (id: string): Upazila | undefined =>
  UPAZILAS.find((u) => u.id === id);

export const getUpazilaByName = (name: string): Upazila | undefined =>
  UPAZILAS.find((u) => u.name.toLowerCase() === name.toLowerCase());

export const getUpazilasByDistrict = (districtId: string): Upazila[] =>
  UPAZILAS.filter((u) => u.districtId === districtId);

// ─────────────────────────────────────────────
// UNION
// ─────────────────────────────────────────────

export const getAllUnions = (): Union[] => UNIONS;

export const getUnionById = (id: string): Union | undefined =>
  UNIONS.find((u) => u.id === id);

export const getUnionByName = (name: string): Union | undefined =>
  UNIONS.find((u) => u.name.toLowerCase() === name.toLowerCase());

export const getUnionsByUpazila = (upazilaId: string): Union[] =>
  UNIONS.filter((u) => u.upazilaId === upazilaId);

export const getUnionsByPostalCode = (postalCode: string): Union[] =>
  UNIONS.filter((u) => u.postalCode === postalCode);

// ─────────────────────────────────────────────
// CITY CORPORATION
// ─────────────────────────────────────────────

export const getAllCityCorporations = (): CityCorpration[] => CITY_CORPORATIONS;

export const getCityCorporationById = (id: string): CityCorpration | undefined =>
  CITY_CORPORATIONS.find((c) => c.id === id);

export const getCityCorporationByName = (name: string): CityCorpration | undefined =>
  CITY_CORPORATIONS.find((c) => c.name.toLowerCase() === name.toLowerCase());

export const getCityCorporationByShortName = (shortName: string): CityCorpration | undefined =>
  CITY_CORPORATIONS.find((c) => c.shortName.toLowerCase() === shortName.toLowerCase());

export const getCityCorporationsByDistrict = (districtId: string): CityCorpration[] =>
  CITY_CORPORATIONS.filter((c) => c.districtId === districtId);

// ─────────────────────────────────────────────
// WARD
// ─────────────────────────────────────────────

export const getAllWards = (): Ward[] => WARDS;

export const getWardById = (id: string): Ward | undefined =>
  WARDS.find((w) => w.id === id);

export const getWardsByCityCorporation = (cityCorpId: string): Ward[] =>
  WARDS.filter((w) => w.cityCorpId === cityCorpId);

export const getWardByNumber = (cityCorpId: string, wardNo: number): Ward | undefined =>
  WARDS.find((w) => w.cityCorpId === cityCorpId && w.wardNo === wardNo);

// ─────────────────────────────────────────────
// THANA
// ─────────────────────────────────────────────

export const getAllThanas = (): Thana[] => THANAS;

export const getThanaById = (id: string): Thana | undefined =>
  THANAS.find((t) => t.id === id);

export const getThanaByName = (name: string): Thana | undefined =>
  THANAS.find((t) => t.name.toLowerCase() === name.toLowerCase());

export const getThanasByDistrict = (districtId: string): Thana[] =>
  THANAS.filter((t) => t.districtId === districtId);

export const getThanasByUpazila = (upazilaId: string): Thana[] =>
  THANAS.filter((t) => t.upazilaId === upazilaId);

export const getThanasByCityCorporation = (cityCorpId: string): Thana[] =>
  THANAS.filter((t) => t.cityCorpId === cityCorpId);

export const getThanasByType = (type: ThanaType): Thana[] =>
  THANAS.filter((t) => t.type === type);

export const getRuralThanas = (): Thana[] =>
  THANAS.filter((t) => t.type === "rural");

export const getMetropolitanThanas = (): Thana[] =>
  THANAS.filter((t) => t.type === "metropolitan");

export const getThanaWithDetails = (thanaId: string): ThanaWithDetails | null => {
  const thana = getThanaById(thanaId);
  if (!thana) return null;
  return {
    ...thana,
    upazila:        thana.upazilaId  ? (getUpazilaById(thana.upazilaId)          ?? null) : null,
    district:       thana.districtId ? (getDistrictById(thana.districtId)         ?? null) : null,
    cityCorpration: thana.cityCorpId ? (getCityCorporationById(thana.cityCorpId)  ?? null) : null,
  };
};

// ─────────────────────────────────────────────
// COMPOSITE — RURAL
// ─────────────────────────────────────────────

export const getFullLocationByUnion = (unionId: string): FullLocation | null => {
  const union = getUnionById(unionId);
  if (!union) return null;
  const upazila  = getUpazilaById(union.upazilaId) ?? null;
  const district = upazila  ? (getDistrictById(upazila.districtId)  ?? null) : null;
  const division = district ? (getDivisionById(district.divisionId) ?? null) : null;
  return { division, district, upazila, union };
};

export const getFullLocation = (upazilaId: string) => {
  const upazila  = getUpazilaById(upazilaId);
  if (!upazila) return null;
  const district = getDistrictById(upazila.districtId);
  const division = district ? getDivisionById(district.divisionId) : undefined;
  return { division, district, upazila };
};

export const getUpazilaWithUnions = (upazilaId: string): UpazilaWithUnions | null => {
  const upazila = getUpazilaById(upazilaId);
  if (!upazila) return null;
  return { ...upazila, unions: getUnionsByUpazila(upazilaId) };
};

export const getDistrictWithUpazilas = (
  districtId: string,
  includeUnions = false
): (DistrictWithUpazilas & { upazilas: (Upazila | UpazilaWithUnions)[] }) | null => {
  const district = getDistrictById(districtId);
  if (!district) return null;
  const districtUpazilas = getUpazilasByDistrict(districtId);
  return {
    ...district,
    upazilas: includeUnions
      ? districtUpazilas.map((u) => ({ ...u, unions: getUnionsByUpazila(u.id) }))
      : districtUpazilas,
  };
};

export const getDivisionWithDistricts = (divisionId: string): DivisionWithDistricts | null => {
  const division = getDivisionById(divisionId);
  if (!division) return null;
  return { ...division, districts: getDistrictsByDivision(divisionId) };
};

// ─────────────────────────────────────────────
// COMPOSITE — URBAN
// ─────────────────────────────────────────────

export const getFullUrbanLocationByWard = (wardId: string): FullUrbanLocation | null => {
  const ward = getWardById(wardId);
  if (!ward) return null;
  const cityCorpration = getCityCorporationById(ward.cityCorpId) ?? null;
  const district       = cityCorpration ? (getDistrictById(cityCorpration.districtId) ?? null) : null;
  return { district, cityCorpration, ward };
};

export const getCityCorporationWithWards = (cityCorpId: string): CityCorprationWithWards | null => {
  const cc = getCityCorporationById(cityCorpId);
  if (!cc) return null;
  return { ...cc, wards: getWardsByCityCorporation(cityCorpId) };
};

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────

export const searchUnions = (query: string): Union[] => {
  const q = query.toLowerCase();
  return UNIONS.filter((u) => u.name.toLowerCase().includes(q) || u.nameBn.includes(query));
};

export const searchUpazilas = (query: string): Upazila[] => {
  const q = query.toLowerCase();
  return UPAZILAS.filter((u) => u.name.toLowerCase().includes(q) || u.nameBn.includes(query));
};

export const searchDistricts = (query: string): District[] => {
  const q = query.toLowerCase();
  return DISTRICTS.filter((d) => d.name.toLowerCase().includes(q) || d.nameBn.includes(query));
};

export const searchWards = (query: string): Ward[] => {
  const q = query.toLowerCase();
  return WARDS.filter((w) => w.name.toLowerCase().includes(q) || w.nameBn.includes(query));
};

export const searchCityCorporations = (query: string): CityCorpration[] => {
  const q = query.toLowerCase();
  return CITY_CORPORATIONS.filter(
    (c) => c.name.toLowerCase().includes(q) || c.nameBn.includes(query) || c.shortName.toLowerCase().includes(q)
  );
};

export const searchThanas = (query: string): Thana[] => {
  const q = query.toLowerCase();
  return THANAS.filter((t) => t.name.toLowerCase().includes(q) || t.nameBn.includes(query));
};

// ─────────────────────────────────────────────
// RE-EXPORTS
// ─────────────────────────────────────────────

export type {
  Division, District, Upazila, Union,
  CityCorpration, Ward,
  Thana, ThanaType, ThanaWithDetails,
  UpazilaWithUnions, DistrictWithUpazilas,
  DivisionWithDistricts, CityCorprationWithWards,
  FullLocation, FullUrbanLocation,
};
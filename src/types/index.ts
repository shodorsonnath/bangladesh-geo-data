export interface Division {
  id: string;
  name: string;
  nameBn: string;
}

export interface District {
  id: string;
  name: string;
  nameBn: string;
  divisionId: string;
}

export interface Upazila {
  id: string;
  name: string;
  nameBn: string;
  districtId: string;
}

export interface Union {
  id: string;
  name: string;
  nameBn: string;
  upazilaId: string;
  postOffice: string;
  postalCode: string;
}

export interface CityCorpration {
  id: string;
  name: string;
  nameBn: string;
  shortName: string;
  districtId: string;
  totalWards: number;
}

export interface Ward {
  id: string;
  wardNo: number;
  name: string;
  nameBn: string;
  cityCorpId: string;
}

// Composite types
export interface UpazilaWithUnions extends Upazila {
  unions: Union[];
}

export interface DistrictWithUpazilas extends District {
  upazilas: Upazila[];
}

export interface DivisionWithDistricts extends Division {
  districts: District[];
}

export interface CityCorprationWithWards extends CityCorpration {
  wards: Ward[];
}

export interface FullLocation {
  division: Division | null;
  district: District | null;
  upazila: Upazila | null;
  union: Union;
}

export interface FullUrbanLocation {
  district: District | null;
  cityCorpration: CityCorpration | null;
  ward: Ward;
}

export type ThanaType = "rural" | "sub-district" | "metropolitan";

export interface Thana {
  id: string;
  name: string;
  nameBn: string;
  type: ThanaType;
  upazilaId: string | null;
  districtId: string;
  cityCorpId: string | null;
}

export interface ThanaWithDetails extends Thana {
  upazila?: Upazila | null;
  district?: District | null;
  cityCorpration?: CityCorpration | null;
}
# 🇧🇩 Bangladesh Geo Data

[![npm version](https://img.shields.io/npm/v/bangladesh-geo-data.svg)](https://www.npmjs.com/package/bangladesh-geo-data)
[![npm downloads](https://img.shields.io/npm/dm/bangladesh-geo-data.svg?cacheSeconds=86400)](https://www.npmjs.com/package/bangladesh-geo-data)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A lightweight npm package providing **complete Bangladesh administrative geography data** with simple utility functions for easy usage in JavaScript/TypeScript applications.

---

## 🚀 Features

- 🇧🇩 Complete Bangladesh geographical dataset
- 🗺️ Divisions, Districts, Upazilas, Unions, City Corporations, Wards & **Thanas** included
- ⚡ Lightweight and fast (no dependencies)
- 📦 Easy to use in **Node.js, React, Next.js, TypeScript**
- 🔍 Utility functions for filtering, searching, and full hierarchy lookup
- 🧠 Type-safe TypeScript support
- 📬 Postal codes and post office data included in unions
- 🚔 Rural, sub-district and metropolitan thanas all covered

---

## 📊 Dataset Summary

| Level | Count |
|-------|-------|
| Divisions | 8 |
| Districts | 64 |
| Upazilas | 495 |
| Unions | 4,599 |
| City Corporations | 12 |
| Wards | 462 |
| Thanas | 639 |

---

## 📦 Installation

```bash
npm install bangladesh-geo-data
```

or

```bash
yarn add bangladesh-geo-data
```

---

## 🧩 Usage

### Import the package

```ts
import {
  // Divisions
  getAllDivisions, getDivisionById, getDivisionByName,
  getDivisionWithDistricts,

  // Districts
  getAllDistricts, getDistrictById, getDistrictByName,
  getDistrictsByDivision, getDistrictWithUpazilas,

  // Upazilas
  getAllUpazilas, getUpazilaById, getUpazilaByName,
  getUpazilasByDistrict, getUpazilaWithUnions,

  // Unions
  getAllUnions, getUnionById, getUnionByName,
  getUnionsByUpazila, getUnionsByPostalCode,

  // City Corporations
  getAllCityCorporations, getCityCorporationById,
  getCityCorporationByShortName, getCityCorporationsByDistrict,
  getCityCorporationWithWards,

  // Wards
  getAllWards, getWardById, getWardsByCityCorporation, getWardByNumber,

  // Thanas
  getAllThanas, getThanaById, getThanaByName,
  getThanasByDistrict, getThanasByUpazila,
  getThanasByCityCorporation, getThanasByType,
  getRuralThanas, getMetropolitanThanas, getThanaWithDetails,

  // Full location helpers
  getFullLocation, getFullLocationByUnion,
  getFullUrbanLocationByWard,

  // Search
  searchUnions, searchUpazilas, searchDistricts,
  searchWards, searchCityCorporations, searchThanas,
} from "bangladesh-geo-data";
```

---

## 🗺️ Divisions

```ts
const divisions = getAllDivisions();

const dhaka = getDivisionById("div-01");

const divisionWithDistricts = getDivisionWithDistricts("div-01");
// { id, name, nameBn, districts: [...] }
```

---

## 🏙️ Districts

```ts
const districts = getAllDistricts();

const dhakaDistricts = getDistrictsByDivision("div-01");

// With upazilas nested
const districtWithUpazilas = getDistrictWithUpazilas("dis-01");

// With upazilas AND unions nested
const districtFull = getDistrictWithUpazilas("dis-01", true);
```

---

## 🏡 Upazilas

```ts
const upazilas = getAllUpazilas();

const dhakaUpazilas = getUpazilasByDistrict("dis-01");

// With unions nested
const upazilaWithUnions = getUpazilaWithUnions("upa-001");
// { id, name, nameBn, districtId, unions: [...] }
```

---

## 🏘️ Unions

```ts
const unions = getAllUnions();

const upazilaUnions = getUnionsByUpazila("upa-001");

const union = getUnionById("uni-0001");

// Find by postal code
const postalUnions = getUnionsByPostalCode("1350");
```

---

## 🏛️ City Corporations

```ts
const cityCorporations = getAllCityCorporations();

const dncc = getCityCorporationById("cc-01");
const ccc  = getCityCorporationByShortName("CCC");

// City corporation with all its wards
const dnccWithWards = getCityCorporationWithWards("cc-01");
// { id, name, shortName, districtId, totalWards, wards: [...] }
```

---

## 🗳️ Wards

```ts
const wards = getAllWards();

// All wards of a city corporation
const dnccWards = getWardsByCityCorporation("cc-01");

// Specific ward by number
const ward14 = getWardByNumber("cc-03", 14);
// → { id, wardNo: 14, name: "Lalkhan Bazar", nameBn: "লালখান বাজার", cityCorpId: "cc-03" }

// Full urban location from ward ID
const location = getFullUrbanLocationByWard("ward-0112");
// { district, cityCorpration, ward }
```

---

## 🚔 Thanas

Thanas are divided into three types:

- **`rural`** — one per upazila, same boundary (495 thanas)
- **`sub-district`** — additional police stations inside large upazilas (34 thanas)
- **`metropolitan`** — police stations inside city corporations (110 thanas)

```ts
// All thanas
const thanas = getAllThanas();

// By type
const ruralThanas  = getRuralThanas();        // 495
const metroThanas  = getMetropolitanThanas(); // 110
const subDistrict  = getThanasByType("sub-district");

// By location
const dhakaThanas  = getThanasByDistrict("dis-01");
const upazilaThana = getThanasByUpazila("upa-001");
const dnccThanas   = getThanasByCityCorporation("cc-01");

// With full details populated
const thanaDetails = getThanaWithDetails("tha-0530");
/*
{
  id, name, nameBn, type: "metropolitan",
  upazilaId: null,
  districtId: "dis-01",
  cityCorpId: "cc-01",
  upazila: null,
  district: { ... },
  cityCorpration: { ... }
}
*/
```

---

## 🔍 Search

```ts
// Search by partial name in English or Bangla
searchUnions("Subil")
searchUpazilas("Dhaka")
searchDistricts("সিলেট")
searchWards("Pahartali")
searchCityCorporations("Dhaka")
searchThanas("Mirpur")
```

---

## 🌍 Full Location Lookup

```ts
// 3-level rural lookup from upazila ID
const location = getFullLocation("upa-001");
/*
{
  division: { id, name, nameBn },
  district:  { id, name, nameBn, divisionId },
  upazila:   { id, name, nameBn, districtId }
}
*/

// 4-level rural lookup from union ID
const fullLocation = getFullLocationByUnion("uni-0001");
/*
{
  division: { id, name, nameBn },
  district:  { id, name, nameBn, divisionId },
  upazila:   { id, name, nameBn, districtId },
  union:     { id, name, nameBn, upazilaId, postOffice, postalCode }
}
*/

// Urban lookup from ward ID
const urbanLocation = getFullUrbanLocationByWard("ward-0001");
/*
{
  district:       { ... },
  cityCorpration: { ... },
  ward:           { ... }
}
*/
```

---

## 📊 Data Structure

### Division
```json
{ "id": "div-01", "name": "Dhaka", "nameBn": "ঢাকা" }
```

### District
```json
{ "id": "dis-01", "name": "Dhaka", "nameBn": "ঢাকা", "divisionId": "div-01" }
```

### Upazila
```json
{ "id": "upa-001", "name": "Dhamrai", "nameBn": "ধামরাই", "districtId": "dis-01" }
```

### Union
```json
{
  "id": "uni-0001", "name": "Subil Union", "nameBn": "সুবিল ইউনিয়ন",
  "upazilaId": "upa-089", "postOffice": "Subil", "postalCode": "3500"
}
```

### City Corporation
```json
{
  "id": "cc-01", "name": "Dhaka North City Corporation",
  "nameBn": "ঢাকা উত্তর সিটি কর্পোরেশন",
  "shortName": "DNCC", "districtId": "dis-01", "totalWards": 54
}
```

### Ward
```json
{
  "id": "ward-0112", "wardNo": 1, "name": "South Pahartali",
  "nameBn": "দক্ষিণ পাহাড়তলী", "cityCorpId": "cc-03"
}
```

### Thana
```json
{
  "id": "tha-0530", "name": "Adabor", "nameBn": "আদাবর",
  "type": "metropolitan", "upazilaId": null,
  "districtId": "dis-01", "cityCorpId": "cc-01"
}
```

---

## 🆔 ID Formats

| Level | Pattern | Example |
|-------|---------|---------|
| Division | `div-XX` | `div-01` |
| District | `dis-XX` | `dis-17` |
| Upazila | `upa-XXX` | `upa-001` |
| Union | `uni-XXXX` | `uni-0001` |
| City Corporation | `cc-XX` | `cc-01` |
| Ward | `ward-XXXX` | `ward-0112` |
| Thana | `tha-XXXX` | `tha-0530` |

---

## 🏛️ City Corporation Reference

| ID | Short | Name | District | Wards |
|----|-------|------|----------|-------|
| cc-01 | DNCC | Dhaka North | dis-01 | 54 |
| cc-02 | DSCC | Dhaka South | dis-01 | 57 |
| cc-03 | CCC | Chattogram | dis-17 | 41 |
| cc-04 | GCC | Gazipur | dis-03 | 57 |
| cc-05 | NCC | Narayanganj | dis-09 | 27 |
| cc-06 | ComCC | Cumilla | dis-19 | 27 |
| cc-07 | KCC | Khulna | dis-35 | 31 |
| cc-08 | RCC | Rajshahi | dis-47 | 30 |
| cc-09 | BCC | Barishal | dis-26 | 30 |
| cc-10 | SCC | Sylhet | dis-60 | 42 |
| cc-11 | MCC | Mymensingh | dis-62 | 33 |
| cc-12 | RpCC | Rangpur | dis-55 | 33 |

---

## 📌 Use Cases

- 📍 Location dropdowns (all 7 levels)
- 🧾 Address forms with postal code autofill
- 🚔 Police station / thana lookup by area
- 🌐 Bangladesh-focused applications
- 📊 Data visualization tools
- 🏛️ Government or education systems
- 🚚 Delivery and logistics systems

---

## 🪪 License

MIT © Shodorson
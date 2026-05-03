# 🇧🇩 Bangladesh Geo Data

A lightweight npm package providing **Bangladesh divisions, districts,
and upazilas data** with simple utility functions for easy usage in
JavaScript/TypeScript applications.

------------------------------------------------------------------------

## 🚀 Features

-   🇧🇩 Complete Bangladesh geographical dataset
-   🗺️ Divisions, Districts, and Upazilas included
-   ⚡ Lightweight and fast (no dependencies)
-   📦 Easy to use in **Node.js, React, Next.js, TypeScript**
-   🔍 Utility functions for filtering and searching data
-   🧠 Type-safe TypeScript support

------------------------------------------------------------------------

## 📦 Installation

``` bash
npm install bangladesh-geo-data
```

or

``` bash
yarn add bangladesh-geo-data
```

------------------------------------------------------------------------

## 🧩 Usage

### Import the package

``` ts
import {
  getAllDivisions,
  getAllDistricts,
  getAllUpazilas,
  getDivisionById,
  getDistrictsByDivision,
  getFullLocation
} from "bangladesh-geo-data";
```

------------------------------------------------------------------------

## 🗺️ Divisions

``` ts
const divisions = getAllDivisions();
console.log(divisions);

const dhaka = getDivisionById("div-01");
console.log(dhaka);
```

------------------------------------------------------------------------

## 🏙️ Districts

``` ts
const districts = getAllDistricts();

const dhakaDistricts = getDistrictsByDivision("div-01");
console.log(dhakaDistricts);
```

------------------------------------------------------------------------

## 🏡 Upazilas

``` ts
const upazilas = getAllUpazilas();

const dhakaUpazilas = getUpazilasByDistrict("dis-01");
console.log(dhakaUpazilas);
```

------------------------------------------------------------------------

## 🌍 Full Location Lookup

``` ts
const location = getFullLocation("upa-001");

console.log(location);
/*
{
  division: { ... },
  district: { ... },
  upazila: { ... }
}
*/
```

------------------------------------------------------------------------

## 📊 Data Structure

### Division

``` json
{
  "id": "div-01",
  "name": "Dhaka",
  "nameBn": "ঢাকা"
}
```

### District

``` json
{
  "id": "dis-01",
  "name": "Dhaka",
  "nameBn": "ঢাকা",
  "divisionId": "div-01"
}
```

### Upazila

``` json
{
  "id": "upa-001",
  "name": "Dhamrai",
  "nameBn": "ধামরাই",
  "districtId": "dis-01"
}
```

------------------------------------------------------------------------

## 📌 Use Cases

-   📍 Location dropdowns
-   🧾 Address forms
-   🌐 Bangladesh-focused applications
-   📊 Data visualization tools
-   🏛️ Government or education systems

------------------------------------------------------------------------

## 🪪 License

MIT © Shodorson

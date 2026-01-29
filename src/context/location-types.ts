export type PermissionStatus =
  | "unknown"
  | "granted"
  | "denied"
  | "prompt"
  | "unsupported";

export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

export type AddressInfo = {
  streetNumber?: string;
  streetName?: string;
  suburb?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
};

export type LocationState = {
  status: PermissionStatus;
  coords?: Coordinates;
  address?: AddressInfo;
  loading: boolean;
  error?: string;
  requestPermission: () => Promise<void>;
};

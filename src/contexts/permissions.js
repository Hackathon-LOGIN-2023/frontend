import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const REQUIRED = [
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
];

export async function requireAll() {
  for (const perm of REQUIRED) {
    await request(perm);
  }
}

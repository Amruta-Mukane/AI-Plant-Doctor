import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "plant_scan_history";

export type ScanResult = {
  id: string;
  plant: string;
  disease: string;
  confidence: number;

  // IMPORTANT
  healthy: boolean;

  image?: string;
  date: string;
};

// Same type name if history.tsx uses ScanRecord
export type ScanRecord = ScanResult;

export async function getScans(): Promise<ScanResult[]> {
  try {
    const data =
      await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {
    console.error(
      "Error getting scans:",
      error
    );

    return [];
  }
}

export async function saveScan(
  scan: ScanResult
) {
  try {
    const scans =
      await getScans();

    const updatedScans = [
      scan,
      ...scans,
    ];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedScans
      )
    );

    console.log(
      "Scan saved successfully"
    );

  } catch (error) {
    console.error(
      "Error saving scan:",
      error
    );

    throw error;
  }
}

export async function clearScans() {
  try {
    await AsyncStorage.removeItem(
      STORAGE_KEY
    );

  } catch (error) {
    console.error(
      "Error clearing scans:",
      error
    );
  }
}
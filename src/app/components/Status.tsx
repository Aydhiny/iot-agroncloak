import { useState, useEffect } from "react";
import { db } from "../../lib/firebase"
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore"; // Firebase Firestore methods

// Define the type for the status object
interface Status {
  isActive: boolean;
  cameraConnected: boolean;
  motionDetectionStatus: string;
}

const StatusPage = () => {
  // Use the Status interface for the state
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const docRef = doc(db, "esp32", "status"); // Reference to the document in Firestore
      const docSnap: DocumentSnapshot = await getDoc(docRef); // Get the document snapshot

      if (docSnap.exists()) {
        setStatus(docSnap.data() as Status); // Type cast the document data
      } else {
        console.log("No such document!");
      }
    };

    fetchStatus();
  }, []);

  if (!status) return <div>Loading...</div>;

  return (
    <div>
      <h1>ESP32 Status</h1>
      <p>Active: {status.isActive ? "Yes" : "No"}</p>
      <p>Camera Connected: {status.cameraConnected ? "Yes" : "No"}</p>
      <p>Motion Detection: {status.motionDetectionStatus}</p>
    </div>
  );
};

export default StatusPage;

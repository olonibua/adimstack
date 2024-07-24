import React from "react";

type UserDetailsProps = {
  user: {
    name: string;
    email: string;
    phone: string;
    privacyConsent: boolean;
    gender: string;
    birthDate: string;
    address: string;
    emergencyContactNumber: string;
    occupation: string;
    identificationType: string;
    password: string;
    gymId: string;
    identificationDocument: string | null;
    identificationNumber: string;
    emergencyContactName: string;
    identificationDocumentId: string | null;
    identificationDocumentUrl: string | null;
    $id: string;
    $tenant: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
  };
};

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className="user-details-card p-4 border border-gray-300 rounded-lg space-y-2">
      <h3 className="text-xl font-bold">{user.name}</h3>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Privacy Consent:</strong> {user.privacyConsent ? "Yes" : "No"}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Birth Date:</strong>{" "}
        {new Date(user.birthDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Emergency Contact Number:</strong> {user.emergencyContactNumber}
      </p>
      <p>
        <strong>Occupation:</strong> {user.occupation}
      </p>
      <p>
        <strong>Identification Type:</strong> {user.identificationType}
      </p>
      <p>
        <strong>Gym ID:</strong> {user.gymId}
      </p>
      <p>
        <strong>Identification Number:</strong> {user.identificationNumber}
      </p>
      <p>
        <strong>Emergency Contact Name:</strong> {user.emergencyContactName}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(user.$createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(user.$updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default UserDetails;

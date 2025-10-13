"use client";
import { useState } from "react";
import Image from "next/image";

export default function CreateRolePage() {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const handlePermissionToggle = (id: string) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const permissionGroups = [
    {
      title: "Users Management",
      permissions: [
        { id: "user-view", label: "View Users" },
        { id: "user-create", label: "Create Users" },
        { id: "user-edit", label: "Edit Users" },
        { id: "user-delete", label: "Delete Users" },
      ],
    },
    {
      title: "Crypto Management",
      permissions: [
        { id: "crypto-view", label: "View Coins" },
        { id: "crypto-add", label: "Add Coins" },
        { id: "crypto-edit", label: "Edit Coins" },
        { id: "crypto-delist", label: "Delist Coins" },
      ],
    },
    {
      title: "Transactions",
      permissions: [
        { id: "tx-view", label: "View Transactions" },
        { id: "tx-approve", label: "Approve" },
        { id: "tx-reject", label: "Reject" },
        { id: "tx-export", label: "Export Data" },
      ],
    },
  ];

  const handleCreate = () => {
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );
    console.log("Creating role:", { roleName, selectedPermissions });
  };

  return (
    <main className="flex-1 overflow-y-auto rounded-xl bg-background-light dark:bg-background-dark mt-[20px] mb-[50px]">
      {/* Form Container */}
      <section className="bg-card-light dark:bg-card-dark p-8 rounded-xl mx-auto">
        {/* Role Name */}
        <div className="mb-10">
          <label
            htmlFor="role-name"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
          >
            Role Name
          </label>
          <input
            id="role-name"
            type="text"
            placeholder="e.g. Content Manager"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg px-4 py-3 text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
          />
        </div>

        {/* Permissions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-heading-light dark:text-heading-dark mb-6">
            Assign Permissions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permissionGroups.map((group) => (
              <div
                key={group.title}
                className="border border-border-light dark:border-border-dark p-6 rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-heading-light dark:text-heading-dark mb-4">
                  {group.title}
                </h3>

                <div className="space-y-4">
                  {group.permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        id={perm.id}
                        checked={permissions[perm.id] || false}
                        onChange={() => handlePermissionToggle(perm.id)}
                        className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark transition"
                      />
                      <span className="ml-3 text-sm text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                        {perm.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-12 gap-4">
          <button className="w-[100px] h-[40px] px-[10px] text-[12px] border border-primary text-primary rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-card-dark/60 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-primary text-white h-[40px] px-[10px] text-[12px] rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Create Role</span>
          </button>
        </div>
      </section>
    </main>
  );
}

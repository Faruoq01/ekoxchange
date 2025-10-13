"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleService } from "@/app/lib/services/roles";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setPermissions } from "@/app/lib/redux/slices/roles";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppPages } from "@/app/assets/appages";

/** ✅ Validation Schema */
const RoleSchema = z.object({
  roleName: z.string().min(2, "Role name is required"),
  roleDescription: z.string().min(2, "Description is required"),
  permissionIds: z.array(z.string()).min(1, "Select at least one permission"),
});

type RoleFormData = z.infer<typeof RoleSchema>;

export default function CreateRolePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const permissionGroups = useAppSelector(
    (state) => state.roles.permissionList
  );

  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, boolean>
  >({});
  const [selectAllState, setSelectAllState] = useState<Record<string, boolean>>(
    {}
  );

  /** React Hook Form setup */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      roleName: "",
      roleDescription: "",
      permissionIds: [],
    },
  });

  const permissionIds = watch("permissionIds");

  /** Fetch all permissions */
  const getAllPermissions = useCallback(async () => {
    const { error, payload } = await RoleService.getPermissions();
    if (!error && payload?.permissions) {
      dispatch(setPermissions(payload.permissions));
    }
  }, [dispatch]);

  useEffect(() => {
    getAllPermissions();
  }, [getAllPermissions]);

  /** Toggle individual permission */
  const handlePermissionToggle = (id: string) => {
    const isChecked = selectedPermissions[id];
    const updated = { ...selectedPermissions, [id]: !isChecked };
    setSelectedPermissions(updated);

    const current = permissionIds || [];
    if (isChecked) {
      setValue(
        "permissionIds",
        current.filter((pid) => pid !== id),
        { shouldValidate: true }
      );
    } else {
      setValue("permissionIds", [...current, id], { shouldValidate: true });
    }
  };

  /** Toggle Select All in a group */
  const handleSelectAll = (groupName: string, perms: any[]) => {
    const allSelected = selectAllState[groupName];
    const updatedSelectAll = { ...selectAllState, [groupName]: !allSelected };
    setSelectAllState(updatedSelectAll);

    const updatedPermissions = { ...selectedPermissions };
    const current = new Set(permissionIds);

    if (allSelected) {
      // Unselect all in this group
      perms.forEach((perm) => {
        delete updatedPermissions[perm.id];
        current.delete(perm.id);
      });
    } else {
      // Select all in this group
      perms.forEach((perm) => {
        updatedPermissions[perm.id] = true;
        current.add(perm.id);
      });
    }

    setSelectedPermissions(updatedPermissions);
    setValue("permissionIds", Array.from(current), { shouldValidate: true });
  };

  /** Handle form submit */
  const onSubmit = async (data: RoleFormData) => {
    const payload = {
      name: data.roleName.trim(),
      description: data.roleDescription.trim(),
      permissionIds: data.permissionIds,
    };

    const { error, payload: response } = await RoleService.createRole(payload);
    if (!error && response) {
      toast.success("Role created successfully!");
      router.push(AppPages.home.roles.index);
    }
  };

  /** Go back handler */
  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex-1 overflow-y-auto rounded-xl bg-background-light dark:bg-background-dark mt-[20px] mb-[50px]">
      <section className="bg-card-light dark:bg-card-dark p-6 rounded-xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-lg font-bold text-gray-700">Create New Role</h1>
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 text-[12px] text-primary font-semibold transition"
          >
            <span className="material-symbols-outlined text-[10px]">
              arrow_back
            </span>
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Role Name */}
          <div>
            <label
              htmlFor="role-name"
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
            >
              Role Name
            </label>
            <input
              id="role-name"
              type="text"
              placeholder="e.g. Administrator"
              {...register("roleName")}
              className="w-full text-[12px] rounded-[5px] bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark px-4 py-[10px] text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            />
            {errors.roleName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.roleName.message}
              </p>
            )}
          </div>

          {/* Role Description */}
          <div>
            <label
              htmlFor="role-description"
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
            >
              Description
            </label>
            <textarea
              id="role-description"
              rows={3}
              placeholder="Describe this role and its responsibilities..."
              {...register("roleDescription")}
              className="w-full text-[12px] bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-[5px] px-4 py-3 text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            />
            {errors.roleDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.roleDescription.message}
              </p>
            )}
          </div>

          {/* Permissions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 py-[5px]">
              Assign Permissions
            </h2>
            <hr className="mb-8" />

            {permissionGroups ? (
              <div className="space-y-8">
                {Object.entries(permissionGroups).map(
                  ([groupName, perms]: any) => {
                    const allSelected = perms.every(
                      (perm: any) => selectedPermissions[perm.id]
                    );

                    return (
                      <div key={groupName}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-[600] text-md text-gray-500 capitalize">
                            {groupName} Permissions
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleSelectAll(groupName, perms)}
                            className="text-xs text-primary font-semibold hover:underline"
                          >
                            {allSelected ? "Unselect All" : "Select All"}
                          </button>
                        </div>

                        <ul className="space-y-3 border border-border-light dark:border-border-dark rounded-lg p-4">
                          {perms.map((perm: any) => (
                            <li
                              key={perm.id}
                              className="flex items-start justify-between border-b border-border-light dark:border-border-dark last:border-0 py-2"
                            >
                              <div className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedPermissions[perm.id] || false
                                  }
                                  onChange={() =>
                                    handlePermissionToggle(perm.id)
                                  }
                                  className="mt-1 h-3 w-3 bg-primary text-primary border-border-light dark:border-border-dark rounded focus:ring-primary/50"
                                />
                                <p className="text-sm text-text-light dark:text-text-dark">
                                  {perm.description}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <p className="text-gray-500">Loading permissions...</p>
            )}

            {errors.permissionIds && (
              <p className="text-red-500 text-xs mt-2">
                {errors.permissionIds.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-12 gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="w-[100px] h-[40px] px-[10px] text-[12px] border border-gray-400 text-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-card-dark/60 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              className="w-[100px] h-[40px] px-[10px] text-[12px] border border-primary text-primary rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-card-dark/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white h-[40px] px-[10px] text-[12px] rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined">
                {isSubmitting ? "hourglass_empty" : "add"}
              </span>
              <span>{isSubmitting ? "Creating..." : "Create Role"}</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

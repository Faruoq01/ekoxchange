"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import Button from "@/app/components/forms/button";
import Text from "@/app/components/forms/text";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { CryptoService } from "@/app/lib/services/crypto";
import { feeColumns, Fee } from "./fee";

const FeeTable: React.FC = () => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 30;

  const formatDate = (timestamp: number): string => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  const fetchFees = useCallback(async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * perPage;
      const { error, payload } = await CryptoService.getFeeRecords(
        skip,
        perPage
      );

      if (error) throw new Error("Failed to fetch fees");
      if (payload?.data) {
        const normalizedData: Fee[] = payload.data.map((item: any) => ({
          id: item.id ?? item._id,
          transactionType: item.transactionType ?? "N/A",
          cryptoAsset:
            item.cryptoAsset?.name ?? item.cryptoAsset?.symbol ?? "N/A",
          network: item.cryptoAsset?.chain?.name ?? "N/A",
          feeType: item.isPercentage ? "Percentage" : "Fixed",
          currentValue: item.isPercentage
            ? `${item.percentageAmount}%`
            : `NGN ${item.fixedAmount ?? 0}`,
          appliedTo: item.userLevel ?? "N/A",
          lastModified: formatDate(item.updatedAt),
          status: "Active", // You can replace this with item.status if your backend supports it
        }));

        setFees(normalizedData);
        setTotal(payload.total ?? 0);
      }
    } catch (err) {
      console.error("Error loading fee records:", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  return (
    <section className="flex-1 overflow-y-auto mt-10">
      <header className="flex items-end justify-between mb-3">
        <Text variant="medium" className="mb-0">
          Fee Management
        </Text>
        <Button
          variant="primary"
          className="flex items-center gap-2 px-3 py-2.5 text-sm"
          onClick={() => console.log("Add new fee clicked")}
        >
          <Plus className="w-5 h-5" />
          Add Fee
        </Button>
      </header>

      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
        <Table<Fee> columns={feeColumns} data={fees} loading={loading} />
        <div className="mt-6">
          <Pagination total={total} perPage={perPage} currentPage={page} />
        </div>
      </div>
    </section>
  );
};

export default FeeTable;

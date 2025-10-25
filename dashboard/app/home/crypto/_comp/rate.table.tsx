"use client";

import React, { useEffect, useState, useCallback, Fragment } from "react";
import Button from "@/app/components/forms/button";
import Text from "@/app/components/forms/text";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { Plus } from "lucide-react";
import { CryptoService } from "@/app/lib/services/crypto";
import { columns, Rate } from "./rate";
import { Modal } from "@/app/components/modals/modalskin";
import CreateCryptoRate from "@/app/components/modals/ratemodal";
import { useAppSelector } from "@/app/lib/redux/controls";

const RateTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rates, setRates] = useState<Rate[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 30;
  const reloadRate = useAppSelector((state) => state.crypto.reloadRate);

  const getRates = useCallback(async () => {
    const skip = (page - 1) * perPage;
    setLoading(true);
    const { error, payload } = await CryptoService.getRateRecords(
      skip,
      perPage
    );
    setLoading(false);

    if (!error && payload) {
      const transformedData: Rate[] = payload.data.map(
        (item: any, index: number) => {
          const crypto = item.cryptoAsset || {};
          const chain = crypto.chain || {};

          const buy = Number(item.buyRate);
          const sell = Number(item.sellRate);

          const spread =
            buy && sell ? (((sell - buy) / buy) * 100).toFixed(2) : "N/A";

          const startDate = new Date(item.startDate).toLocaleDateString(
            "en-GB"
          );
          const endDate = new Date(item.endDate).toLocaleDateString("en-GB");
          const updatedAt = new Date(item.updatedAt).toLocaleString("en-GB");

          return {
            id: index + 1,
            cryptocurrency: crypto.name || "N/A",
            symbol: crypto.symbol || "N/A",
            network: chain.name || "N/A",
            buyRate: item.buyRate != null ? `₦${buy.toLocaleString()}` : "N/A",
            sellRate:
              item.sellRate != null ? `₦${sell.toLocaleString()}` : "N/A",
            spread: spread === "N/A" ? "N/A" : `${spread}`,
            dateRange: `${startDate} - ${endDate}`,
            status: item.status || "Inactive",
            lastUpdated: updatedAt,
            rawData: JSON.stringify(item),
          };
        }
      );

      setRates(transformedData);
      setTotal(payload.total || 0);
    }
  }, [page, reloadRate]);

  useEffect(() => {
    getRates();
  }, [getRates, reloadRate]);

  return (
    <Fragment>
      <section className="flex-1 overflow-y-auto mt-[40px] mb-[50px]">
        <div className="flex items-center justify-between mb-[10px]">
          <Text variant="medium" className="mt-3">
            Rates Management
          </Text>

          <Button
            variant="primary"
            className="w-auto px-3 py-2.5 text-sm"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Add Rate</span>
          </Button>
        </div>

        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
          <Table columns={columns} data={rates} loading={loading} />
          <div className="mt-6">
            <Pagination total={total} perPage={perPage} currentPage={page} />
          </div>
        </div>
      </section>
      <Modal isOpen={isOpen}>
        <CreateCryptoRate setIsopen={setIsOpen} />
      </Modal>
    </Fragment>
  );
};

export default RateTable;

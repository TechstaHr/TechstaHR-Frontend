"use client";
import { PaymentCard } from "@/components/PaymentCard";
import PaymentNav from "@/components/PaymentNav";
import React, { useMemo } from "react";
import hourglass from "@/public/icons/hour-glass.svg";
import nairaImg from "@/public/icons/naira.svg";
import time from "@/public/icons/time.svg";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyTimeSheet, getTimesheets } from "@/lib/actions/timesheet.actions";
import { getBillingInfo } from "@/lib/actions/billing.actions";
import { listPayrolls } from "@/lib/actions/billing.actions";
import { useUserStore } from "@/store/userStore";
import { getTimeSheet } from "@/lib/actions/timer.actions";

const useWeeklyHours = () => {
  const { data } = useQuery({ queryKey: ["weekly-timesheet"], queryFn: getTimeSheet });
  const hours = useMemo(() => {
    const entries = Array.isArray(data) ? (data as any[]) : [];
    const total = entries.reduce((sum, e) => sum + (e?.totalHours || 0), 0);
    return +total.toFixed(2);
  }, [data]);
  return hours;
};

const Payments = () => {
  const weeklyHours = useWeeklyHours();
  const { data: billing } = useQuery({ queryKey: ["billing-info"], queryFn: getBillingInfo });
  const user = useUserStore((state) => state.user);
  const userId = user?._id || "";
  const { data: payrolls = [] } = useQuery({ queryKey: ["payrolls"], queryFn: listPayrolls });

  const userPayrolls = useMemo(() => {
    return (payrolls as any[]).filter((p) => {
      const uid = typeof p.userId === "string" ? p.userId : p.userId?._id;
      return uid === userId;
    });
  }, [payrolls, userId]);

  const currencyFmt = useMemo(() => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }), []);
  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
  const totalForMonth = useMemo(() => {
    return userPayrolls
      .filter((p) => {
        const d = new Date(p.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}` === monthKey;
      })
      .reduce((sum, p) => sum + (p.amount ?? p.paymentAmount ?? 0), 0);
  }, [userPayrolls, monthKey]);

  const latestStatus = useMemo(() => {
    const sorted = [...userPayrolls].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sorted[0]?.paymentStatus || (billing ? "Pending" : "Setup Required");
  }, [userPayrolls, billing]);

  return (
    <div className="space-y-10 px-4">
      <h2 className="text-2xl font-medium text-[#333333]">Payments</h2>
      <PaymentNav />
      <div className="grid grid-cols-1 items-center justify-between gap-5 lg:grid-cols-3">
        <PaymentCard title="Total Hours Tracked" text={`${weeklyHours} hours`} picture={hourglass} />
        <PaymentCard title="This Month's Payroll" text={currencyFmt.format(totalForMonth)} picture={nairaImg} />
        <PaymentCard title="Payment Status" text={latestStatus} picture={time} />
      </div>
    </div>
  );
};

export default Payments;

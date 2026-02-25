import CalendarNav from "@/components/CalendarNav";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductivityCard } from "@/components/ProductivityCard";

const getAppIcon = (app: string): string => {
  const appIconMap: Record<string, string> = {
    "Google Chrome": "/icons/icon_chrome.jpg",
    "Slack.com": "/icons/icon_slack.jpg",
  };

  return appIconMap[app] || "/icons/icon-chrome.png";
};

const ActivityLog = () => {
  return (
    <div className="space-y-8 px-4">
      <h2 className="font-inter text-2xl font-medium">Activity Log</h2>

      <CalendarNav />

      <ProductivityCard />

      <div className="space-y-5">
        <p className="font-inter text-xl font-medium">Screenshot</p>

        <div className="h-[240px] w-[240px] rounded-md bg-black"></div>
      </div>

      <div className="space-y-5">
        <p className="font-inter text-xl font-medium">Apps/URLs Tracked</p>

        <div className="flex flex-col items-start justify-start gap-3">
          {["Google Chrome", "Slack.com"].map((app) => (
            <Link
              href="https://google.com"
              key={app}
              className="flex items-center gap-2 text-[#333333]"
            >
              <Image
                src={getAppIcon(app)}
                alt={app}
                width={20}
                height={20}
                className="object-contain"
              />
              {app}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

export function DownloadBanner() {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative w-full bg-gradient-to-r from-primary/90 to-primary px-4 py-3 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                        Get the full experience with our desktop app - includes team management, time tracking & auto-screenshots
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="flex-shrink-0"
                        asChild
                    >
                        <a href="https://drive.google.com/file/d/1EP7aF-z3S5CFvWO9BgRS439YOcpixltD/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            Download
                        </a>
                    </Button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="flex-shrink-0 rounded-md p-1 hover:bg-white/20 transition-colors"
                        aria-label="Dismiss banner"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorDown } from "lucide-react";

export function DownloadDesktopPrompt() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <MonitorDown className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Desktop App Required</CardTitle>
                    <CardDescription>
                        This feature requires the desktop version of Techstahr.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        To access team management, time tracking, and auto-screenshots, please download and install the desktop application.
                    </p>
                    <Button className="w-full" variant="outline" asChild>
                        <a href="https://drive.google.com/file/d/1EP7aF-z3S5CFvWO9BgRS439YOcpixltD/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            Download Desktop Appz
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

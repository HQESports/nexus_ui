import { CalendarClock, Mail, RotateCcw, Wrench } from "lucide-react"
import { format, addDays } from "date-fns"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function MaintenancePage() {
  // Calculate date 7 days from now
  const currentDate = new Date()
  const estimatedCompletionDate = addDays(currentDate, 7)
  const formattedDate = format(estimatedCompletionDate, "MMMM d, yyyy")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full p-4">
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Wrench className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Site Under Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="default" className="border-amber-200 bg-amber-50">
            <RotateCcw className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Scheduled Maintenance</AlertTitle>
            <AlertDescription className="text-amber-700">
              We're currently improving our site to serve you better.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">
              We apologize for any inconvenience. Our team is working hard to get everything back up and running.
            </p>

            <div className="mt-6 rounded-lg bg-slate-100 p-4">
              <div className="flex items-center justify-center gap-2 text-slate-700">
                <CalendarClock className="h-5 w-5" />
                <span className="font-medium">Estimated Completion:</span>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-900">{formattedDate}</p>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col space-y-3 pt-4">
          <p className="text-sm text-muted-foreground">Need immediate assistance? Contact our support team:</p>
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Womp Womp
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-8 text-sm text-slate-500">© {currentDate.getFullYear()} Fuck Krafton. All rights reserved.</p>
    </div>
  )
}

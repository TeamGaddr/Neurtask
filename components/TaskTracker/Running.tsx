import React from "react"
import RunningCard from "@/components/TaskTracker/RunningCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RunningTasks } from "@/constants/TaskTracker/data"

const Running: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-base font-medium">Running</CardTitle>
          <Button variant="link" className="text-sm font-normal text-gray-500 h-auto p-0">
            View all
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {RunningTasks.map((task) => (
            <RunningCard key={task.id} {...task} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Running
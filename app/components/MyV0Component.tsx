"use client"

import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Task = {
  id: string
  text: string
  column: "todo" | "inProgress" | "done"
}

export default function DailyKanban() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("kanban-tasks", [])
  const [newTask, setNewTask] = useState("")

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask.trim(), column: "todo" },
      ])
      setNewTask("")
    }
  }

  const moveTask = (taskId: string, newColumn: Task["column"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const columns: { title: string; column: Task["column"] }[] = [
    { title: "To Do", column: "todo" },
    { title: "In Progress", column: "inProgress" },
    { title: "Done", column: "done" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Kanban</h1>
      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow"
        />
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(({ title, column }) => (
          <Card key={column}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks
                .filter((task) => task.column === column)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-secondary p-2 rounded-md mb-2 flex justify-between items-center"
                  >
                    <span>{task.text}</span>
                    <div>
                      {column !== "todo" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            moveTask(
                              task.id,
                              column === "inProgress" ? "todo" : "inProgress"
                            )
                          }
                        >
                          ←
                        </Button>
                      )}
                      {column !== "done" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            moveTask(
                              task.id,
                              column === "todo" ? "inProgress" : "done"
                            )
                          }
                        >
                          →
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TestComponent;

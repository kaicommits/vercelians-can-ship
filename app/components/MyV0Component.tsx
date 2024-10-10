'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface Task {
  id: number
  time: string
  description: string
  completed: boolean
}

export default function DailyTaskSchedule() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTime, setNewTaskTime] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const addTask = () => {
    if (newTaskTime && newTaskDescription) {
      setTasks([...tasks, {
        id: Date.now(),
        time: newTaskTime,
        description: newTaskDescription,
        completed: false
      }])
      setNewTaskTime('')
      setNewTaskDescription('')
    }
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-background shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-primary">Daily Task Schedule</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="task-time">Time</Label>
          <Input
            id="task-time"
            type="time"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="task-description">Task Description</Label>
          <Input
            id="task-description"
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button onClick={addTask} className="w-full">Add Task</Button>
      </div>

      <ul className="space-y-2">
        {tasks.sort((a, b) => a.time.localeCompare(b.time)).map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 bg-muted rounded">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <Label htmlFor={`task-${task.id}`} className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.time} - {task.description}
              </Label>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

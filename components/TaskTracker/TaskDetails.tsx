import React from "react"
import { X } from "lucide-react"

interface DropdownActionsProps {
  isOpen: boolean
  onClose: () => void
  options?: string[]
  title?: string
}

const DropdownActions: React.FC<DropdownActionsProps> = ({
  isOpen,
  onClose,
  options = ["View details", "Edit task", "Delete task"],
  title = "Task details",
}) => {
  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-40 sm:w-48 bg-white shadow-lg rounded-xl p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <div
            key={opt}
            className="bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownActions

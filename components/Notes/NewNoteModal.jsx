'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FileText, Plus, Trash2 } from "lucide-react"

/**
 * A modal dialog for creating a new case note for a client.
 * It provides a form to input note details, track time, and specify other metadata.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls whether the modal is open or closed.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Array<object>} [props.clients=[]] - A list of client objects to populate the client selector.
 * @param {Function} props.onSave - Callback function to save the new note data.
 */
export default function NewNoteModal({ isOpen, onClose, clients = [], onSave }) {
  // State for managing the form data of the new note.
  const [formData, setFormData] = useState({
    client_id: '',
    session_type: '',
    note_date: new Date().toISOString().split('T')[0], // Defaults to today's date
    summary: '',
    detailed_notes: '',
    risk_assessment: '',
    next_steps: ''
  });

  // State for managing time tracking activities associated with the note.
  const [activities, setActivities] = useState([
    { id: 1, type: '', minutes: 0 }
  ]);

  // Pre-defined list of common activities for quick-add functionality.
  const commonActivities = [
    'Assessment',
    'Individual Session',
    'Group Therapy',
    'Crisis Intervention',
    'Documentation',
    'Phone Consultation',
    'Care Coordination'
  ];

  // Calculates the total minutes from all activities.
  const totalMinutes = activities.reduce((sum, activity) => sum + (parseInt(activity.minutes) || 0), 0);

  /**
   * Adds a new, empty activity to the time tracking list.
   */
  const addActivity = () => {
    setActivities([...activities, { id: Date.now(), type: '', minutes: 0 }]);
  };

  /**
   * Removes an activity from the list by its ID.
   * @param {number} id - The unique identifier of the activity to remove.
   */
  const removeActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  /**
   * Updates a specific field of an activity in the list.
   * @param {number} id - The ID of the activity to update.
   * @param {string} field - The name of the field to update (e.g., 'type', 'minutes').
   * @param {string|number} value - The new value for the field.
   */
  const updateActivity = (id, field, value) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  /**
   * Adds a common activity type to the activities list with 0 minutes.
   * @param {string} type - The type of the common activity to add.
   */
  const addCommonActivity = (type) => {
    setActivities([...activities, { id: Date.now(), type, minutes: 0 }]);
  };

  /**
   * Prepares and sends the final note data to the onSave callback.
   * This includes the form data, the list of activities, and the calculated total minutes.
   */
  const handleSave = () => {
    onSave({
      ...formData,
      activities,
      total_minutes: totalMinutes
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <DialogHeader className="flex-shrink-0 border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Create New Case Notes
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">
          {/* Client and Date Selection Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Client</Label>
              <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({...prev, client_id: parseInt(value)}))}>
                <SelectTrigger className="h-12 bg-white">
                  <SelectValue placeholder="John Doe" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.client_first_name} {client.client_last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Date</Label>
              <Input 
                type="date"
                className="h-12 bg-white"
                value={formData.note_date}
                onChange={(e) => setFormData(prev => ({...prev, note_date: e.target.value}))}
              />
            </div>
          </div>

          {/* Case Notes Text Area */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Case Notes</Label>
            <Textarea 
              placeholder="Document the client interaction" 
              className="min-h-32 resize-none bg-white"
              value={formData.detailed_notes}
              onChange={(e) => setFormData(prev => ({...prev, detailed_notes: e.target.value}))}
            />
          </div>

          {/* Time Tracking Section */}
          <div className="space-y-4 bg-white rounded-lg border p-5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Time Tracking</Label>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addActivity}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-[1fr_120px_40px] gap-3 items-start">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Activity Type</Label>
                    <Input
                      placeholder="e.g. Assessment, Daily Living Support, Documentation"
                      value={activity.type}
                      onChange={(e) => updateActivity(activity.id, 'type', e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Minutes</Label>
                    <Input
                      type="number"
                      min="0"
                      value={activity.minutes}
                      onChange={(e) => updateActivity(activity.id, 'minutes', e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                  {activities.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeActivity(activity.id)}
                      className="mt-6 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Common Activities Quick-Add */}
            <div className="space-y-2 pt-2 border-t">
              <Label className="text-xs font-semibold text-gray-600">Common Activities</Label>
              <div className="flex flex-wrap gap-2">
                {commonActivities.map((activityType) => (
                  <Button
                    key={activityType}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCommonActivity(activityType)}
                    className="text-xs bg-white hover:bg-gray-50"
                  >
                    {activityType}
                  </Button>
                ))}
              </div>
            </div>

            {/* Total Time Display */}
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm font-semibold">Total Time:</span>
              <span className="text-lg font-bold text-teal-600">{totalMinutes} minutes</span>
            </div>
          </div>

          {/* Additional Metadata Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Session Type</Label>
              <Select value={formData.session_type} onValueChange={(value) => setFormData(prev => ({...prev, session_type: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Session</SelectItem>
                  <SelectItem value="group">Group Therapy</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="crisis">Crisis Intervention</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Risk Assessment</Label>
              <Select value={formData.risk_assessment} onValueChange={(value) => setFormData(prev => ({...prev, risk_assessment: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Current risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="critical">Critical Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Next Steps / Action Items</Label>
            <Textarea 
              placeholder="Follow-up actions, homework, next appointment..."
              className="min-h-20 resize-none bg-white"
              value={formData.next_steps}
              onChange={(e) => setFormData(prev => ({...prev, next_steps: e.target.value}))}
            />
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-4 gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1 h-11"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!formData.client_id}
            className="flex-1 h-11 bg-teal-600 hover:bg-teal-700"
          >
            Save Case Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
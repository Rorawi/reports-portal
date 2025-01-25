import React from 'react'

const EventsForm = () => {
  return (
    <div>
<div class="step events">
  <h3>Events</h3>
  <div class="form-group">
    <label for="holyGhostPrayerSessions">No. of times Holy Ghost Prayer Sessions were Held</label>
    <input type="number" id="holyGhostPrayerSessions" name="holyGhostPrayerSessions" />
  </div>
  <div class="form-group">
    <label for="baptizedInHolySpiritChildren">No. of Children Baptized in Holy Spirit</label>
    <input type="number" id="baptizedInHolySpiritChildren" name="baptizedInHolySpiritChildren" />
  </div>
  <div class="form-group">
    <label for="baptizedInHolySpiritNewConverts">No. of New Converts Baptized in Holy Spirit</label>
    <input type="number" id="baptizedInHolySpiritNewConverts" name="baptizedInHolySpiritNewConverts" />
  </div>
  <div class="form-group">
    <label for="baptizedInHolySpiritOldMembers">No. of Old Members Baptized in Holy Spirit</label>
    <input type="number" id="baptizedInHolySpiritOldMembers" name="baptizedInHolySpiritOldMembers" />
  </div>
  <div class="form-group">
    <label for="midWeekTeachingSessions">No. of Mid-Week Teaching sessions organized</label>
    <input type="number" id="midWeekTeachingSessions" name="midWeekTeachingSessions" />
  </div>
  <div class="form-group">
    <label for="avgMidWeekServiceAttendance">Average attendance at Mid-Week Service</label>
    <input type="number" id="avgMidWeekServiceAttendance" name="avgMidWeekServiceAttendance" />
  </div>
  <div class="form-group">
    <label for="fridayPrayerSessions">No. of Friday Weekly Prayer Sessions Held</label>
    <input type="number" id="fridayPrayerSessions" name="fridayPrayerSessions" />
  </div>
  <div class="form-group">
    <label for="avgFridayPrayerAttendance">Average attendance at Friday Weekly Prayer sessions</label>
    <input type="number" id="avgFridayPrayerAttendance" name="avgFridayPrayerAttendance" />
  </div>
</div>
    </div>
  )
}

export default EventsForm
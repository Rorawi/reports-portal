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
					<label for="teachingSessionsAnnual">
						No. of Teaching sessions held on annual thematic topics
					</label>
					<input
						type="number"
						id="teachingSessionsAnnual"
						name="teachingSessionsAnnual"
					/>
				</div>
				<div class="form-group">
					<label for="intergenerationalServices">
						No. of intergenerational services held
					</label>
					<input
						type="number"
						id="intergenerationalServices"
						name="intergenerationalServices"
					/>
				</div>
				<div class="form-group">
					<label for="youthMinistryAttendance">
						Attendance at Youth Ministry Meetings
					</label>
					<input
						type="number"
						id="youthMinistryAttendance"
						name="youthMinistryAttendance"
					/>
				</div>
				<div class="form-group">
					<label for="womenMinistryAttendance">
						Attendance at Women Ministry Meetings
					</label>
					<input
						type="number"
						id="womenMinistryAttendance"
						name="womenMinistryAttendance"
					/>
				</div>
				<div class="form-group">
					<label for="evangelismMinistryAttendance">
						Attendance at Evangelism Ministry Meetings
					</label>
					<input
						type="number"
						id="evangelismMinistryAttendance"
						name="evangelismMinistryAttendance"
					/>
				</div>
				<div class="form-group">
					<label for="pememMinistryAttendance">
						Attendance at PEMEM Ministry Meetings
					</label>
					<input
						type="number"
						id="pememMinistryAttendance"
						name="pememMinistryAttendance"
					/>
				</div>

</div>
    </div>
  )
}

export default EventsForm
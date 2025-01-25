import React from 'react'

const AttendanceForm = () => {
  return (
    <div>
<div class="step attendance">
  <h3>Attendance</h3>
  <div class="form-group">
    <label for="bibleStudyMeetings">No. of Bible Study Meetings Held</label>
    <input type="number" id="bibleStudyMeetings" name="bibleStudyMeetings" />
  </div>
  <div class="form-group">
    <label for="avgBibleStudyAttendance">Average Bible Study Attendance</label>
    <input type="number" id="avgBibleStudyAttendance" name="avgBibleStudyAttendance" />
  </div>
  <div class="form-group">
    <label for="avgSundayAttendance">Average Sunday Morning Church Attendance</label>
    <input type="number" id="avgSundayAttendance" name="avgSundayAttendance" />
  </div>
  <div class="form-group">
    <label for="newConvertsClassesHeld">No. of New Converts Classes Held</label>
    <input type="number" id="newConvertsClassesHeld" name="newConvertsClassesHeld" />
  </div>
  <div class="form-group">
    <label for="avgNewConvertsClassAttendance">Average Attendance at New Converts Classes</label>
    <input type="number" id="avgNewConvertsClassAttendance" name="avgNewConvertsClassAttendance" />
  </div>
  <div class="form-group">
    <label for="totalAdultAttendanceSupperSunday">Total Adult Attendance on Lord’s Supper Sunday</label>
    <input type="number" id="totalAdultAttendanceSupperSunday" name="totalAdultAttendanceSupperSunday" />
  </div>
  <div class="form-group">
    <label for="totalSupperParticipants">Total Lord’s Supper Participants</label>
    <input type="number" id="totalSupperParticipants" name="totalSupperParticipants" />
  </div>
</div>
    </div>
  )
}

export default AttendanceForm
from pydantic import BaseModel
from typing import Optional

class Report(BaseModel):
    baptizedInHolySpiritChildrenCurrent: int
    baptizedInHolySpiritChildrenPrevious: int
    baptizedInHolySpiritChildrenVariance: int
    baptizedInHolySpiritNewConvertsCurrent: int
    baptizedInHolySpiritNewConvertsPrevious: int
    baptizedInHolySpiritNewConvertsVariance: int
    baptizedInHolySpiritOldMembersCurrent: int
    baptizedInHolySpiritOldMembersPrevious: int
    baptizedInHolySpiritOldMembersVariance: int
    midWeekTeachingSessionsCurrent: int
    midWeekTeachingSessionsPrevious: int
    midWeekTeachingSessionsVariance: int
    avgMidWeekServiceAttendanceCurrent: int
    avgMidWeekServiceAttendancePrevious: int
    avgMidWeekServiceAttendanceVariance: int
    fridayPrayerSessionsCurrent: int
    fridayPrayerSessionsPrevious: int
    fridayPrayerSessionsVariance: int
    convertsBaptizedCurrent: int
    convertsBaptizedPrevious: int
    convertsBaptizedVariance: int
    avgFridayPrayerAttendanceCurrent: int
    avgFridayPrayerAttendancePrevious: int
    avgFridayPrayerAttendanceVariance: int
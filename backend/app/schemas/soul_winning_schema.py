from pydantic import BaseModel
from typing import Optional

class Report(BaseModel):
    outreachProgramsCurrent: int
    outreachProgramsPrevious: int
    outreachProgramsVariance: int
    soulsWonCOPCurrent: int
    soulsWonCOPPrevious: int
    soulsWonCOPVariance: int
    otherSoulsWonCurrent: int
    otherSoulsWonPrevious: int
    otherSoulsWonVariance: int
    soulsWonGospelSundayCurrent: int
    soulsWonGospelSundayPrevious: int
    soulsWonGospelSundayVariance: int
    soulsWonDigitalSpaceCurrent: int
    soulsWonDigitalSpacePrevious: int
    soulsWonDigitalSpaceVariance: int
    soulsWonOtherReligionsCurrent: int
    soulsWonOtherReligionsPrevious: int
    soulsWonOtherReligionsVariance: int
    convertsBaptizedCurrent: int
    convertsBaptizedPrevious: int
    convertsBaptizedVariance: int
    totalHomeCellsCurrent: int
    totalHomeCellsPrevious: int
    totalHomeCellsVariance: int
    totalAttendanceHomeCellsMembersCurrent: int
    totalAttendanceHomeCellsMembersPrevious: int
    totalAttendanceHomeCellsMembersVariance: int
    totalAttendanceHomeCellsNonMembersCurrent: int
    totalAttendanceHomeCellsNonMembersPrevious: int
    totalAttendanceHomeCellsNonMembersVariance: int
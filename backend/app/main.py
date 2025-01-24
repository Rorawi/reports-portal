from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],  # Include your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Simulate a database to store reports
fake_reports_db = []

class Report(BaseModel):
    assembly: str
    district: str
    month: str
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


@app.post("/api/reports")
async def submit_report(report: Report, request: Request):
    raw_body = await request.json()
    print("Received Payload:", raw_body)

    try:
        # Save the entire report object
        saved_report = report.dict()  # Convert Pydantic model to a dictionary
        fake_reports_db.append(saved_report)
        return {"message": "Report submitted successfully", "data": saved_report}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# GET endpoint to retrieve all reports
@app.get("/api/reports")
async def get_reports():
    return fake_reports_db
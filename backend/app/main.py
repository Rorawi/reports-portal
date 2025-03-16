from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .schemas.report_schema import Report,ReportUpdate

app = FastAPI()

# Add CORS middleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002","http://localhost:3003"],  # Include your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Simulate a database
fake_reports_db = []
# fake_drafts_db = []

# @app.post("/api/reports")
# async def submit_report(report: Report, request: Request):
#     raw_body = await request.json()
#     print("Received Payload:", raw_body)

#     try:
#         # Handle report submission (final)
#         if not report.isDraft:
#             saved_report = report.dict()
#             fake_reports_db.append(saved_report)
#             return {"message": "Report submitted successfully", "data": saved_report}
#         else:
#             raise HTTPException(status_code=400, detail="Report is marked as draft, please use the draft endpoint.")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

# @app.post("/api/reports/draft")
# async def save_draft(report: Report, request: Request):
#     raw_body = await request.json()
#     print("Received Draft Payload:", raw_body)

#     try:
#         # Handle report draft saving
#         if report.isDraft:
#             saved_draft = report.dict()
#             fake_drafts_db.append(saved_draft)
#             return {"message": "Draft saved successfully", "data": saved_draft}
#         else:
#             raise HTTPException(status_code=400, detail="Report is not marked as draft, please use the submit endpoint.")
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
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

@app.get("/api/reports")
async def get_reports():
    return fake_reports_db
    
    
@app.get("/api/reports/{report_id}")
async def get_report(report_id: str):
    for report in fake_reports_db:
        if report["id"] == report_id:
            return report
    raise HTTPException(status_code=404, detail="Report not found")

# @app.get("/api/reports/drafts")
# async def get_drafts():
#     return fake_drafts_db

@app.patch("/reports/{report_id}/approve")
async def approve_report(report_id: str, report_update: ReportUpdate):
    for report in fake_reports_db:
        if report["id"] == report_id:  # Ensure it's comparing strings
            report["isApproved"] = report_update.isApproved
            return {"message": "Report approved", "report": report}

    raise HTTPException(status_code=404, detail="Report not found")

@app.get("/api/debug/reports")
async def debug_reports():
    return {"reports": fake_reports_db}
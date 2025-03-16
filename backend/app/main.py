from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .schemas.report_schema import Report
from collections import defaultdict


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
        saved_report = report.model_dump()  # Convert Pydantic model to a dictionary
        saved_report["created_at"] = datetime.utcnow().isoformat()  # Add timestamp

        fake_reports_db.append(saved_report)
        return {"message": "Report submitted successfully", "data": saved_report}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/reports")
async def get_reports():
    # Group reports by year
    reports_by_year = defaultdict(list)
    
    for report in fake_reports_db:
        year = datetime.fromisoformat(report["created_at"]).year
        reports_by_year[year].append(report)
    
    # Sort years from newest to oldest (e.g., 2025 -> 2024)
    sorted_years = sorted(reports_by_year.keys(), reverse=True)
    
    # Sort reports within each year by `created_at` (newest first)
    sorted_reports = {
        year: sorted(reports_by_year[year], key=lambda x: datetime.fromisoformat(x["created_at"]), reverse=True)
        for year in sorted_years
    }
    
    return sorted_reports

@app.get("/api/reports/{report_id}")
async def get_report(report_id: str):
    for report in fake_reports_db:
        if report["id"] == report_id:
            return report
    raise HTTPException(status_code=404, detail="Report not found")

@app.patch("/api/reports/{report_id}/approve")
async def approve_report(report_id: str):
    for report in fake_reports_db:
        if report["id"] == report_id:
            report["isApproved"] = True  # ✅ Updating directly in the database
            print(f"Updated Report: {report}")  # Debugging

            return {"message": "Report approved", "report": report}

    raise HTTPException(status_code=404, detail="Report not found")

@app.patch("/api/reports/{report_id}/approve")
async def approve_report(report_id: str, report_update: dict):
    print(f"Received Payload: {report_update}")  # Debugging



@app.delete("/api/reports/{report_id}")
async def delete_report(report_id: str):
    global fake_reports_db
    fake_reports_db = [report for report in fake_reports_db if report["id"] != report_id]
    return {"message": "Report deleted successfully"}

@app.put("/api/reports/{report_id}")
async def update_report(report_id: str, updated_report: Report):
    for index, report in enumerate(fake_reports_db):
        if report["id"] == report_id:
            fake_reports_db[index] = updated_report.dict()
            return {"message": "Report updated successfully", "data": updated_report}

    raise HTTPException(status_code=404, detail="Report not found")



@app.get("/api/debug/reports")
async def debug_reports():
    return {"reports": fake_reports_db}
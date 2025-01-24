from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Report(BaseModel):
    district: str
    month: str
    outreachPrograms: str
    soulsWonCOP: str
    otherSoulsWon: str

@app.post("/submit-report")
async def submit_report(report: Report):
    # Handle the report data
    return {"message": "Report submitted successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

from backend.app.schemas import soul_winning_schema
from backend.app.schemas import step_one_schema
from backend.app.schemas import offetory_schema
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, database

router = APIRouter()

@router.post("/", response_model=soul_winning_schema.ReportOut)
def create_report(report: soul_winning_schema.ReportCreate, db: Session = Depends(database.get_db)):
    return crud.create_report(db=db, report=report)

@router.get("/", response_model=list[soul_winning_schema.ReportOut])
def read_reports(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    return crud.get_reports(db=db, skip=skip, limit=limit)
